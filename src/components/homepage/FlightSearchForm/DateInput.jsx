import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Switch } from "@radix-ui/react-switch";

const DateInput = ({
  date,
  isOpenPopover,
  isReturnChecked,
  onTogglePopover,
  onSelectDate,
  onSwitchChange,
}) => (
  <div className="flex gap-4">
    <div className="flex items-center gap-4">
      <img src="/icons/date.svg" alt="Departure" />
      <Label>Date</Label>
    </div>
    <div className="flex flex-col">
      <label htmlFor="Departure">Departure</label>
      <Popover open={isOpenPopover}>
        <PopoverTrigger>
          <Input
            id="departure"
            value={date.from ? format(date.from, "d MMMM yyyy") : ""}
            onClick={onTogglePopover}
            placeholder="Select date"
            className="w-[150px] border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" side="bottom" align="start">
          <Calendar
            initialFocus
            defaultMonth={date?.from}
            mode={isReturnChecked ? "range" : "single"}
            selected={date?.from}
            onSelect={onSelectDate}
            numberOfMonths={isReturnChecked ? 2 : 1}
          />
        </PopoverContent>
      </Popover>
    </div>
    <div>
      <label htmlFor="Return">Return</label>
      <Input
        id="return"
        value={isReturnChecked && date?.to ? format(date?.to, "d MMMM yyyy") : ""}
        placeholder="Select date"
        className="w-[150px] border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
        disabled={!isReturnChecked}
        readOnly
      />
    </div>
    <Switch checked={isReturnChecked} onCheckedChange={onSwitchChange} />
  </div>
);

export default DateInput;
