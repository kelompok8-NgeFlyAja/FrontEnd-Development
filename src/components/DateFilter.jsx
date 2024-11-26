import React, { useState } from "react";
import { Button } from "react-day-picker";

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
    <div className="content max-w-[1098px] w-full mx-auto  relative pt-6 bg-none rounded-lg flex gap-4 flex-wrap justify-start">
      {dummyDates.map((item, index) => (
        <Button key={index} onClick={() => handleDateClick(item.date)} className={`flex flex-col items-center px-4 py-2 border rounded-lg ${selectedDate === item.date ? "bg-purple-500 text-white" : "bg-white text-black"}`}>
          <span className="font-medium">{item.day}</span>
          <span className="text-sm">{item.date}</span>
        </Button>
      ))}
    </div>
  );
}

export default DateFilter;
