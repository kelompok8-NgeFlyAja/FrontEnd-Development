import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetchAirports from "@/hooks/useFetchAirports";

const LocationInput = ({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  onSwitch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const fromInputRef = useRef(null); // Restored this line
  const [airportsData, setAirportsData] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { airports, loading: isLoading, error: fetchError } = useFetchAirports();

  useEffect(() => {
    setLoading(isLoading);
    if (fetchError) {
      setError(fetchError);
    } else if (airports) {
      setAirportsData(airports);
      setFilteredAirports(airports);
    }
  }, [airports, isLoading, fetchError]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredAirports(
      airportsData.filter((airport) =>
        `${airport.name} ${airport.city} ${airport.country} ${airport.airportCode}`
          .toLowerCase()
          .includes(query)
      )
    );
  };

  const toggleModal = (field) => {
    setActiveField(field);
    setIsModalOpen((prev) => !prev);
  };

  const getModalStyles = () => {
    if (!fromInputRef.current) return {};
    const rect = fromInputRef.current.getBoundingClientRect();
    return {
      left: "50%",
      transform: "translateX(-50%)",
    };
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 w-[45%]">
          <img src="/icons/plane.svg" alt="From" />
          <Label htmlFor="from">From</Label>
          <Input
            ref={fromInputRef}
            id="from"
            value={fromValue}
            onChange={onFromChange}
            placeholder="Jakarta (JKTA)"
            onFocus={() => toggleModal("from")}
            className="border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
            autoComplete="off"
          />
        </div>
        <button type="button" onClick={onSwitch} className="text-gray-600">
          <img src="/icons/return.svg" alt="Switch" className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4 w-[45%]">
          <img src="/icons/plane.svg" alt="To" />
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            value={toValue}
            onChange={onToChange}
            placeholder="Melbourne (MLB)"
            onFocus={() => toggleModal("to")}
            className="border-x-0 border-t-0 rounded-none focus-visible:ring-0 px-0"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div
            className="absolute bg-white px-4 py-4 shadow-lg rounded-lg w-[90vw] md:w-[600px] max-h-[300px] z-50"
            style={getModalStyles()}
          >
            <div className="relative flex items-center gap-2">
              <input
                className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-700"
                type="text"
                placeholder="Search Airport"
                value={searchQuery}
                onChange={handleSearch}
              />
              <img
                src="/icons/magnifying_glass.svg"
                alt="Search"
                className="absolute left-3 h-5 w-5 text-gray-600"
              />
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                <img
                  src="/icons/x.svg"
                  alt="Close"
                  className="h-6 w-6 cursor-pointer"
                />
              </button>
            </div>
              <div className="mt-4 max-h-52 overflow-auto">
              {loading ? (
              <p>Loading airports...</p>
                ) : error ? (
                <p>Error: {error}</p>
                ) : (
                filteredAirports.map((airport) => (
                  <div
                    key={airport.id}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      const formattedValue = `${airport.name} (${airport.airportCode})`;
                      if (activeField === "from") {
                        onFromChange(formattedValue);
                      } else if (activeField === "to") {
                        onToChange(formattedValue);
                      }
                      setIsModalOpen(false);
                    }}
                  >
                    <div>
                      <p>{airport.name}</p>
                      <p className="text-sm text-gray-500">
                        {airport.city}, {airport.country}
                      </p>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {airport.airportCode}
                    </span>
                  </div>
                ))
            )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationInput;
