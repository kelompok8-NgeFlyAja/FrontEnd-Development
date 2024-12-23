import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FlightCard = ({
  flight,
  isOpen,
  toggleAccordion,
  adultPassenger,
  childPassenger,
  babyPassenger,
}) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    // Generate checkout URL with required parameters
    const checkoutUrl = `/checkout?flightId=${flight.flightId}&adultPassenger=${adultPassenger}&childPassenger=${childPassenger}&babyPassenger=${babyPassenger}`;
    navigate(checkoutUrl);
  };

  const formatTimeTo24Hour = (time) => {
    if (!time) return "Invalid time";
    try {
      const [timePart, modifier] = time.split(" ");
      let [hours, minutes, seconds] = timePart.split(":").map(Number);

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
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
    <div className="ring-2 ring-gray-100 hover:ring-violet-300 rounded-lg mb-4 transition-all duration-500 relative">
      {/* Detail Section */}
      <div
        className={`shadow-md rounded-t-lg px-4 py-3 text-left text-lg font-medium text-gray-900 bg-white flex items-center justify-between ${
          isOpen ? "rounded-b-none" : "rounded-b-lg"
        }`}
      >
        <div className="flex items-start">
          <div className="flex flex-col ml-2">
            <span className="text-sm text-gray-500">
              {flight.flightCode} - {flight.route.seatClass}
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
                <strong className="text-black">
                  {formatTimeTo24Hour(flight.departureTime)}
                </strong>
              </div>
              <div className="text-sm text-center">{flight.duration}</div>
              <div>
                <strong className="text-black">
                  {formatTimeTo24Hour(flight.arrivalTime)}
                </strong>
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
        <div className="flex flex-col items-end">
          <div className="md:text-[16px] text-sm font-bold text-[#7126B5] mt-2 md:mt-2 mb-1">
            IDR {formatPrice(flight.price)}
          </div>
          <button
            className="text-sm md:w-[100px] md:h-[32px] w-[70px] h-[20px] px-4 py-2 bg-[#7126B5] text-white rounded mb-1 hover:bg-[#4B1979]"
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
    </div>
  );
};

export default FlightCard;
