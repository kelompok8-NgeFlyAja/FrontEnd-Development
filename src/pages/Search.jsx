import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import DateFilter from "@/components/search/DateFilter";
import Loading from "@/components/search/Loading";
import FlightCard from "@/components/search/FlightCard";
import ResultNotFound from "@/components/search/ResultNotFound";
import { useSearchFlight } from "@/hooks/useSearchFlight";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChangeResult from "@/components/search/ChangeResult";
import Filter from "@/components/search/Filter";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Sort from "@/components/search/Sort";

const extractParams = (searchParams, keys) => {
  const params = {};
  keys.forEach((key) => {
    params[key] = searchParams.get(key) || "";
  });
  return params;
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [days, setDays] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedBaggageFilter, setSelectedBaggageFilter] = useState(null);
  const [selectedCBaggageFilter, setSelectedCBaggageFilter] = useState(null);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const {
    departureAirportCode,
    arrivalAirportCode,
    departureTime,
    seatClasses,
    adultPassenger,
    childPassenger,
    babyPassenger,
  } = extractParams(searchParams, [
    "departureAirportCode",
    "arrivalAirportCode",
    "departureTime",
    "seatClasses",
    "adultPassenger",
    "childPassenger",
    "babyPassenger",
  ]);

  useEffect(() => {
    if (departureTime && !selectedDate) {
      setSelectedDate(departureTime);
    }
  }, [departureTime, selectedDate]);

  const ticketSearch = useMemo(
    () => ({
      departureAirportCode,
      arrivalAirportCode,
      departureTime: selectedDate,
      seatClasses,
      adultPassenger: parseInt(adultPassenger, 10),
      childPassenger: parseInt(childPassenger, 10),
      babyPassenger: parseInt(babyPassenger, 10),
      page: page,
      limit: limit,
    }),
    [
      departureAirportCode,
      arrivalAirportCode,
      selectedDate,
      seatClasses,
      adultPassenger,
      childPassenger,
      babyPassenger,
      page,
      limit,
    ]
  );

  const { data: flights, total, loading, error, refetch } = useSearchFlight(ticketSearch);

  const totalPages = Math.ceil(total / limit);

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [selectedDate, refetch]);

  const getDayName = (date) => {
    const dayNames = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    return dayNames[new Date(date).getDay()];
  };

  useEffect(() => {
    const generateDays = (departureDate) => {
      const days = [];
      const currentDate = new Date(departureDate);
      for (let i = -3; i <= 3; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + i);
        days.push({
          date: date.toISOString().split("T")[0],
          day: getDayName(date),
        });
      }
      setDays(days);
    };

    if (departureTime) {
      generateDays(departureTime);
    }
  }, [departureTime]);

  const filteredFlights = useMemo(() => {
    let filtered = [...flights];

    if (selectedPriceFilter) {
      if (selectedPriceFilter === "Di bawah 1 Juta") {
        filtered = filtered.filter((flight) => flight.price < 1000000);
      } else if (selectedPriceFilter === "1 Juta - 3 Juta") {
        filtered = filtered.filter(
          (flight) => flight.price >= 1000000 && flight.price <= 3000000
        );
      } else if (selectedPriceFilter === "3 Juta - 5 Juta") {
        filtered = filtered.filter(
          (flight) => flight.price > 3000000 && flight.price <= 5000000
        );
      } else if (selectedPriceFilter === "Di atas 5 Juta") {
        filtered = filtered.filter((flight) => flight.price > 5000000);
      }
    }

    if (selectedCBaggageFilter) {
      if (selectedCBaggageFilter === ">1Kg") {
        filtered = filtered.filter((flight) => flight.plane.cabinBaggage >= 1);
      } else if (selectedCBaggageFilter === ">5Kg") {
        filtered = filtered.filter((flight) => flight.plane.cabinBaggage > 5);
      }
    }

    if (selectedBaggageFilter) {
      if (selectedBaggageFilter === ">1Kg") {
        filtered = filtered.filter((flight) => flight.plane.baggage >= 1);
      } else if (selectedBaggageFilter === ">5Kg") {
        filtered = filtered.filter((flight) => flight.plane.baggage > 5);
      } else if (selectedBaggageFilter === ">10Kg") {
        filtered = filtered.filter((flight) => flight.plane.baggage > 10);
      }
    }

    return filtered;
  }, [
    flights,
    selectedPriceFilter,
    selectedCBaggageFilter,
    selectedBaggageFilter,
  ]);

  const sortedFlights = useMemo(() => {
    if (!selectedSort) return filteredFlights;

    const parseDuration = (duration) => {
      const match = duration.match(/(\d+)h\s*(\d+)m/);
      if (match) {
        return parseInt(match[1], 10) * 60 + parseInt(match[2], 10); 
      }
      return 0;
    };

    switch (selectedSort) {
      case "Harga - Termurah":
        return [...filteredFlights].sort((a, b) => a.price - b.price);

      case "Durasi - Terpendek":
        return [...filteredFlights].sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));

      case "Keberangkatan - Paling Awal":
        return [...filteredFlights].sort(
          (a, b) => new Date(a.departureDate + ' ' + a.departureTime) - new Date(b.departureDate + ' ' + b.departureTime)
        );

      case "Keberangkatan - Paling Akhir":
        return [...filteredFlights].sort(
          (a, b) => new Date(b.departureDate + ' ' + b.departureTime) - new Date(a.departureDate + ' ' + a.departureTime)
        );

      case "Kedatangan - Paling Awal":
        return [...filteredFlights].sort(
          (a, b) => new Date(a.arrivalDate + ' ' + a.arrivalTime) - new Date(b.arrivalDate + ' ' + b.arrivalTime)
        );

      case "Kedatangan - Paling Akhir":
        return [...filteredFlights].sort(
          (a, b) => new Date(b.arrivalDate + ' ' + b.arrivalTime) - new Date(a.arrivalDate + ' ' + a.arrivalTime)
        );

      default:
        return filteredFlights;
    }
  }, [filteredFlights, selectedSort]);

  return (
    <div className="w-11/12 md:w-2/3 mx-auto flex flex-col gap-5 overflow-hidden pb-10 mt-5 md:mt-10">
      <motion.h1
        initial={{ opacity: 0, x: -75 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.25 }}
        viewport={{ once: true }}
        className="text-xl font-bold"
      >
        Pilih Penerbangan
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center gap-2 relative">
        <ChangeResult
          origin={ticketSearch.departureAirportCode}
          destination={ticketSearch.arrivalAirportCode}
          passengers={
            ticketSearch.adultPassenger +
            ticketSearch.childPassenger +
            ticketSearch.babyPassenger
          }
          classType={ticketSearch.seatClasses}
        />
        <motion.button
          initial={{ opacity: 0, x: 75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.75 }}
          viewport={{ once: true }}
          onClick={() => navigate("/")}
          className="hidden md:block text-white gap-5 p-2 md:p-3 px-5 rounded-lg bg-[#73CA5C]"
        >
          Ubah Pencarian
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          type: "spring",
          ease: "easeOut",
          delay: 0.75,
        }}
        className="flex justify-between mx-4 overflow-x-auto"
      >
        {days.map(({ day, date }, index) => (
          <DateFilter
            key={index}
            day={day}
            date={date}
            onClick={() => setSelectedDate(date)}
            isSelected={selectedDate === date}
          />
        ))}
      </motion.div>
      <div className="flex justify-end px-4">
        <Sort setSelectedSort={setSelectedSort} selectedSort={selectedSort} />
      </div>
      <div className="flex flex-col md:flex-row gap-5 mx-4">
        <motion.div
          initial={{ opacity: 0, x: -75 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="flex-col gap-4 font-medium flex text-base md:w-1/4"
        >
          <Filter
            setSelectedBaggageFilter={setSelectedBaggageFilter}
            setSelectedCBaggageFilter={setSelectedCBaggageFilter}
            setSelectedPriceFilter={setSelectedPriceFilter}
          />
        </motion.div>
        <div className="flex-grow">
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="p-10">
              <ResultNotFound message={error} />
            </div>
          ) : sortedFlights && sortedFlights.length > 0 ? (
            <>
              {sortedFlights.map((flight, index) => (
                <FlightCard
                  key={index}
                  index={index}
                  flight={flight}
                  isOpen={openIndex === index}
                  toggleAccordion={() => toggleAccordion(index)}
                />
              ))}
              <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 mt-4">
                <Button
                  onClick={goToPreviousPage}
                  disabled={page === 1}
                  variant="outline"
                  className="flex items-center justify-center px-2 py-2 rounded-md border-violet-700 text-xs sm:text-sm"
                >
                  <IoIosArrowBack size={16} className="fill-violet-700" />
                </Button>

                <span className="text-xs sm:text-sm text-violet-700 text-center">
                  Page {page} of {totalPages}
                </span>

                <Button
                  onClick={goToNextPage}
                  disabled={page === totalPages}
                  variant="outline"
                  className="flex items-center justify-center px-2 py-2 rounded-md border-violet-700 sm:w-auto text-xs sm:text-sm"
                >
                  <IoIosArrowForward size={16} className="fill-violet-700" />
                </Button>
              </div>
            </>
          ) : (
            <div className="p-10">
              <ResultNotFound message="Penerbangan tidak ditemukan" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
