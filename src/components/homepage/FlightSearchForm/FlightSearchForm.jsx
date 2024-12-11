import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DateInput from "./DateInput";
import LocationInput from "./LocationInput";

function FlightSearchForm() {
  const navigate = useNavigate();
  const [date, setDate] = useState({ from: new Date(), to: new Date() });
  const [isOpenPopoverDate, setIsOpenPopoverDate] = useState(false);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [isReturnChecked, setIsReturnChecked] = useState(false);

  const handleSwitchCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSelectDate = (selectedDate) => {
    setDate({ from: selectedDate, to: selectedDate });
    setIsOpenPopoverDate(!isOpenPopoverDate);
  };

  const onFromChange = (e) => {
    setFromCity(e); 
  };

  const onToChange = (e) => {
    setToCity(e); 
  };

  return (
    <div className="content max-w-[1098px] w-full mx-auto -mt-12 relative z-20 pt-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 px-8">
        Pilih Jadwal Penerbangan spesial di
        <span className="text-purple-600 bg-white px-2 py-1 rounded"> Tiketku</span>
      </h2>
      <form className="grid grid-cols-1 gap-8">
        <div className="px-8">
          <LocationInput
            fromValue={fromCity}
            toValue={toCity}
            onFromChange={onFromChange}
            onToChange={onToChange}    
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
          </div>
        </div>
        <Button
          type="button" 
          onClick={() => navigate("/search")}
          className="bg-[#7126B5] text-white w-full py-3 rounded-b-md rounded-t-none"
        >
          Cari Penerbangan
        </Button>
      </form>
    </div>
  );
}

export default FlightSearchForm;
