import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DateInput = ({ date, isReturnChecked, onSelectDate, onSwitchChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [calendarMonths, setCalendarMonths] = useState(2);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCalendarMonths(1);
      } else {
        setCalendarMonths(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const updateModalPosition = () => {
      if (modalRef.current) {
        modalRef.current.style.left = "50%";
        modalRef.current.style.transform = "translateX(-50%)";
      }
    };

    if (isModalOpen) {
      updateModalPosition();
    }

    window.addEventListener("resize", updateModalPosition);
    return () => window.removeEventListener("resize", updateModalPosition);
  }, [isModalOpen]);

  const toggleModal = (field) => {
    setActiveField(field);
    setIsModalOpen((prev) => !prev);
  };

  const getModalStyles = () => {
    if (!modalRef.current) return {};
    const modalWidth = modalRef.current.offsetWidth;
    return {
      left: "50%",
      transform: `translateX(-50%)`,
      width: modalWidth > window.innerWidth ? "90vw" : "auto",
    };
  };

  const handleReturnDateChange = (selectedDate) => {
    if (selectedDate && date.from && selectedDate < date.from) {
      toast.error("Tanggal kembali tidak boleh sebelum tanggal berangkat!");
    } else {
      onSelectDate(selectedDate, activeField);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex justify-between">
          <div className="flex flex-row items-center gap-4 text-muted">
            <img src="/icons/date.svg" alt="Departure" />
            <Label>Date</Label>
          </div>
          <div className="flex flex-row items-center gap-4 text-muted md:hidden">
            <Label>Return?</Label>
            <Switch checked={isReturnChecked} onCheckedChange={onSwitchChange} />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[150px]">
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
        <div className="flex flex-col w-full md:w-[150px]">
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
        <div className="hidden md:flex md:justify-center md:mt-0">
          <Switch checked={isReturnChecked} onCheckedChange={onSwitchChange} />
        </div>
      </div>

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
                numberOfMonths={calendarMonths}
                selected={activeField === "from" ? date.from : date.to}
                onSelect={(selectedDate) => {
                  if (activeField === "to") {
                    handleReturnDateChange(selectedDate);
                  } else {
                    onSelectDate(selectedDate, activeField);
                    setIsModalOpen(false);
                  }
                }}
              />
            </div>
          </div>
        </>
      )}

      <ToastContainer 
        className="toast-position"
        position="top-right"
      />
    </div>
  );
};

export default DateInput;
