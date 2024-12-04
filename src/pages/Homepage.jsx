import Banner from "@/components/Banner";
import FeauteredFlightCard from "@/components/homepage/FeauteredFlightCard";
import SearchFeatured from "@/components/homepage/FeautredSearch";
import FlightSearchForm from "@/components/homepage/FligthSearch";

import Navbar from "@/components/Navbar";

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <Banner />
      <FlightSearchForm />
      <SearchFeatured />
      <FeauteredFlightCard />
    </div>
  );
}
