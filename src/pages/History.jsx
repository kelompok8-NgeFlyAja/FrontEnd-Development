import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSearch, IoMdArrowRoundBack } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetchTransactionHistory from "@/hooks/useFetchTransactionHistory";
import HistoryCard from "@/components/history/historyCard";

const History = () => {
  const { transactionHistory, loading, error } = useFetchTransactionHistory();

  console.log(transactionHistory);
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
        <div className="mt-5">
          {transactionHistory.length > 0 ? (
            <ul className="list-disc list-inside">
              {transactionHistory.map((history) => (
                    <HistoryCard
                      key={history.bookingId}
                      history={history}
                      selected={""}
                      onClick={""}
                    />
                  ))}
            </ul>
          ) : (
            <p>No transaction history found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
