import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { addDays, format, startOfTomorrow } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { airports } from "@/lib/airport";

function FlightSearch() {
  const navigate = useNavigate();
  const [date, setDate] = React.useState({
    from: new Date(),
    to: startOfTomorrow(),
  });
  const [isOpenPopoverDate, setIsOpenPopoverDate] = React.useState(false);

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [isReturnChecked, setIsReturnChecked] = useState(false);
  const [passengerCounts, setPassengerCounts] = useState(1);
  const [seatClass, setSeatClass] = useState("Economy");

  const handleSwitchCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSliderChange = () => setIsReturnChecked(!isReturnChecked);

  const handleSelectDate = (selectedDate) => {
    console.log("selectedDate", selectedDate);
    setDate({ ...date, from: selectedDate, to: selectedDate });
    setIsOpenPopoverDate(!isOpenPopoverDate);
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
          {/* From Section */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 w-[45%]">
              <img src="/icons/plane.svg" alt="From" />
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="Jakarta (JKTA)"
                className="border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
              />
            </div>

            {/* Switch Button */}
            <button
              type="button"
              onClick={handleSwitchCities}
              className="text-gray-600"
            >
              <img src="/icons/return.svg" alt="Switch" className="w-6 h-6" />
            </button>

            {/* To Section */}
            <div className="flex items-center gap-4 w-[45%]">
              <img src="/icons/plane.svg" alt="To" />
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="Melbourne (MLB)"
                className="border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 mt-9">
            <div className="flex items-center gap-4 w-[45%]">
              <div className="flex gap-4">
                <div className="flex items-center gap-4">
                  <img src="/icons/date.svg" alt="Departure" />
                  <Label htmlFor="from">Date</Label>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Departure">Departure</label>
                  <Popover open={isOpenPopoverDate}>
                    <PopoverTrigger>
                      <Input
                        id="departure"
                        value={
                          date.from
                            ? format(date.from, "d MMMM yyyy")
                            : "" && date.to
                            ? format(date.to, "d MMMM yyyy")
                            : " "
                        }
                        onClick={() => setIsOpenPopoverDate(!isOpenPopoverDate)}
                        placeholder="Select date"
                        className="w-[150px] border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      side="bottom"
                      align="start"
                    >
                      <Calendar
                        initialFocus
                        defaultMonth={date?.from}
                        mode={isReturnChecked ? "range" : "single"}
                        selected={date?.from}
                        onSelect={handleSelectDate}
                        numberOfMonths={isReturnChecked ? 2 : 1}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label htmlFor="Return">Return</label>
                  <Input
                    id="return"
                    value={
                      isReturnChecked && date?.to
                        ? format(date?.to, "d MMMM yyyy")
                        : ""
                    }
                    placeholder="Select date"
                    className="w-[150px] border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
                    disabled={!isReturnChecked}
                    readOnly
                  />
                </div>
                <Switch
                  checked={isReturnChecked}
                  onCheckedChange={handleSliderChange}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-[45%]"></div>
          </div>
          {/* Search Button */}
        </div>
        <Button
          type="submit"
          onClick={() => navigate("/search")}
          className="bg-[#7126B5] text-white w-full py-3 rounded-b-md rounded-t-none"
        >
          Cari Penerbangan
        </Button>
      </form>
    </div>
  );
}

export default FlightSearch;
