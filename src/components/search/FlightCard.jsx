import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FlightCard(props) {
  const { time, duration, price, departure, arrival, baggage, cabin, entertainment, date, departureCode, arrivalCode, index, isOpen, toggleOpen } = props;
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg shadow-lg p-4 mb-4 ml-6">
      <div className="flex justify-between mb-2">
        <div className="flex justify-between">
          <img src="icons/Image.svg" alt="image" />
          <p className="ml-2">Jet Air - Economy</p>
        </div>
        <div>
          <img src="icons/Suffix.svg" alt="" className="cursor-pointer" onClick={() => toggleOpen(index)} />
        </div>
      </div>
      <div className="flex items-center pl-7">
        <div>
          <h3 className="font-bold">{time.departure}</h3>
          {departureCode}
        </div>
        <div className="text-center ml-7">
          <p className="text-gray-500 text-sm">{duration}</p>
          <img src="icons/Arrow.svg" alt="arrow" />
          <p className="text-gray-500 text-sm">Direct</p>
        </div>
        <div className="ml-3">
          <h3 className="font-bold">{time.arrival}</h3>
          {arrivalCode}
        </div>
        <div className="ml-6">
          <img src="icons/baggage.svg" alt="" />
        </div>
        <div className="text-right">
          <h1 className="font-bold text-[#4B1979] text-md ml-[90px]">{price}</h1>
          <button className="bg-purple-700 text-white py-2 px-10 rounded-2xl hover:bg-purple-600 mt-2" onClick={() => navigate("/checkout")}>
            Pilih
          </button>
        </div>
      </div>
      {isOpen && (
        <>
          <div className="px-2">
            <div className="flex items-center border-t mt-5">
              <h3 className="font-bold text-[#4B1979] mt-3">Detail Penerbangan</h3>
            </div>
            <div className="flex items-center justify-between relative">
              <div>
                <h3 className="mt-2 font-bold text-lg">{time.departure}</h3>
                {date} <br />
                {departure}
              </div>
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <p className="font-bold text-sm text-[#A06ECE]">Keberangkatan</p>
              </div>
            </div>
          </div>

          <div className="px-2">
            <div className="flex items-center border-t mt-2">
              <div className="flex items-center">
                <img src="icons/Image.svg" alt="" />
              </div>
              <div className="mt-2 ml-3">
                <h3 className="font-bold text-md ">Jet Air - Economy</h3>
                <h3 className="font-bold text-md">JT - 203</h3>
                <h3 className="font-bold text-md mt-5">Informasi:</h3>
                <p>Baggage {baggage} kg</p>
                <p>Cabin Baggage {cabin} kg</p>
                <p>{entertainment}</p>
              </div>
            </div>
          </div>

          <div className="px-2">
            <div className="flex items-center justify-between relative border-t mt-5 mb-7">
              <div>
                <h3 className="mt-2 font-bold text-lg">{time.arrival}</h3>
                {date} <br />
                {arrival}
              </div>
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <p className="font-bold text-sm text-[#A06ECE]">Kedatangan</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function FlightList() {
  const [openIndex, setOpenIndex] = useState(null);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const loadFlights = () => {
    if (loading) return; // Prevent loading multiple times
    setLoading(true);

    // Simulate an API call for loading flights
    setTimeout(() => {
      const newFlights = [
        {
          time: { departure: "07:00", arrival: "11:00" },
          duration: "4h 0m",
          price: "IDR 4.950.000",
          departure: "Soekarno Hatta - Terminal 1A Domestik",
          departureCode: "JKT",
          arrival: "Melbourne International Airport",
          arrivalCode: "MLB",
          baggage: 20,
          cabin: 7,
          entertainment: "In Flight Entertainment",
          date: "01 Maret 2023",
        },
        {
          time: { departure: "08:00", arrival: "12:00" },
          duration: "4h 0m",
          price: "IDR 5.950.000",
          departure: "Soekarno Hatta - Terminal 1A Domestik",
          departureCode: "JKT",
          arrival: "Melbourne International Airport",
          arrivalCode: "MLB",
          baggage: 20,
          cabin: 7,
          entertainment: "In Flight Entertainment",
          date: "02 Maret 2023",
        },
        {
          time: { departure: "13:15", arrival: "17:15" },
          duration: "4h 0m",
          price: "IDR 7.225.000",
          departure: "Soekarno Hatta - Terminal 1A Domestik",
          departureCode: "JKT",
          arrival: "Melbourne International Airport",
          arrivalCode: "MLB",
          baggage: 20,
          cabin: 7,
          entertainment: "In Flight Entertainment",
          date: "03 Maret 2023",
        },
        {
          time: { departure: "20:15", arrival: "23:30" },
          duration: "3h 15m",
          price: "IDR 8.010.000",
          departure: "Soekarno Hatta - Terminal 1A Domestik",
          departureCode: "JKT",
          arrival: "Melbourne International Airport",
          arrivalCode: "MLB",
          baggage: 20,
          cabin: 7,
          entertainment: "In Flight Entertainment",
          date: "04 Maret 2023",
        },
      ];

      setFlights((prevFlights) => [...prevFlights, ...newFlights]);

      // Simulate no more data after 10 flights
      if (flights.length + newFlights.length > 10) {
        setHasMore(false);
      }

      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadFlights();
  }, []);

  const toggleOpen = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the accordion if the same flight is clicked
    } else {
      setOpenIndex(index); // Open the clicked flight card
    }
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && hasMore) {
      loadFlights();
    }
  };

  return (
    <div className="max-w-3xl mx-auto overflow-auto" onScroll={handleScroll} style={{ maxHeight: "80vh" }}>
      {flights.map((flight, index) => (
        <FlightCard key={index} index={index} isOpen={openIndex === index} toggleOpen={toggleOpen} {...flight} />
      ))}
      {loading && <div className="text-center mt-4">Loading...</div>}
      {!hasMore && <div className="text-center mt-4">No more flights</div>}
    </div>
  );
}

export default FlightList;
