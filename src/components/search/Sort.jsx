<<<<<<< HEAD
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
=======
import { useState } from "react";
>>>>>>> 4cadb8f88eeaed04bf088fbcb5991b6a8d328d6d

const Sort = ({ isOpen, onClose, selectedFilter, onSelectFilter, onApplyFilter, flights, isFiltered, setFlights }) => {
  if (!isOpen) return null;

<<<<<<< HEAD
  const sortOptions = ["Harga - Termurah", "Durasi - Terpendek", "Keberangkatan - Paling Awal", "Keberangkatan - Paling Akhir", "Kedatangan - Paling Awal", "Kedatangan - Paling Akhir"];
=======
  const options = [
    "Harga Termurah",
    "Keberangkatan Paling Awal",
    "Keberangkatan Paling Akhir",
    "Kedatangan Paling Awal",
    "Kedatangan Paling Akhir",
  ];
>>>>>>> 4cadb8f88eeaed04bf088fbcb5991b6a8d328d6d

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
<<<<<<< HEAD
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
=======
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <div className="flex justify-end relative">
        {/* Button Sort */}
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="flex items-center gap-2 border border-[#A06ECE] text-[#7126B5] px-2 py-1 rounded-full mr-8"
        >
          <img src="/icons/sort.svg" alt="sort" />
          <span>
            <span className="font-bold">{selectedSort.split(" ")[0]}</span> -{" "}
            {selectedSort.split(" ").slice(1).join(" ")}
          </span>
        </button>

        {/* Dropdown Sort Options */}
        {showDropdown && (
          <div className="absolute right-8 top-full mt-2 w-80 bg-white border border-[#A06ECE] rounded-lg shadow-lg z-10">
            <div className="flex justify-end px-4 py-3">
              {/* Icon Cancel */}
              <img
                src="/icons/cancel.svg"
                alt="cancel"
                className="cursor-pointer"
                onClick={handleCancelSort}
              />
            </div>

            <ul className="flex flex-col">
              {options.map((option, index) => (
                <li
                  key={option}
                  className={`flex justify-between items-center px-4 py-2 cursor-pointer border-t border-gray-300
                  ${index === options.length - 1 ? "border-b" : ""} ${
                    tempSelectedSort === option
                      ? "bg-[#7126B5] text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setTempSelectedSort(option)}
                >
                  <span>
                    <span className="font-bold">{option.split(" ")[0]}</span> -{" "}
                    {option.split(" ").slice(1).join(" ")}
                  </span>
                  {tempSelectedSort === option && (
                    <img src="/icons/check.svg" alt="selected" />
                  )}
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex justify-end px-4 py-2 border-t">
              <button
                className="px-12 py-2 bg-[#7126B5] text-white rounded-md"
                onClick={handleConfirmSort}
                disabled={!tempSelectedSort}
              >
                Pilih
              </button>
            </div>
          </div>
        )}
>>>>>>> 4cadb8f88eeaed04bf088fbcb5991b6a8d328d6d
      </div>
    </div>
  );
};

export default Sort;
