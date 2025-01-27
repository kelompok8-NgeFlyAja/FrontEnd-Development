import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({ 
  className, 
  classNames, 
  showOutsideDays = true, 
  numberOfMonths = 2,
  ...props 
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <DayPicker
      selected={selectedDate}
      onDayClick={handleDateSelect}
      showOutsideDays={showOutsideDays}
      numberOfMonths={numberOfMonths} 
      pagedNavigation={numberOfMonths > 1}
      className={cn("p-3", className)}
      classNames={{
        months: "grid grid-cols-2 gap-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex flex-row justify-between items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0"
        ),
        nav_button_previous: "absolute -left-2 md:left-1",
        nav_button_next: "absolute md:right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-violet-900 text-white hover:bg-violet-900 hover:text-white focus:bg-violet-900 focus:text-white",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <img src="/icons/left_arrow.svg" className="h-4 w-4" />,
        IconRight: ({ ...props }) => <img src="/icons/right_arrow.svg" className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
