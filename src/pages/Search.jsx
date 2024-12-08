import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { LuArrowUpDown } from "react-icons/lu";
import Navbar from "@/components/Navbar";
import ChangeResult from "@/components/search/ChangeResult";
import DateFilter from "@/components/search/DateFilter";
import Sort from "@/components/search/Sort";
import SoldOut from "@/components/search/SoldOut";
import Loading from "@/components/search/Loading";
import Filter from "@/components/search/Filter";
import FlightCard from "@/components/search/FlightCard";
import Pagination from "@/components/search/Pagination";
import ResultNotFound from "@/components/search/ResultNotFound";
import useSend from "@/hooks/useSend";
import Cookies from "universal-cookie";

const Search = () => {
  const { loading, sendData } = useSend();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isSeatAvailable, setIsSeatAvailable] = useState(true);
  const [days, setDays] = useState([]);
  const [dataFlight, setDataFlight] = useState([]);
  const [isVerified, setIsVerified] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedDate, setSelectedDate] = useState(searchParams.get("departure_date"));
  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [isFilteredFlights, setIsFilteredFlights] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temporaryFilter, setTemporaryFilter] = useState("");
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [isBothSelected, setIsBothSelected] = useState(false);

  const dewasa = searchParams.get("penumpang") ? searchParams.get("penumpang").split(".")[0] : "0";
  const anak = searchParams.get("penumpang") ? searchParams.get("penumpang").split(".")[1] : "0";
  const bayi = searchParams.get("penumpang") ? searchParams.get("penumpang").split(".")[2] : "0";

  const ticketSearch = {
    departure_city: searchParams.get("departure_city"),
    arrival_city: searchParams.get("arrival_city"),
    penumpang: parseInt(dewasa) + parseInt(anak) + parseInt(bayi),
    seat_class: searchParams.get("seat_class"),
    departure_date: searchParams.get("departure_date"),
    return_date: searchParams.get("return_date"),
  };

  const getDayName = (date) => {
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return dayNames[new Date(date).getDay()];
  };

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
    return days;
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleClick = (date) => {
    setSelectedDate(date);
    const params = new URLSearchParams(searchParams);
    if (!selectedDeparture) {
      params.set("departure_date", date);
      navigate(`?${params.toString()}`);
    } else if (!selectedReturn) {
      params.set("return_date", date);
      navigate(`?${params.toString()}`);
    } else if (selectedDeparture && selectedReturn) {
      params.set("departure_date", date);
      navigate(`?${params.toString()}`);
    }
  };

  const fetchData = async () => {
    setDataFlight([]);
    const response = await sendData(
      `/api/v1/flight?seat_class=${searchParams.get("seat_class")}&departure_city=${searchParams.get("departure_city")}&arrival_city=${searchParams.get("arrival_city")}&departure_date=${searchParams.get(
        "departure_date"
      )}&limit=5&page=${currentPage}`,
      "GET",
      null,
      null,
      true
    );
    const {
      data: {
        data: { flights },
      },
    } = await sendData(
      `/api/v1/flight?seat_class=${searchParams.get("seat_class")}&departure_city=${searchParams.get("departure_city")}&arrival_city=${searchParams.get("arrival_city")}&departure_date=${searchParams.get("departure_date")}&limit=${
        response.data.data.pagination.totalData
      }`,
      "GET",
      null,
      null,
      true
    );
    if (response.statusCode === 200) {
      setDataFlight(response.data.data.flights);
      setPagination(response.data.data.pagination);
      setFilteredFlights(flights);
      setSelectedFilter("Others");
      setIsFilteredFlights(true);
    } else {
      navigate("/error");
    }
  };

  const fetchReversedData = async () => {
    setDataFlight([]);
    const response = await sendData(
      `/api/v1/flight?seat_class=${searchParams.get("seat_class")}&departure_city=${searchParams.get("arrival_city")}&arrival_city=${searchParams.get("departure_city")}&departure_date=${searchParams.get(
        "return_date"
      )}&limit=5&page=${currentPage}`,
      "GET",
      null,
      null,
      true
    );
    const {
      data: {
        data: { flights },
      },
    } = await sendData(
      `/api/v1/flight?seat_class=${searchParams.get("seat_class")}&departure_city=${searchParams.get("arrival_city")}&arrival_city=${searchParams.get("departure_city")}&departure_date=${searchParams.get("departure_date")}&limit=${
        response.data.data.pagination.totalData
      }`,
      "GET",
      null,
      null,
      true
    );
    if (response.statusCode === 200) {
      setDataFlight(response.data.data.flights);
      setPagination(response.data.data.pagination);
      setFilteredFlights(flights);
      setSelectedFilter("Others");
      setIsFilteredFlights(true);
    } else {
      navigate("/error");
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    const [depHours, depMinutes] = departureTime.split(":").map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(":").map(Number);

    const depDate = new Date(1970, 0, 1, depHours, depMinutes);
    const arrDate = new Date(1970, 0, 1, arrHours, arrMinutes);

    if (arrDate < depDate) {
      arrDate.setDate(arrDate.getDate() + 1);
    }

    const durationMs = arrDate - depDate;
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${durationHours}h ${durationMinutes}m`;
  };

  const handleSelect = (flight) => {
    if (flight.seats_available > 0) {
      setIsSeatAvailable(true);

      if (!searchParams.get("return_date")) {
        navigate(`/checkout?departure_id=${flight.flight_id}&penumpang=${searchParams.get("penumpang")}&seat_class=${flight.seat_class}`);
      }

      if (!selectedDeparture) {
        setSelectedDeparture(flight);
        fetchReversedData();
        setSelectedDate(searchParams.get("return_date"));
        setCurrentPage(1);
      } else if (!selectedReturn) {
        setSelectedReturn(flight);
        fetchData();
        setSelectedDate(searchParams.get("departure_date"));
        setCurrentPage(1);
      } else if (selectedDeparture && selectedReturn) {
        setSelectedReturn(flight);
        fetchData();
        setSelectedDate(searchParams.get("departure_date"));
        setCurrentPage(1);
      }
    } else {
      setIsSeatAvailable(false);
    }
  };

  const handleLanjutkan = () => {
    if (selectedDeparture && selectedReturn) {
      navigate(`/checkout?departure_id=${selectedDeparture.flight_id}&penumpang=${searchParams.get("penumpang")}&seat_class=${searchParams.get("seat_class")}&return_id=${selectedReturn.flight_id}`);
    }
  };

  const handleRemoveSelection = (type) => {
    if (type === "departure") {
      setSelectedDeparture(null);
      setSelectedFilter("Others");
      fetchData();
      setSelectedDate(searchParams.get("departure_date"));
      setCurrentPage(1);
      setIsBothSelected(false);
    } else if (type === "return") {
      setSelectedReturn(null);
      setSelectedFilter("Others");
      fetchReversedData();
      setSelectedDate(searchParams.get("return_date"));
      setCurrentPage(1);
      setIsBothSelected(false);
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleOpenModal = () => {
    setTemporaryFilter(selectedFilter);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectFilter = (filter) => {
    setTemporaryFilter(filter);
  };

  const handleApplyFilter = () => {
    setSelectedFilter(temporaryFilter);
    setIsModalOpen(false);
  };

  const getButtonText = () => {
    if (!selectedFilter) return "Others";
    const parts = selectedFilter.split(" - ");
    return parts.length > 1 ? parts[1] : parts[0];
  };

  useEffect(() => {
    const checkToken = cookies.get("token");
    setIsLogin(!!checkToken);

    if (searchParams.size === 0 || !searchParams.get("departure_city") || !searchParams.get("arrival_city") || !searchParams.get("departure_date") || !searchParams.get("penumpang")) {
      navigate("/");
    }
  }, [navigate, searchParams, cookies]);

  useEffect(() => {
    if (!selectedDeparture) {
      const departureDate = searchParams.get("departure_date") || new Date().toISOString().split("T")[0];
      setDays(generateDays(departureDate));
    } else if (!selectedReturn) {
      const returnDate = searchParams.get("return_date") || new Date().toISOString().split("T")[0];
      setDays(generateDays(returnDate));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDeparture && selectedReturn) {
      setIsBothSelected(true);
    }

    if (!selectedDeparture) {
      fetchData();
    } else if (!selectedReturn) {
      fetchReversedData();
    }
  }, [searchParams, currentPage, selectedDate]);

  useEffect(() => {
    if (selectedDeparture && selectedReturn) {
      setIsBothSelected(true);
    }

    if (dataFlight && pagination) {
      setTotalPages(pagination.totalPages);
    }
  }, [dataFlight]);

  return (
    <>
      <Navbar isLogin={isLogin} isSearch={true} />
      {isBothSelected && <div className="fixed inset-0 bg-black opacity-50 z-10"></div>}

      {!isVerified && (
        <div className="bg-red-500 opacity-90 w-[100vw] fixed z-40 top-24 p-2 flex justify-between">
          <div className="w-4/5 mx-auto flex justify-between items-center">
            <h1 className="text-white font-bold">Akun Anda Belum Verified</h1>
            <Link to="/otp">
              <button className="bg-white px-4 py-1 rounded-xl font-semibold">Verified</button>
            </Link>
          </div>
        </div>
      )}

      {!isLogin && (
        <div className="bg-red-500 opacity-90 w-[100vw] fixed z-40 top-24 p-2 flex justify-between">
          <div className="w-4/5 mx-auto flex justify-between items-center">
            <h1 className="text-white font-bold">Anda Belum Login</h1>
            <Link to="/login">
              <button className="bg-white px-4 py-1 rounded-xl font-semibold">Login</button>
            </Link>
          </div>
        </div>
      )}

      <div className={`w-11/12 md:w-2/3 mx-auto flex flex-col ${!isVerified ? "mt-36" : "mt-28"} gap-5 overflow-hidden pb-10`}>
        <motion.h1 initial={{ opacity: 0, x: -75 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.25 }} viewport={{ once: true }} className="text-xl font-bold">
          {!isSeatAvailable ? "Detail Penerbangan" : "Pilih Penerbangan"}
        </motion.h1>
        <div className="flex justify-between items-center gap-2 mx-4 relative">
          <ChangeResult origin={ticketSearch.departure_city} destination={ticketSearch.arrival_city} passengers={ticketSearch.penumpang} classType={ticketSearch.seat_class} />
          <motion.button
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.75 }}
            viewport={{ once: true }}
            onClick={() => navigate("/")}
            className="text-white gap-5 p-2 md:p-3 px-5 rounded-lg bg-[#73CA5C]"
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
            <DateFilter key={index} day={day} date={formatDate(date)} onClick={() => handleClick(date)} isSelected={selectedDate === date} />
          ))}
        </motion.div>

        {isSeatAvailable && (
          <motion.div initial={{ opacity: 0, x: 75 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.75 }} className="flex flex-col lg:flex-row justify-between md:justify-end items-center gap-2">
            <div className={`${selectedDeparture !== null || selectedReturn !== null ? "flex flex-col border-[#7126B5] bg-white border-2 rounded-lg mx-4" : ""} ${isBothSelected ? "z-10 relative" : ""}`}>
              <div className={`${selectedDeparture !== null || selectedReturn !== null ? "flex flex-grow md:gap-10 flex-col md:flex-row" : ""}`}>
                {selectedDeparture && (
                  <div className={`border rounded-md p-2 pr-10 ${selectedDeparture && selectedReturn ? "flex-1" : ""} relative`}>
                    <h2 className="text-base font-bold mb-1">Berangkat</h2>
                    <p className="text-sm font-semibold">
                      {selectedDeparture.departure_city} -{"> "}
                      {selectedDeparture.arrival_city}
                    </p>
                    <p className="text-sm font-semibold">
                      {selectedDeparture.airline_name} ({selectedDeparture.seat_class})
                    </p>
                    <p className="text-sm font-semibold">{selectedDeparture.departure_date}</p>
                    <div
                      className="grid grid-cols-3"
                      style={{
                        gridTemplateColumns: "1fr 5fr 2fr",
                        gridTemplateRows: "repeat(3, auto)",
                        alignItems: "center",
                      }}
                    >
                      <div className="text-sm font-bold">{selectedDeparture.departure_time.slice(0, -3)}</div>
                      <div className="text-sm text-center text-gray-500 font-medium">{calculateDuration(selectedDeparture.departure_time, selectedDeparture.arrival_time)}</div>
                      <div className="text-sm font-bold">{selectedDeparture.arrival_time.slice(0, -3)}</div>
                      <div></div>
                      <div className="text-center">
                        <img src="arrow.svg" alt="arrowicon" />
                      </div>
                      <div></div>
                      <div className="text-black font-semibold">{selectedDeparture.departure_iata_code}</div>
                      <div className="text-sm text-center text-gray-500 font-medium">Direct</div>
                      <div className="text-black font-semibold">{selectedDeparture.arrival_iata_code}</div>
                    </div>

                    <button onClick={() => handleRemoveSelection("departure")} className="bg-red-500 text-white w-8 h-8 rounded-full absolute top-0 right-0 flex items-center justify-center">
                      X
                    </button>
                  </div>
                )}
                {selectedReturn && (
                  <div className={`border rounded-md p-2 pr-10 ${selectedDeparture && selectedReturn ? "flex-1" : ""} relative`}>
                    <h2 className="text-base font-bold mb-1">Pulang</h2>
                    <p className="text-sm font-semibold">
                      {selectedReturn.departure_city} -{"> "}
                      {selectedReturn.arrival_city}
                    </p>
                    <p className="text-sm font-semibold">
                      {selectedReturn.airline_name} ({selectedReturn.seat_class})
                    </p>
                    <p className="text-sm font-semibold">{selectedReturn.departure_date}</p>
                    <div
                      className="grid grid-cols-3"
                      style={{
                        gridTemplateColumns: "1fr 5fr 2fr",
                        gridTemplateRows: "repeat(3, auto)",
                        alignItems: "center",
                      }}
                    >
                      <div className="text-sm font-bold">{selectedReturn.departure_time.slice(0, -3)}</div>
                      <div className="text-sm text-center text-gray-500 font-medium">{calculateDuration(selectedReturn.departure_time, selectedReturn.arrival_time)}</div>
                      <div className="text-sm font-bold">{selectedReturn.arrival_time.slice(0, -3)}</div>
                      <div></div>
                      <div className="text-center">
                        <img src="arrow.svg" alt="arrowicon" />
                      </div>
                      <div></div>
                      <div className="text-black font-semibold">{selectedReturn.departure_iata_code}</div>
                      <div className="text-sm text-center text-gray-500 font-medium">Direct</div>
                      <div className="text-black font-semibold">{selectedReturn.arrival_iata_code}</div>
                    </div>

                    <button onClick={() => handleRemoveSelection("return")} className="bg-red-500 text-white w-8 h-8 rounded-full absolute top-0 right-0 flex items-center justify-center">
                      X
                    </button>
                  </div>
                )}
              </div>
              {selectedDeparture !== null && selectedReturn !== null && (
                <button className={`${selectedDeparture && selectedReturn ? "bg-[#7126B5] cursor-pointer" : "bg-gray-500 cursor-not-allowed"} text-white p-1`} onClick={handleLanjutkan} disabled={!selectedDeparture && !selectedReturn}>
                  Lanjutkan
                </button>
              )}
            </div>
            <button className="flex justify-center items-center ml-auto gap-2 px-3 py-1 border border-[#A06ECE] text-[#7126B5] rounded-full mx-4" onClick={handleOpenModal}>
              <LuArrowUpDown className="text-lg" />
              <span className="text-base">{getButtonText()}</span>
            </button>
          </motion.div>
        )}

        <Sort
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedFilter={temporaryFilter}
          onSelectFilter={handleSelectFilter}
          onApplyFilter={handleApplyFilter}
          flights={filteredFlights}
          isFiltered={setIsFilteredFlights}
          setFlights={setDataFlight}
        />

        {!isSeatAvailable ? (
          <SoldOut />
        ) : loading ? (
          <Loading loading={loading} />
        ) : (
          <div className="flex flex-col md:flex-row gap-5 mx-4">
            <motion.div initial={{ opacity: 0, x: -75 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.25 }} className="flex-col gap-4 font-medium none hidden md:flex text-base md:w-1/4">
              <h1 className="font-medium text-base">Filter</h1>
              <Filter />
            </motion.div>
            <div className="flex-grow">
              {dataFlight.length !== 0 ? (
                <>
                  {dataFlight.map((flight, index) => (
                    <FlightCard
                      key={index}
                      index={index}
                      flight={flight}
                      setIsVerified={setIsVerified}
                      isOpen={openAccordion === index}
                      toggleAccordion={() => toggleAccordion(index)}
                      handleSelect={() => handleSelect(flight)}
                      isLogin={isLogin}
                    />
                  ))}
                  {isFilteredFlights && <Pagination currentPage={currentPage} totalPages={totalPages} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handlePageClick={handlePageClick} />}
                </>
              ) : (
                <ResultNotFound />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
