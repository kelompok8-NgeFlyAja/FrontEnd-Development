import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [fromAirportCode, setFromAirportCode] = useState(""); // Added state
  const [toAirportCode, setToAirportCode] = useState(""); // Added state
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
      departureTime: date.from.toISOString().split("T")[0], // Format as yyyy-mm-dd
      seatClasses: seatClass,
      adultPassenger: passengerCounts.adults.toString(),
      childPassenger: passengerCounts.childrens.toString(),
      babyPassenger: passengerCounts.infants.toString(),
    });

    // Debugging output
    console.log("Search URL:", `/search-flights?${searchParams.toString()}`);
  };

  return (
    <div className="content max-w-[1098px] w-full mx-auto -mt-12 relative z-20 pt-6 bg-white rounded-lg shadow-md">
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
          <div className="flex items-center gap-8 mt-9">
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
    </div>
  );
}

export default FlightSearchForm;