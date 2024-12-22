import Banner from "@/components/Banner";
import FeaturedFlightCard from "@/components/homepage/FeaturedFlightCard";
import FlightSearchForm from "@/components/homepage/FlightSearchForm/FlightSearchForm";
import { useState } from "react";

export default function Homepage() {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleFlightSelection = (flightData) => {
    setSelectedFlight(flightData);
  };
  
  return (
    <div>
      <Banner />
      <FlightSearchForm selectedFlight={selectedFlight} />
      <FeaturedFlightCard onFlightSelect={handleFlightSelection} />
    </div>
  );
}
