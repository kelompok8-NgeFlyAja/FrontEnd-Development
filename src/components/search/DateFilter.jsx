import { useState } from "react";

const DateFilter = ({ day, date, onClick, isSelected }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => setHovered(true);
  const handleMouseOut = () => setHovered(false);

  const buttonStyle = `min-w-[116px] h-[50px] p-0 pr-2 gap-2 border cursor-pointer rounded-lg transition-colors duration-300 relative ${isSelected || hovered ? "bg-[#7126B5] text-white" : "hover:bg-[#7126B5] hover:text-white"}`;

  const dateStyle = `text-gray-600 font-poppins text-sm font-medium leading-4 text-center ${isSelected || hovered ? "text-white" : ""}`;

  return (
<<<<<<< HEAD
    <div>
      <button onClick={() => onClick(date)} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} className={buttonStyle}>
        <h2 className="font-poppins text-lg font-semibold leading-5 text-center">{day}</h2>
        <h3 className={dateStyle}>{date}</h3>
        <div className="absolute right-0 top-24 w-24 h-0 border-l border-gray-300 opacity-0 transform rotate-90"></div>
      </button>
=======
    <div className="content max-w-full w-full mx-auto relative pt-1 flex gap-4 justify-center border-b border-gray-300 py-7 shadow-md">
      {dummyDates.map((item, index) => (
        <button
          key={index}
          onClick={() => handleDateClick(item.date)}
          className={`flex flex-col items-center px-4 py-1 rounded-lg ${
            selectedDate === item.date
              ? "bg-[#A06ECE] text-white"
              : "bg-white text-black"
          }`}
        >
          <span
            className={`font-medium ${
              selectedDate === item.date ? "text-white" : "text-black"
            }`}
          >
            {item.day}
          </span>
          <span
            className={`text-sm ${
              selectedDate === item.date ? "text-white" : "text-[#8A8A8A]"
            }`}
          >
            {item.date}
          </span>
        </button>
      ))}
>>>>>>> 4cadb8f88eeaed04bf088fbcb5991b6a8d328d6d
    </div>
  );
};

export default DateFilter;
