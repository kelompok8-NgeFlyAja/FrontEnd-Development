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
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-4">
        <img src="/icons/date.svg" alt="Departure" />
        <Label>Date</Label>
      </div>
      <div className="flex flex-col">
        <label htmlFor="departure">Departure</label>
        <Popover open={isOpenPopover} onOpenChange={onTogglePopover}>
          <PopoverTrigger asChild>
            <Input
              id="departure"
              value={date?.from ? format(date.from, "d MMMM yyyy") : ""}
              placeholder="Select date"
              className="w-[150px] border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
              readOnly
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" side="bottom" align="start">
            <Calendar
              initialFocus
              defaultMonth={date?.from || new Date()}
              mode={isReturnChecked ? "range" : "single"}
              selected={isReturnChecked ? date : date?.from}
              onSelect={onSelectDate}
              numberOfMonths={2}
              pagedNavigation={isReturnChecked} // Ensures correct pagination
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <label htmlFor="return">Return</label>
        <Input
          id="return"
          value={
            isReturnChecked && date?.to ? format(date?.to, "d MMMM yyyy") : ""
          }
          placeholder="Select date"
          className="w-[150px] border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
          disabled={!isReturnChecked}
          readOnly
        />
      </div>
      <Switch
        checked={isReturnChecked}
        onCheckedChange={(checked) => {
          onSwitchChange(checked);
          if (!checked) {
            // Reset return date when switching off
            onSelectDate({ from: date?.from, to: undefined });
          }
        }}
      />
    </div>
  );
};

export default DateInput;
