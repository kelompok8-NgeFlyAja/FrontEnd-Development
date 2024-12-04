import { useState } from "react";
const SeatItem = ({ seatNumber, sendData, isAvailable }) => {
  const [isSelected, setIsSelected] = useState(false);
  function handleClick(seat_number) {
    if (isSelected) {
      setIsSelected(false);
      sendData(seat_number);
    } else {
      setIsSelected(true);
      sendData(seat_number);
    }
  }
  return (
    <>
      {isAvailable && (
        <button
          className={`w-9 h-9 rounded-md p-1 transition-all duration-200 ease-in-out ${
            isSelected
              ? "bg-[#7126B5] text-white"
              : "bg-[#73CA5C] text-[#73CA5C]"
          }`}
          onClick={() => handleClick(seatNumber)}
        >
          {isSelected ? `${seatNumber}` : ""}
        </button>
      )}
      {!isAvailable && (
        <button
          className="w-9 h-9 rounded-md bg-gray-300 text-white cursor-not-allowed"
          disabled
        >
          X
        </button>
      )}
    </>
  );
};
export default SeatItem;
