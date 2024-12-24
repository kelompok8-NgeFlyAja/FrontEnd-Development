import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Filter = ({ setSelectedFilter, selectedFilter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortOptions = [
    "Hari Ini",
    "Minggu Ini",
    "Bulan Ini",
    "6 Bulan Terakhir",
    "1 Tahun Terakhir",
    "Selamanya",
    "Hapus Filter",
  ];

  const onSelectFilter = (option) => {
    setSelectedFilter(option === "Hapus Filter" ? "" : option);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white ring-1 ring-[#A06ECE] text-[#7126B5] font-bold px-4 py-1 rounded-full"
      >
        <div className="flex gap-1">
          <img src="/icons/sort-icon.svg" alt="Sort Icon" />
          {selectedFilter || "Filter"}
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="absolute inset-0 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-11/12 md:w-full">
              <div className="flex justify-end pt-2 px-2">
                <button
                  className="text-black text-3xl"
                  onClick={() => setIsModalOpen(false)}
                >
                  <IoMdClose />
                </button>
              </div>

              <div>
                {sortOptions.map((option, idx) => {
                  const [label, detail] = option.split(" - ");
                  return (
                    <div
                      key={idx}
                      className={`p-2 flex justify-between items-center cursor-pointer ${
                        selectedFilter === option
                          ? "bg-purple-700 text-white"
                          : "text-black hover:bg-gray-200"
                      }`}
                      onClick={() => onSelectFilter(option)}
                    >
                      <h1>
                        <strong>{label}</strong> {detail && `- ${detail}`}
                      </h1>
                      {selectedFilter === option && option !== "Hapus Filter" && (
                        <FaCheckCircle className="text-xl text-[#73CA5C]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Filter;
