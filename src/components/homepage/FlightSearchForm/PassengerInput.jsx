import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

function PassengerInput() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [childrens, setChildrens] = useState(0);
  const [infants, setInfants] = useState(0);
  const modalRef = useRef(null);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (setter, e, min = 0) => {
    const value = Math.max(min, parseInt(e.target.value, 10) || 0);
    setter(value);
  };

  const increment = (setter, value, max = Infinity) => {
    if (value < max) setter(value + 1);
  };

  const decrement = (setter, value, min = 0) => {
    if (value > min) setter(value - 1);
  };

  const totalPassengers = adults + childrens + infants;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="ps-14 relative">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-4">
          <img src="/icons/seat.svg" alt="Passengers" />
          <Label htmlFor="to">To</Label>
        </div>
        <div className="flex flex-col w-[150px]">
          <label htmlFor="passengers">Passengers</label>
          <Input
            id="passengers"
            placeholder="Select Passengers"
            value={`${totalPassengers} Passenger${totalPassengers > 1 ? "s" : ""}`}
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
            onClick={closeModal}
          ></div>

          <div
            className="absolute bg-white px-4 py-4 shadow-lg rounded-lg w-[70vw] md:w-[400px] max-h-[300px] z-50"
            onClick={handleModalClick} // Prevent modal close on interaction inside the modal
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Select Passengers</h2>
              <button onClick={closeModal} className="text-gray-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <strong>Adults</strong>
                  <p className="text-sm text-gray-500">(12 years and older)</p>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-2 py-1 border rounded"
                    onClick={() => decrement(setAdults, adults, 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={adults}
                    onChange={(e) => handleInputChange(setAdults, e, 1)}
                    className="w-12 text-center mx-2 border rounded"
                  />
                  <button
                    type="button"
                    className="px-2 py-1 border rounded"
                    onClick={() => increment(setAdults, adults)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <strong>Children</strong>
                  <p className="text-sm text-gray-500">(2 - 11 years)</p>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-2 py-1 border rounded"
                    onClick={() => decrement(setChildrens, childrens)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={childrens}
                    onChange={(e) => handleInputChange(setChildrens, e)}
                    className="w-12 text-center mx-2 border rounded"
                  />
                  <button
                    type="button"
                    className="px-2 py-1 border rounded"
                    onClick={() => increment(setChildrens, childrens)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between">
                <div>
                  <strong>Infants</strong>
                  <p className="text-sm text-gray-500">(Under 2 years)</p>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-2 py-1 border rounded"
                    onClick={() => decrement(setInfants, infants)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={infants}
                    onChange={(e) => handleInputChange(setInfants, e)}
                    className="w-12 text-center mx-2 border rounded"
                  />
                  <button
                    type="button"
                    className="px-2 py-1 border rounded"
                    onClick={() => increment(setInfants, infants)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-purple-700 text-white rounded"
                onClick={closeModal}
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PassengerInput;
