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
    }),
    [
      departureAirportCode,
      arrivalAirportCode,
      selectedDate,
      seatClasses,
      adultPassenger,
      childPassenger,
      babyPassenger,
    ]
  );

  const { data: flights, loading, error, refetch } = useSearchFlight(ticketSearch);

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

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col md:flex-row gap-5 mx-4">
          <motion.div
            initial={{ opacity: 0, x: -75 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="flex-col gap-4 font-medium hidden md:flex text-base md:w-1/4"
          >
            <h1 className="font-medium text-base">Filter</h1>
            <Filter />
          </motion.div>
          <div className="flex-grow">
            {error ? (
              <ResultNotFound message={error} />
            ) : flights && flights.length > 0 ? (
              flights.map((flight, index) => (
                <FlightCard
                  key={index}
                  index={index}
                  flight={flight}
                  isOpen={openIndex === index}
                  toggleAccordion={() => toggleAccordion(index)}
                />
              ))
            ) : (
              <ResultNotFound message="No flights found." />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
