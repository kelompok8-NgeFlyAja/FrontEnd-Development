import { useState } from "react";

function DateFilter() {
  const dummyDates = [
    { day: "Selasa", date: "01/03/2023" },
    { day: "Rabu", date: "02/03/2023" },
    { day: "Kamis", date: "03/03/2023" },
    { day: "Jumat", date: "04/03/2023" },
    { day: "Sabtu", date: "05/03/2023" },
    { day: "Minggu", date: "06/03/2023" },
    { day: "Senin", date: "07/03/2023" },
    { day: "Selasa", date: "08/03/2023" },
  ];

  const [selectedDate, setSelectedDate] = useState(dummyDates[1].date);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="content max-w-full w-full mx-auto relative pt-1 flex gap-4 justify-center border-b border-gray-300 py-7 shadow-md">
      {dummyDates.map((item, index) => (
        <button key={index} onClick={() => handleDateClick(item.date)} className={`flex flex-col items-center px-4 py-1 rounded-lg ${selectedDate === item.date ? "bg-[#A06ECE] text-white" : "bg-white text-black"}`}>
          <span className={`font-medium ${selectedDate === item.date ? "text-white" : "text-black"}`}>{item.day}</span>
          <span className={`text-sm ${selectedDate === item.date ? "text-white" : "text-[#8A8A8A]"}`}>{item.date}</span>
        </button>
      ))}
    </div>
  );
}

export default DateFilter;
