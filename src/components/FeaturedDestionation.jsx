import React from "react";

const destinations = [
  {
    id: 1,
    image: "bangkok.png",
    title: "Jakarta -> Bangkok",
    airline: "AirAsia",
    date: "20 - 30 Maret 2023",
    price: "IDR 950.000",
    label: "Limited!",
  },
  {
    id: 2,
    image: "/path/to/image-sydney.jpg",
    title: "Jakarta -> Sydney",
    airline: "AirAsia",
    date: "5 - 25 Maret 2023",
    price: "IDR 3.650.000",
    label: "50% OFF",
  },
];

const GridComponent = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {destinations.map((dest) => (
        <div
          key={dest.id}
          className="w-[166px] h-[194px] shadow-md rounded-md relative bg-white"
        >
          <div className="relative w-[150px] h-[94px] mx-auto mt-2">
            <img
              src={dest.image}
              alt={dest.title}
              className="absolute top-[7.5px] left-[8.5px] w-full h-full rounded-md"
            />
            {dest.label && (
              <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs px-2 py-1 rounded-tr-md rounded-bl-md">
                {dest.label}
              </div>
            )}
          </div>
          <div className="mt-2 px-2 text-sm font-semibold">{dest.title}</div>
          <div className="px-2 text-xs text-gray-500">{dest.airline}</div>
          <div className="px-2 text-xs text-gray-500">{dest.date}</div>
          <div className="px-2 mt-2 text-red-600 font-bold">{dest.price}</div>
        </div>
      ))}
    </div>
  );
};

const FeaturedDestionation = () => {
  return (
    <div className="p-6">
      <h1 className="text-[16px] font-[700] leading-[24px] text-gray-800">
        Destinasi Favorit
      </h1>
      <SearchComponent />
      <GridComponent />
    </div>
  );
};

export default FeaturedDestionation;
