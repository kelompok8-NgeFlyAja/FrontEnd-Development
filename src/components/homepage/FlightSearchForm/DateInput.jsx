import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";

const DateInput = ({ date, isReturnChecked, onSelectDate, onSwitchChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const modalRef = useRef(null);

  const toggleModal = (field) => {
    setActiveField(field);
    setIsModalOpen((prev) => !prev);
  };

  const getModalStyles = () => {
    if (!modalRef.current) return {};
    return {
      left: "50%",
      transform: "translateX(-50%)",
    };
  };

  return (
    <div className="relative">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-4 text-muted">
          <img src="/icons/date.svg" alt="Departure" />
          <Label>Date</Label>
        </div>
        <div className="flex flex-col w-[150px]">
          <label className="text-muted" htmlFor="departure">Departure</label>
          <Input
            id="departure"
            value={date.from ? format(date.from, "d MMMM yyyy") : ""}
            placeholder="Select date"
            onFocus={() => toggleModal("from")}
            className="border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
            readOnly
          />
        </div>
        <div className="flex flex-col w-[150px]">
          <label className="text-muted" htmlFor="return">Return</label>
          <Input
            id="return"
            value={isReturnChecked && date.to ? format(date.to, "d MMMM yyyy") : ""}
            placeholder="Pilih Tanggal"
            onFocus={() => isReturnChecked && toggleModal("to")}
            className="border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0 placeholder-violet-900 placeholder-accent"
            disabled={!isReturnChecked}
            readOnly
          />
        </div>
        <Switch checked={isReturnChecked} onCheckedChange={onSwitchChange} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div
            className="absolute bg-white px-4 shadow-lg rounded-lg w-[90vw] md:w-[600px] max-h-[400px] z-50"
            ref={modalRef}
            style={getModalStyles()}
          >
            <div className="mt-4">
              <Calendar
                initialFocus
                defaultMonth={date?.from}
                mode={"single"}
                numberOfMonths={2}
                selected={activeField === "from" ? date.from : date.to}
                onSelect={(selectedDate) => {
                  onSelectDate(selectedDate, activeField);
                  setIsModalOpen(false);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};


export default DateInput;
