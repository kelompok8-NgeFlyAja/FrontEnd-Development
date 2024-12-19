import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FlightCard = ({ flight, isOpen, toggleAccordion }) => {
  console.log(flight);
  const handleSelect = () => {
    console.log("Selected ticket:", flight);
  };

  return (
    <div className="shadow-md border-2 rounded-3xl bg-white mb-4 transition-all duration-500 w-[95vw] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[640px] relative">
      {/* Header Section */}
      <div className={`px-4 py-3 text-left text-lg font-medium text-gray-900 bg-white flex items-center justify-between ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}>
        <div className="flex items-start">
          <div className="flex flex-col ml-2">
            <span className="text-sm text-gray-500">
              {flight.plane.planeCode} - {flight.route.seatClass}
            </span>
            <div
              className="grid grid-cols-3 gap-0 text-sm text-gray-500 mt-1"
              style={{
                gridTemplateColumns: "1fr 5fr 2fr",
                gridTemplateRows: "repeat(3, auto)",
                alignItems: "center",
              }}
            >
              <div>
                <strong className="text-black">{flight.departureTime}</strong>
              </div>
              <div className="text-sm text-center">{flight.duration}</div>
              <div>
                <strong className="text-black">{flight.arrivalTime}</strong>
              </div>
              <div></div>
              <div className="text-center">
                <img src="/icons/Arrow.svg" alt="Arrow Icon" />
              </div>
              <div></div>
              <div className="text-black">{flight.departureAirport}</div>
              <div className="text-sm text-center">Direct</div>
              <div className="text-black">{flight.arrivalAirport}</div>
            </div>
          </div>
        </div>
        <div>
          <img className="hidden md:block me-10" src="/icons/baggage.svg" alt="Baggage Icon" />
        </div>
        <div className="flex flex-col items-end">
          <div className="md:text-[16px] text-sm text-purple-600 mt-4 md:mt-7 mb-1">{flight.price}</div>
          <button
            className="text-sm md:w-[100px] md:h-[32px] w-[70px] h-[20px] mr-2 px-4 py-2 bg-purple-600 text-white rounded mb-1 hover:bg-purple-700"
            style={{
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s ease",
            }}
            onClick={handleSelect}
          >
            Pilih
          </button>
        </div>
      </div>

      {/* Accordion Toggle */}
      <button className="focus:outline-none flex items-center justify-center absolute top-2 right-2 w-5 h-5 border border-gray-400 rounded-full bg-transparent" onClick={toggleAccordion}>
        {isOpen ? <FaChevronUp color="rgba(128, 128, 128, 0.7)" size={16} /> : <FaChevronDown color="rgba(128, 128, 128, 0.7)" size={16} />}
      </button>

      {/* Accordion Content */}
      <div className={`${isOpen ? "block" : "hidden"} px-4 py-3 bg-gray-50 transition-all duration-500 rounded-b-lg border-t border-gray-300`}>
        <div className="mb-2">
          <div className="text-sm text-gray-500 font-semibold" style={{ color: "#7126B5" }}>
            Detail Penerbangan
          </div>
          <div className="text-sm flex justify-between text-black">
            <div>
              <strong>{flight.departureTime}</strong>
            </div>
            <div className="font-semibold" style={{ color: "#A06ECE" }}>
              Keberangkatan
            </div>
          </div>
          <div className="text-sm">{flight.departureDate}</div>
          <div className="text-sm">{flight.departureAirport}</div>
        </div>
        <hr className="my-1 border-gray-300" />
        <div className="text-black text-sm mb-2">
          <strong>
            {flight.airline} - {flight.class}
          </strong>
          <div>
            <strong>Kode Pesawat: JT03</strong>
          </div>
        </div>
        <div className="mb-2 flex items-center">
          <img src="Image.svg" alt="Logo" className="h-6 mr-2" />
          <div className="flex flex-col ml-2">
            <div className="text-sm text-gray-500 font-semibold">Informasi</div>
            <div className="text-sm">Baggage: {flight.baggage} kg</div>
            <div className="text-sm">Cabin Baggage: {flight.cabinBaggage} kg</div>
            <div className="text-sm">In-Flight Entertainment: {flight.entertainment ? "Yes" : "No"}</div>
          </div>
        </div>
        <hr className="my-1 border-gray-300" />
        <div className="mb-2">
          <div className="flex justify-between text-black">
            <div className="text-sm">
              <strong>{flight.arrivalTime}</strong>
            </div>
            <div className="text-sm font-semibold" style={{ color: "#A06ECE" }}>
              Kedatangan
            </div>
          </div>
          <div className="text-sm">{flight.arrivalDate}</div>
          <div className="text-sm">{flight.destinationAirport}</div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
