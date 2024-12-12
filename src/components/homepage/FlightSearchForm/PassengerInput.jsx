import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState, useRef } from "react";

function Passenger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const getModalStyles = () => {
    if (!modalRef.current) return {};
    const rect = modalRef.current.getBoundingClientRect();
    return {
      left: "50%",
      transform: "translateX(-50%)",
    };
  };

  return (
    <div className="ps-14 relative">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-4">
          <img src="/icons/seat.svg" alt="Departure" />
          <Label htmlFor="passengers">To</Label>
        </div>
        <div className="flex flex-col w-[150px]">
          <label htmlFor="passengers">Passengers</label>
          <Input
            id="passengers"
            placeholder="Select Passengers"
            onFocus={toggleModal}
            className="border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
            readOnly
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleModal}
          ></div>

          <div
            className="absolute bg-white px-4 py-4 shadow-lg rounded-lg w-[90vw] md:w-[600px] max-h-[300px] z-50"
            ref={modalRef}
            style={getModalStyles()}
          >
            <div className="relative flex items-center justify-center p-4">
              <p className="text-gray-600">Passenger Modal</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Passenger;
