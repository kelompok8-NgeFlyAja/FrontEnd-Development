import { Input } from "@/components/ui/input";
import React, { useState, useRef } from "react";

function SeatClassInput() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Economy"); // Default value
  const modalRef = useRef(null);

  const SeatClasses = ["Economy", "Premium Economy", "Business", "First Class"];

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const closeModal = () => setIsModalOpen(false);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleClassSelect = (seatClass) => {
    setSelectedClass(seatClass);
    closeModal(); // Close modal after selection
  };

  return (
    <div className="relative">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col w-[150px]">
          <label className="text-muted" htmlFor="seat-class">Seat Class</label>
          <Input
            id="seat-class"
            placeholder="Select Seat Class"
            value={selectedClass}
            onFocus={toggleModal}
            className="border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
            readOnly
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          ></div>

          {/* Modal */}
          <div
            className="absolute bg-white px-4 py-4 shadow-lg rounded-lg w-[70vw] md:w-[400px] max-h-[400px] z-50"
            onClick={handleModalClick}
          >
            <div className="flex justify-end">
              <button onClick={closeModal} className="text-gray-600">
                <img
                  src="/icons/x.svg"
                  alt="Close"
                  className="h-6 w-6 mb-3 cursor-pointer"
                />
              </button>
            </div>
            <div className="relative flex flex-col gap-2">
              {SeatClasses.map((seatClass) => (
                <div
                  key={seatClass}
                  className={`px-4 py-2 cursor-pointer flex justify-between items-center ${
                    selectedClass === seatClass
                      ? "bg-[#4B1979] text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleClassSelect(seatClass)}
                >
                  <span>{seatClass}</span>
                  {selectedClass === seatClass && (
                    <img
                      src="/Checkout_Saved.svg"
                      alt="Checkmark"
                      className="w-6 h-6"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-10 py-3 bg-violet-900 text-white rounded-lg"
                onClick={closeModal}
              >
                Simpan
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SeatClassInput;
