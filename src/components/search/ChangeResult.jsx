<<<<<<< HEAD
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
=======
import { useNavigate } from "react-router-dom";

const ChangeResult = () => {
  const flightDetails = {
    from: "JKT",
    to: "MLB",
    passengers: 2,
    seatClass: "Economy",
  };

  const navigate = useNavigate();
>>>>>>> 4cadb8f88eeaed04bf088fbcb5991b6a8d328d6d

const ChangeResult = ({ origin, destination, passengers, classType }) => {
  return (
<<<<<<< HEAD
    <div className="flex items-center flex-grow bg-[#A06ECE] text-white gap-5 p-2 md:p-3 rounded-lg">
      <Link to="/">
        <IoMdArrowRoundBack className="text-2xl" />
      </Link>
      <h3 className="text-base">
        {origin} &gt; {destination} - {passengers} Penumpang - {classType}
      </h3>
=======
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h2 className="font-bold text-lg mb-4 py-4">Pilih Penerbangan</h2>
      <div className="flex justify-between items-center">
        {/* Informasi Penerbangan */}
        <div className="flex-grow flex items-center bg-[#A06ECE] text-white px-4 py-3 rounded-lg mr-2 ml-7">
          <span className="material-icons mr-2">
            <button
              className="flex items-center justify-center mr-2"
              onClick={() => navigate("/")}
            >
              <img src="icons/fi_arrow-left.svg" alt="back" />
            </button>
          </span>
          <span>
            {flightDetails.from} &gt; {flightDetails.to} -{" "}
            {flightDetails.passengers} Penumpang - {flightDetails.seatClass}
          </span>
        </div>

        {/* Tombol Ubah Pencarian */}
        <button
          className="bg-[#73CA5C] text-white px-12 py-3 rounded-lg font-medium mr-7"
          onClick={() => navigate("/")}
        >
          Ubah Pencarian
        </button>
      </div>
>>>>>>> 4cadb8f88eeaed04bf088fbcb5991b6a8d328d6d
    </div>
  );
};

export default ChangeResult;
