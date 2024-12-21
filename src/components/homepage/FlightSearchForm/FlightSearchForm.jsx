import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import LocationInput from "./LocationInput";
import DateInput from "./DateInput";
import PassengerInput from "./PassengerInput";
import SeatClassInput from "./SeatClassInput";

function FlightSearchForm() {
  const navigate = useNavigate();
  const [date, setDate] = useState({ from: new Date(), to: new Date() });
  const [isOpenPopoverDate, setIsOpenPopoverDate] = useState(false);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [fromAirportCode, setFromAirportCode] = useState("");
  const [toAirportCode, setToAirportCode] = useState(""); 
  const [isReturnChecked, setIsReturnChecked] = useState(false);
  const [seatClass, setSeatClass] = useState("Economy");

  const handleSwitchCities = () => {
    const tempCity = fromCity;
    const tempCode = fromAirportCode;
    setFromCity(toCity);
    setToCity(tempCity);
    setFromAirportCode(toAirportCode);
    setToAirportCode(tempCode);
  };

  const handleSelectDate = (selectedDate, field) => {
    if (field === "from") {
      setDate({ ...date, from: selectedDate });
    } else if (field === "to") {
      setDate({ ...date, to: selectedDate });
    }
  };

  const handleSeatClassChange = (newClass) => {
    setSeatClass(newClass);
  };

  const [passengerCounts, setPassengerCounts] = useState({
    adults: 1,
    childrens: 0,
    infants: 0,
  });

  const handlePassengerChange = useCallback((counts) => {
    setPassengerCounts(counts);
  }, []);

  const handleSearchClick = () => {
    const searchParams = new URLSearchParams({
      departureAirportCode: fromAirportCode,
      arrivalAirportCode: toAirportCode,
      departureTime: date.from.toISOString().split("T")[0], 
      seatClasses: seatClass,
      adultPassenger: passengerCounts.adults.toString(),
      childPassenger: passengerCounts.childrens.toString(),
      babyPassenger: passengerCounts.infants.toString(),
    });

    navigate(`/search?${searchParams.toString()}`);
    console.log("Search URL:", `/search-flights?${searchParams.toString()}`);
  };

  return (
    <motion.div 
    initial={{ opacity: 0, x: -75 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.75, delay: 0.25 }}
    viewport={{ once: true }}
    className="content max-w-[1098px] mt-6 w-[90%] md:w-full mx-auto lg:-mt-12 relative z-20 pt-6 bg-white rounded-lg shadow-2xl md:shadow-md"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 px-8">
        Pilih Jadwal Penerbangan spesial di
        <span className="text-purple-600 bg-white px-2 py-1 rounded">
          {" "}
          Tiketku
        </span>
      </h2>
      <form className="grid grid-cols-1 gap-8">
        <div className="px-8">
          <LocationInput
            fromValue={fromCity}
            toValue={toCity}
            onFromChange={setFromCity}
            onToChange={setToCity}
            onFromAirportCodeChange={setFromAirportCode}
            onToAirportCodeChange={setToAirportCode}
            onSwitch={handleSwitchCities}
          />
          <div className="flex flex-col gap-8 mt-9 md:flex-row md:items-center">
            <DateInput
              date={date}
              isOpenPopover={isOpenPopoverDate}
              isReturnChecked={isReturnChecked}
              onTogglePopover={() => setIsOpenPopoverDate(!isOpenPopoverDate)}
              onSelectDate={handleSelectDate}
              onSwitchChange={() => setIsReturnChecked(!isReturnChecked)}
            />
            <PassengerInput onPassengerChange={handlePassengerChange} />
            <SeatClassInput onClassSelect={handleSeatClassChange} />
          </div>
        </div>
        <Button
          type="button"
          onClick={handleSearchClick}
          className="bg-[#7126B5] text-white w-full py-3 rounded-b-md rounded-t-none"
        >
          Cari Penerbangan
        </Button>
      </form>
    </motion.div>
  );
}

export default FlightSearchForm;