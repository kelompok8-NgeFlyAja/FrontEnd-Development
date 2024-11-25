import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";

function FlightSearchForm() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [sliderChecked, setSliderChecked] = useState(false);
  const [passengerCounts, setPassengerCounts] = useState(1);
  const [seatClass, setSeatClass] = useState("Economy");

  const handleSwitchCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSliderChange = () => setSliderChecked(!sliderChecked);

  return (
    <div className="content max-w-[1098px] w-full mx-auto -mt-12 relative z-20 pt-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 px-8">
        Pilih Jadwal Penerbangan spesial di
        <span className="text-purple-600 bg-white px-2 py-1 rounded">
          {" "}
          Tiketku
        </span>
      </h2>

      <form className="grid grid-cols-1 gap-8 px-8">
        {/* From Section */}
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-4">
            <img src="/icons/plane.svg" alt="From" />
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Jakarta (JKTA)"
              className="w-[200px]"
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
          <div className="flex items-center gap-4">
            <img src="/icons/plane.svg" alt="To" />
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="Melbourne (MLB)"
              className="w-[200px]"
            />
          </div>
        </div>

        {/* Date Section */}
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-4">
            <img src="/icons/date.svg" alt="Departure" />
            <Label htmlFor="departure">Departure</Label>
            <Popover>
              <PopoverTrigger>
                <Input
                  id="departure"
                  value={departureDate ? format(departureDate, "PPP") : ""}
                  placeholder="Select date"
                  className="w-[150px]"
                />
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  selected={departureDate}
                  onSelect={setDepartureDate}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          <div className="flex items-center gap-4">
            <Label htmlFor="return">Return</Label>
            <Switch
              checked={sliderChecked}
              onCheckedChange={handleSliderChange}
              className="mr-4"
            />
            <Popover>
              <PopoverTrigger>
                <Input
                  id="return"
                  value={returnDate ? format(returnDate, "PPP") : ""}
                  placeholder="Select date"
                  disabled={!sliderChecked}
                  className="w-[150px]"
                />
              </PopoverTrigger>
              <PopoverContent>
                <Calendar selected={returnDate} onSelect={setReturnDate} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Passengers and Seat Class */}
        <div className="flex items-center gap-8">
          <div>
            <Label htmlFor="passengers">Passengers</Label>
            <Input
              id="passengers"
              type="number"
              min={1}
              value={passengerCounts}
              onChange={(e) => setPassengerCounts(parseInt(e.target.value))}
              className="w-[100px]"
            />
          </div>
          <div>
            <Label htmlFor="seat-class">Seat Class</Label>
            <select
              id="seat-class"
              value={seatClass}
              onChange={(e) => setSeatClass(e.target.value)}
              className="w-[150px] border border-gray-300 rounded px-2 py-2"
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <Button type="submit" className="bg-[#7126B5] text-white w-full py-3">
          Cari Penerbangan
        </Button>
      </form>
    </div>
  );
}

export default FlightSearchForm;
