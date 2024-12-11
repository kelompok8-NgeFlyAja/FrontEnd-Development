import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LocationInput = ({ fromValue, toValue, onFromChange, onToChange, onSwitch }) => (
  <div className="flex items-center gap-8">
    <div className="flex items-center gap-4 w-[45%]">
      <img src="/icons/plane.svg" alt="From" />
      <Label htmlFor="from">From</Label>
      <Input
        id="from"
        value={fromValue}
        onChange={onFromChange}
        placeholder="Jakarta (JKTA)"
        className="border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
      />
    </div>
    <button type="button" onClick={onSwitch} className="text-gray-600">
      <img src="/icons/return.svg" alt="Switch" className="w-6 h-6" />
    </button>
    <div className="flex items-center gap-4 w-[45%]">
      <img src="/icons/plane.svg" alt="To" />
      <Label htmlFor="to">To</Label>
      <Input
        id="to"
        value={toValue}
        onChange={onToChange}
        placeholder="Melbourne (MLB)"
        className="border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
      />
    </div>
  </div>
);

export default LocationInput;
