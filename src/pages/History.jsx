import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdSearch, IoMdArrowRoundBack } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import useFetchTransactionHistory from "@/hooks/useFetchTransactionHistory";
import HistoryCard from "@/components/history/historyCard";
import HistoryEmpty from "@/components/history/HistoryEmpty";
import HistoryDetail from "@/components/history/HistoryDetail";

const History = () => {
  const { transactionHistory, loading, error } = useFetchTransactionHistory();
  const [selectedHistory, setSelectedHistory] = useState(null);

  const handleSelectHistory = (history) => {
    setSelectedHistory(history);
  };

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
      <div className="flex justify-between items-center gap-5 mx-4 mb-5">
        <motion.div
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.75 }}
          viewport={{ once: true }}
          className="flex items-center flex-grow bg-[#A06ECE] text-white gap-5 p-2 rounded-lg"
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
          <button className="flex items-center text-base gap-2 border border-[#7126B5] p-1 px-2 rounded-full">
            <BiFilterAlt className="text-[#8A8A8A] text-xl" /> <p>Filter</p>
          </button>
          <button>
            <IoMdSearch className="text-[#7126B5] text-4xl" />
          </button>
        </motion.div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <div className="md:w-2/3">
            {transactionHistory.length > 0 ? (
              transactionHistory.map((history) => (
                <HistoryCard
                  key={history.bookingId}
                  history={history}
                  selected={selectedHistory?.bookingId === history.bookingId}
                  onClick={() => handleSelectHistory(history)}
                />
              ))
            ) : (
              <HistoryEmpty />
            )}
          </div>
          <div className="md:w-1/3">
            {selectedHistory ? (
              <HistoryDetail history={selectedHistory} />
            ) : (
              <p className="text-gray-500">Pilih riwayat untuk melihat detail</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
