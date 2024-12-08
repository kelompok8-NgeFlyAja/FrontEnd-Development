import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ChangeResult = ({ origin, destination, passengers, classType }) => {
  return (
    <div className="flex items-center flex-grow bg-[#A06ECE] text-white gap-5 p-2 md:p-3 rounded-lg">
      <Link to="/">
        <IoMdArrowRoundBack className="text-2xl" />
      </Link>
      <h3 className="text-base">
        {origin} &gt; {destination} - {passengers} Penumpang - {classType}
      </h3>
    </div>
  );
};

export default ChangeResult;
