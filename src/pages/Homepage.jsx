import Banner from "@/components/Banner";
import FeaturedFlightCard from "@/components/homepage/FeaturedFlightCard";
import FlightSearchForm from "@/components/homepage/FlightSearchForm/FlightSearchForm";

export default function Homepage() {
  
  return (
    <div>
      <Banner />
      <FlightSearchForm />
      <FeaturedFlightCard />
    </div>
  );
}
