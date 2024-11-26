import Banner from "@/components/Banner";
import FeauteredFlightCard from "@/components/FeauteredFlightCard";
import SearchFeatured from "@/components/FeautredSearch";
import FlightSearch from "@/components/FligthSearch";
import Navbar from "@/components/Navbar";
import React from "react";

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <Banner />
      <FlightSearch />
      <SearchFeatured />
      <FeauteredFlightCard />
    </div>
  );
}
