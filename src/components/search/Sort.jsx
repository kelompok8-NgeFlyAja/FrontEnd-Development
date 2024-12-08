import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Sort = ({ isOpen, onClose, selectedFilter, onSelectFilter, onApplyFilter, flights, isFiltered, setFlights }) => {
  if (!isOpen) return null;

  const sortOptions = ["Harga - Termurah", "Durasi - Terpendek", "Keberangkatan - Paling Awal", "Keberangkatan - Paling Akhir", "Kedatangan - Paling Awal", "Kedatangan - Paling Akhir"];

  const sortFunctions = {
    "Harga - Termurah": (a, b) => a.price - b.price,
    "Durasi - Terpendek": (a, b) => a.flight_duration - b.flight_duration,
    "Keberangkatan - Paling Awal": (a, b) => a.departure_time.localeCompare(b.departure_time),
    "Keberangkatan - Paling Akhir": (a, b) => b.departure_time.localeCompare(a.departure_time),
    "Kedatangan - Paling Awal": (a, b) => a.arrival_time.localeCompare(b.arrival_time),
    "Kedatangan - Paling Akhir": (a, b) => b.arrival_time.localeCompare(a.arrival_time),
  };

  const sortFlights = () => {
    const sorted = [...flights].sort(sortFunctions[selectedFilter]);
    setFlights(sorted);
    isFiltered(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-11/12 md:w-full">
        <div className="flex justify-end p-4">
          <button className="text-black text-3xl" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div>
          {sortOptions.map((option, idx) => {
            const [label, detail] = option.split(" - ");
            return (
              <div key={idx} className={`p-2 flex justify-between items-center cursor-pointer ${selectedFilter === option ? "bg-purple-700 text-white" : "text-black"}`} onClick={() => onSelectFilter(option)}>
                <h1>
                  <strong>{label}</strong> - {detail}
                </h1>
                {selectedFilter === option && <FaCheckCircle className="text-xl text-[#73CA5C]" />}
              </div>
            );
          })}
        </div>
        <hr className="border-gray-300" />
        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
          <button
            type="button"
            className="rounded-xl px-16 py-2 md:py-3 text-base font-medium text-white bg-[#4B1979] hover:bg-purple-800"
            onClick={() => {
              sortFlights();
              onApplyFilter();
            }}
          >
            Pilih
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sort;
