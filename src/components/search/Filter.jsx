import { useState } from "react";

function Filter() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedTransit, setSelectedTransit] = useState({
    langsung: false,
    satuTransit: false,
    duaTransit: false,
  });
  const [facilities, setFacilities] = useState({
    baggage: false,
    cabinBaggage: false,
    inFlightEntertainment: false,
  });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [baggageRange, setBaggageRange] = useState({ min: "", max: "" });
  const [cabinBaggageRange, setCabinBaggageRange] = useState({
    min: "",
    max: "",
  });

  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  return (
    <div className="max-w-sm ml-[185px]">
      <div className="max-w-sm bg-white rounded-lg py-6 px-4 shadow-md border">
        {/* Header Filter */}
        <h2 className="font-bold mb-4">Filter</h2>

        {/* Filter Transit */}
        <div className="border-b pb-3 mb-3">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFilter("transit")}
          >
            <div className="flex items-center gap-3">
              <img src="/icons/fi_box.svg" alt="Transit" />
              <span className="text-gray-700">Transit</span>
            </div>
            <img
              src="icons/fi_chevron-right.svg"
              alt="right"
              className={`transition-transform ${
                activeFilter === "transit" ? "rotate-90" : ""
              }`}
            />
          </div>
          {activeFilter === "transit" && (
            <div className="mt-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="langsung"
                    checked={selectedTransit.langsung}
                    onChange={(e) =>
                      setSelectedTransit({
                        ...selectedTransit,
                        langsung: e.target.checked,
                      })
                    }
                    className="peer bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                  <label htmlFor="langsung" className="text-gray-700">
                    Langsung
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="satuTransit"
                    checked={selectedTransit.satuTransit}
                    onChange={(e) =>
                      setSelectedTransit({
                        ...selectedTransit,
                        satuTransit: e.target.checked,
                      })
                    }
                    className="peer bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                  <label htmlFor="satuTransit" className="text-gray-700">
                    1 Transit
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="duaTransit"
                    checked={selectedTransit.duaTransit}
                    onChange={(e) =>
                      setSelectedTransit({
                        ...selectedTransit,
                        duaTransit: e.target.checked,
                      })
                    }
                    className="peer bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                  <label htmlFor="duaTransit" className="text-gray-700">
                    2+ Transit
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Fasilitas */}
        <div className="border-b pb-3 mb-3">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFilter("facilities")}
          >
            <div className="flex items-center gap-3">
              <img src="/icons/fi_heart.svg" alt="Fasilitas" />
              <span className="text-gray-700">Fasilitas</span>
            </div>
            <img
              src="icons/fi_chevron-right.svg"
              alt="right"
              className={`transition-transform ${
                activeFilter === "facilities" ? "rotate-90" : ""
              }`}
            />
          </div>
          {activeFilter === "facilities" && (
            <div className="mt-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="baggage"
                    checked={facilities.baggage}
                    onChange={(e) =>
                      setFacilities({
                        ...facilities,
                        baggage: e.target.checked,
                      })
                    }
                    className="peer bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                  <label htmlFor="baggage" className="text-gray-700">
                    Baggage
                  </label>
                  {/* Input Min/Max untuk Baggage */}
                  <div className="mt-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={baggageRange.min}
                      onChange={(e) =>
                        setBaggageRange({
                          ...baggageRange,
                          min: e.target.value,
                        })
                      }
                      disabled={!facilities.baggage} // Disabled jika Baggage tidak dicentang
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={baggageRange.max}
                      onChange={(e) =>
                        setBaggageRange({
                          ...baggageRange,
                          max: e.target.value,
                        })
                      }
                      disabled={!facilities.baggage} // Disabled jika Baggage tidak dicentang
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="cabinBaggage"
                    checked={facilities.cabinBaggage}
                    onChange={(e) =>
                      setFacilities({
                        ...facilities,
                        cabinBaggage: e.target.checked,
                      })
                    }
                    className="peer bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                  <label htmlFor="cabinBaggage" className="text-gray-700">
                    Cabin Baggage
                  </label>
                  {/* Input Min/Max untuk Cabin Baggage */}
                  <div className="mt-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={cabinBaggageRange.min}
                      onChange={(e) =>
                        setCabinBaggageRange({
                          ...cabinBaggageRange,
                          min: e.target.value,
                        })
                      }
                      disabled={!facilities.cabinBaggage} // Disabled jika Cabin Baggage tidak dicentang
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={cabinBaggageRange.max}
                      onChange={(e) =>
                        setCabinBaggageRange({
                          ...cabinBaggageRange,
                          max: e.target.value,
                        })
                      }
                      disabled={!facilities.cabinBaggage} // Disabled jika Cabin Baggage tidak dicentang
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inFlightEntertainment"
                    checked={facilities.inFlightEntertainment}
                    onChange={(e) =>
                      setFacilities({
                        ...facilities,
                        inFlightEntertainment: e.target.checked,
                      })
                    }
                    className="peer bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="inFlightEntertainment"
                    className="text-gray-700"
                  >
                    In Flight Entertainment
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Harga */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFilter("price")}
          >
            <div className="flex items-center gap-3">
              <img src="/icons/fi_dollar-sign.svg" alt="Harga" />
              <span className="text-gray-700">Harga</span>
            </div>
            <img
              src="icons/fi_chevron-right.svg"
              alt="right"
              className={`transition-transform ${
                activeFilter === "price" ? "rotate-90" : ""
              }`}
            />
          </div>
          {activeFilter === "price" && (
            <div className="mt-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
