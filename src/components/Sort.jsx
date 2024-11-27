import React, { useState } from "react";

function Sort() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [tempSelectedSort, setTempSelectedSort] = useState("Harga Termurah");
  const [selectedSort, setSelectedSort] = useState("Harga Termurah");

  const options = ["Harga Termurah", "Keberangkatan Paling Awal", "Keberangkatan Paling Akhir", "Kedatangan Paling Awal", "Kedatangan Paling Akhir"];

  const handleConfirmSort = () => {
    setSelectedSort(tempSelectedSort);
    setShowDropdown(false);
  };

  const handleCancelSort = () => {
    setTempSelectedSort(selectedSort);
    setShowDropdown(false);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <div className="flex justify-end relative">
        {/* Button Sort */}
        <button onClick={() => setShowDropdown((prev) => !prev)} className="flex items-center gap-2 border border-[#A06ECE] text-[#7126B5] px-2 py-1 rounded-full mr-8">
          <img src="/icons/sort.svg" alt="sort" />
          <span>
            <span className="font-bold">{selectedSort.split(" ")[0]}</span> - {selectedSort.split(" ").slice(1).join(" ")}
          </span>
        </button>

        {/* Dropdown Sort Options */}
        {showDropdown && (
          <div className="absolute right-8 top-full mt-2 w-80 bg-white border border-[#A06ECE] rounded-lg shadow-lg z-10">
            <div className="flex justify-end px-4 py-3">
              {/* Icon Cancel */}
              <img src="/icons/cancel.svg" alt="cancel" className="cursor-pointer" onClick={handleCancelSort} />
            </div>

            <ul className="flex flex-col">
              {options.map((option, index) => (
                <li
                  key={option}
                  className={`flex justify-between items-center px-4 py-2 cursor-pointer border-t border-gray-300
                  ${index === options.length - 1 ? "border-b" : ""} ${tempSelectedSort === option ? "bg-[#7126B5] text-white" : "hover:bg-gray-100"}`}
                  onClick={() => setTempSelectedSort(option)}
                >
                  <span>
                    <span className="font-bold">{option.split(" ")[0]}</span> - {option.split(" ").slice(1).join(" ")}
                  </span>
                  {tempSelectedSort === option && <img src="/icons/check.svg" alt="selected" />}
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex justify-end px-4 py-2 border-t">
              <button className="px-12 py-2 bg-[#7126B5] text-white rounded-md" onClick={handleConfirmSort} disabled={!tempSelectedSort}>
                Pilih
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sort;
