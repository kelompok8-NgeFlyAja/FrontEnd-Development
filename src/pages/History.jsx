import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdSearch, IoMdArrowRoundBack } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import useFetchTransactionHistory from "@/hooks/useFetchTransactionHistory";
import HistoryEmpty from "@/components/history/HistoryEmpty";
import HistoryDetail from "@/components/history/HistoryDetail";
import HistoryCard from "@/components/history/HistoryCard";
import Filter from "@/components/history/Filter";

const History = () => {
  const { transactionHistory, loading, error } = useFetchTransactionHistory();
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleSelectHistory = (history) => {
    setSelectedHistory(history);
  };

  const filterTransactionHistory = (historyData, filter) => {
    if (!filter) return historyData;

    const currentDate = new Date();

    switch (filter) {
      case "Hari Ini":
        return historyData.filter((history) => {
          const departureDate = new Date(history.departureDate);
          return (
            departureDate.getDate() === currentDate.getDate() &&
            departureDate.getMonth() === currentDate.getMonth() &&
            departureDate.getFullYear() === currentDate.getFullYear()
          );
        });
      case "Minggu Ini": {
        const startOfWeek = currentDate.getDate() - currentDate.getDay();
        const endOfWeek = startOfWeek + 6;
        const startOfWeekDate = new Date(currentDate.setDate(startOfWeek));
        const endOfWeekDate = new Date(currentDate.setDate(endOfWeek));
        return historyData.filter((history) => {
          const departureDate = new Date(history.departureDate);
          return departureDate >= startOfWeekDate && departureDate <= endOfWeekDate;
        });
      }
      case "Bulan Ini":
        return historyData.filter((history) => {
          const departureDate = new Date(history.departureDate);
          return (
            departureDate.getMonth() === currentDate.getMonth() &&
            departureDate.getFullYear() === currentDate.getFullYear()
          );
        });
      case "6 Bulan Terakhir": {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
        return historyData.filter((history) => {
          const departureDate = new Date(history.departureDate);
          return departureDate >= sixMonthsAgo;
        });
      }
      case "1 Tahun Terakhir": {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
        return historyData.filter((history) => {
          const departureDate = new Date(history.departureDate);
          return departureDate >= oneYearAgo;
        });
      }
      case "Selamanya":
        return historyData;
      default:
        return historyData;
    }
  };

  useEffect(() => {
    if (transactionHistory.length > 0) {
      setSelectedHistory(transactionHistory[0]);
    }
  }, [transactionHistory]);

  const filteredHistory = filterTransactionHistory(transactionHistory, selectedFilter);

  useEffect(() => {
    if (filteredHistory.length > 0) {
      if (!filteredHistory.some((history) => history.bookingId === selectedHistory?.bookingId)) {
        setSelectedHistory(filteredHistory[0]); 
      }
    } else {
      setSelectedHistory(null); 
    }
  }, [filteredHistory, selectedHistory]);

  return (
    <div className="w-11/12 md:w-2/3 mx-auto flex flex-col mt-10 gap-5 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, x: -75 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.25 }}
        viewport={{ once: true }}
        className="text-xl font-bold"
      >
        Riwayat Pemesanan
      </motion.h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mx-4 mb-5">
        <motion.div
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.75 }}
          viewport={{ once: true }}
          className="w-full md:w-auto flex items-center flex-grow bg-[#A06ECE] text-white gap-5 p-2 rounded-lg"
        >
          <Link to="/">
            <IoMdArrowRoundBack className="text-2xl" />
          </Link>
          <h3 className="text-base">Beranda</h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.75 }}
          viewport={{ once: true }}
          className="flex gap-2 items-center"
        >
          <div>
            <Filter setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
          </div>
          <button>
            <IoMdSearch className="text-[#7126B5] text-4xl" />
          </button>
        </motion.div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="flex justify-center flex-col md:flex-row gap-5 mt-1 w-full overflow-hidden p-1">
            {filteredHistory.length > 0 ? (
            <>
              <div className="md:w-2/3 flex flex-col gap-2">
                {filteredHistory.map((history) => (
                  <HistoryCard
                    key={history.bookingId}
                    history={history}
                    selected={selectedHistory?.bookingId === history.bookingId}
                    onClick={() => handleSelectHistory(history)}
                  />
                ))}
                </div>
                <div className="md:w-1/3 flex-shrink-0">
                {selectedHistory ? (
                  <HistoryDetail history={selectedHistory} />
                ) : (
                  <div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-5">
                        <h3 className="text-gray-900 font-poppins text-lg font-bold">
                          Pilih Riwayat untuk Melihat Detail
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
            ) : (
              <HistoryEmpty className="w-full flex items-center" />
            )}
        </div>
      )}
    </div>
  );
};

export default History;
