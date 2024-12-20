import React from "react";
import TypeFilter from "./TypeFilter.jsx";
import { FaRegHeart } from "react-icons/fa";
import { FiBox, FiDollarSign } from "react-icons/fi";

const Filter = () => {
  return (
    <>
      <TypeFilter 
      icons={<FiBox 
      className="text-xl" />} 
      label={"Transit"}
      more={true} />
      <TypeFilter
        icons={<FaRegHeart className="text-xl" />}
        label={"Fasilitas"}
        more={true}
      />
      <TypeFilter
        icons={<FiDollarSign className="text-xl" />}
        label={"Harga"}
        more={true}
      />
    </>
  );
};

export default Filter;
