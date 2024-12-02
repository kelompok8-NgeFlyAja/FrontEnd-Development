import Banner from "@/components/Banner";
import FeauteredFlightCard from "@/components/homepage/FeauteredFlightCard";
import SearchFeatured from "@/components/homepage/FeautredSearch";
import FlightSearchForm from "@/components/homepage/FligthSearch";

import Navbar from "@/components/Navbar";
import React from "react";

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
