import React from "react";
import { motion } from "framer-motion";

const HistoryCard = ({ history, selected, onClick }) => {
  const getStatusStyle = (status) => {
    if (!status) return "bg-gray-500 text-gray-700";
    switch (status) {
      case "CANCEL":
        return "bg-red-500 text-white";
      case "SUCCESS":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-gray-700";
    }
  };

  const formatTimeTo24Hour = (time) => {
    if (!time) return "Invalid time";
    try {
      const [timePart, modifier] = time.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    } catch (error) {
      console.error("Time parsing error:", error);
      return "Invalid time";
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") return "Invalid price";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -75 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.25,
        delay: selected ? 0.25 : 0,
      }}
      className={`p-4 rounded-lg shadow-md mb-4 cursor-pointer ${
        selected ? "ring-2 ring-[#7126B5]" : "ring-1 ring-gray-300"
      }`}
      onClick={onClick}
    >
      <div
        className={`${getStatusStyle(
          history.status
        )} px-3 py-1 rounded-full inline-block mb-1`}
      >
        {history.status}
      </div>
      <div className="flex justify-between items-center mb-1">
        <div className="text-center">
          <h3 className="text-md font-bold text-gray-900">
            {history.departureAirportName}
          </h3>
          <p className="text-gray-700 text-sm">{history.departureDate}</p>
          <p className="text-gray-700 text-sm">
            {formatTimeTo24Hour(history.departureTime)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-700 text-sm">6h</p>
          <img
            src="/icons/Arrow.svg"
            className="w-[120px] md:w-[200px]"
            alt="Arrow Icon"
          />
        </div>
        <div className="text-center">
          <h3 className="text-md font-bold text-gray-900">
            {history.arrivalAirportName}
          </h3>
          <p className="text-gray-700 text-sm">{history.arrivalDate}</p>
          <p className="text-gray-700 text-sm">
            {formatTimeTo24Hour(history.arrivalTime)}
          </p>
        </div>
      </div>
      <hr className="border-t-2 border-gray-200 mb-1" />
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="text-md font-bold text-gray-900">Booking Code:</h3>
          <p className="text-gray-700 text-sm">{history.bookingCode}</p>
        </div>
        <div>
          <h3 className="text-md font-bold text-gray-900">Class:</h3>
          <p className="text-gray-700 text-sm">{history.seatClassName}</p>
        </div>
        <div className="text-right">
          <h3 className="text-md font-bold text-[#7126B5]">
            IDR {formatPrice(history.totalPrice)}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryCard;
