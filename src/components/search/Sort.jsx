import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Sort = ({ setSelectedSort, selectedSort }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortOptions = [
    "Harga - Termurah",
    "Durasi - Terpendek",
    "Keberangkatan - Paling Awal",
    "Keberangkatan - Paling Akhir",
    "Kedatangan - Paling Awal",
    "Kedatangan - Paling Akhir",
    "Hapus Urutan",
  ];

  const onSelectFilter = (option) => {
    setSelectedSort(option === "Hapus Urutan" ? "" : option);
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
          {selectedSort || "Urutkan"}
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="absolute z-50 bg-white rounded-lg shadow-xl max-w-md w-11/12 md:w-full">
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
                      selectedSort === option
                        ? "bg-purple-700 text-white"
                        : "text-black hover:bg-gray-200"
                    }`}
                    onClick={() => onSelectFilter(option)}
                  >
                    <h1>
                      <strong>{label}</strong> {detail && `- ${detail}`}
                    </h1>
                    {selectedSort === option && option !== "Hapus Urutan" && (
                      <FaCheckCircle className="text-xl text-[#73CA5C]" />
                    )}
                  </div>
                );
              })}
            </div>

            <hr className="border-gray-300" />

            <div className="rounded-lg bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
              <button
                type="button"
                className="rounded-xl px-16 py-2 md:py-3 text-base font-medium text-white bg-[#4B1979] hover:bg-purple-800"
                onClick={() => setIsModalOpen(false)}
              >
                Pilih
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sort;
