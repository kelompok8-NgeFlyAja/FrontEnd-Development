import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function PassengerInput({ onPassengerChange }) {
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

  useEffect(() => {
    onPassengerChange({ adults, childrens, infants });
  }, [adults, childrens, infants, onPassengerChange]);

  return (
    <div className="ps-14 relative">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-4 text-muted">
          <img src="/icons/seat.svg" alt="Passengers" />
          <Label htmlFor="to">To</Label>
        </div>
        <div className="flex flex-col w-[150px]">
          <label className="text-muted" htmlFor="passengers">Passengers</label>
          <Input
            id="passengers"
            placeholder="Select Passengers"
            value={`${totalPassengers} Penumpang`}
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
            onClick={handleModalClick}
          >
            <div className="flex justify-end">
              <button onClick={closeModal} className="text-gray-600">
              <img
                  src="/icons/x.svg"
                  alt="Close"
                  className="h-6 w-6 cursor-pointer"
                />
              </button>
            </div>

            <div className="space-y-4">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div className="flex row-auto" >
                    <img
                    src="/icons/adult.svg"
                    alt="Close"
                    className="mr-2"
                    />
                    <div>
                        <strong>Dewasa</strong>
                        <p className="text-sm text-gray-500">(12 tahun keatas)</p>
                    </div>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-2 py-1 border border-violet-700 rounded"
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
                    className="px-2 py-1 border border-violet-700 rounded"
                    onClick={() => increment(setAdults, adults)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div className="flex row-auto" >
                    <img
                    src="/icons/children.svg"
                    alt="Close"
                    className="mr-2"
                    />
                    <div>
                    <strong>Anak</strong>
                    <p className="text-sm text-gray-500">(2 - 11 tahun)</p>
                    </div>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-2 py-1 border border-violet-700 rounded"
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
                    className="px-2 py-1 border border-violet-700 rounded"
                    onClick={() => increment(setChildrens, childrens)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between">
                <div className="flex row-auto" >
                    <img
                    src="/icons/baby.svg"
                    alt="Close"
                    className="mr-2"
                    />
                    <div>
                    <strong>Bayi</strong>
                    <p className="text-sm text-gray-500">(Dibawah 2 tahun)</p>
                    </div>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-2 py-1 border border-violet-700 rounded"
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
                    className="px-2 py-1 border border-violet-700 rounded"
                    onClick={() => increment(setInfants, infants)}
                  >
                    +
                  </button>
                </div>
              </div>
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

export default PassengerInput;
