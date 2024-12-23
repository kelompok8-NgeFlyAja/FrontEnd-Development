import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiBox, FiDollarSign } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowUp } from "react-icons/io";

const FilterAccordionItem = ({ icon, label, options, selectedOption, setSelectedOption, setSelectedFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option) => {
    setSelectedFilter(option);
    if(option == "None") {
      option = null;
    }
    setSelectedOption(option);
  };

  return (
    <div>
      {/* Accordion Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-gray-100 transition-all duration-300"
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-lg font-medium text-gray-800">{label}</span>
        </div>
        <span className="text-gray-500 text-xl">
          {isOpen ? (
            <IoIosArrowUp className="text-xl" />
          ) : (
            <IoIosArrowForward className="text-xl" />
          )}
        </span>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-300">
          {options.map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-2 text-gray-700 mb-2 last:mb-0"
            >
              <input
                type="radio"
                name={`filter-${label}`} 
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                className="form-radio h-5 w-5 border-gray-300 bg-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const Filter = ({ setSelectedBaggageFilter, setSelectedCBaggageFilter, setSelectedPriceFilter }) => {
  const [selectedBaggageFilter, setBaggageFilter] = useState(null);
  const [selectedCBaggageFilter, setCBaggageFilter] = useState(null);
  const [selectedPriceFilter, setPriceFilter] = useState(null);

  return (
    <div className="shadow-md ring-2 shadow-gray-300 ring-gray-100 rounded-3xl overflow-hidden">
      <h1 className="p-4 font-medium text-base">Filter</h1>
      <FilterAccordionItem
        icon={<FiBox className="text-xl" />}
        label="Baggage"
        options={["None", "1Kg - 5Kg", ">5kg", ">10Kg"]}
        selectedOption={selectedBaggageFilter}
        setSelectedOption={setSelectedBaggageFilter}
        setSelectedFilter={setBaggageFilter}
      />
      <FilterAccordionItem
        icon={<FaRegHeart className="text-xl" />}
        label="Cabin Baggage"
        options={["None", "1Kg - 5Kg", ">5kg"]}
        selectedOption={selectedCBaggageFilter}
        setSelectedOption={setSelectedCBaggageFilter}
        setSelectedFilter={setCBaggageFilter}
      />
      <FilterAccordionItem
        icon={<FiDollarSign className="text-xl" />}
        label="Harga"
        options={[
          "None",
          "Di bawah 1 Juta",
          "1 Juta - 3 Juta",
          "3 Juta - 5 Juta",
          "Di atas 5 Juta",
        ]}
        selectedOption={selectedPriceFilter}
        setSelectedOption={setSelectedPriceFilter}
        setSelectedFilter={setPriceFilter}
      />
    </div>
  );
};

export default Filter;
