<<<<<<< HEAD
import React from "react";
import TypeFilter from "./TypeFilter.jsx";
import { FaRegHeart } from "react-icons/fa";
import { FiBox, FiDollarSign } from "react-icons/fi";
=======
import { useState } from "react";

function Filter() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedTransit, setSelectedTransit] = useState({
    langsung: false,
    satuTransit: false,
    duaTransit: false,
  });
  const [facilities, setFacilities] = useState({
    baggage: false,
    cabinBaggage: false,
    inFlightEntertainment: false,
  });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [baggageRange, setBaggageRange] = useState({ min: "", max: "" });
  const [cabinBaggageRange, setCabinBaggageRange] = useState({
    min: "",
    max: "",
  });

  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };
>>>>>>> 4cadb8f88eeaed04bf088fbcb5991b6a8d328d6d

const Filter = () => {
  return (
    <>
      <TypeFilter icons={<FiBox className="text-xl" />} label="Transit" />
      <TypeFilter icons={<FaRegHeart className="text-xl" />} label="Fasilitas" more />
      <TypeFilter icons={<FiDollarSign className="text-xl" />} label="Harga" />
    </>
  );
};

export default Filter;
