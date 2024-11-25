import Banner from "@/components/Banner";
import FeaturedDestionation from "@/components/FeaturedDestionation";
import SearchFeatured from "@/components/FeauterdSearch";
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
    </div>
  );
}
