import DateFilter from "@/components/search/DateFilter";
import Navbar from "@/components/Navbar";
import Sort from "@/components/search/Sort";
import ChangeResult from "@/components/search/ChangeResult";
import SoldOut from "@/components/search/SoldOut";
import Filter from "@/components/search/Filter";
import ResultNotFound from "@/components/search/ResultNotFound";
import FlightCard from "@/components/search/FlightCard";
import React from "react";

export default function Search() {
  return (
    <div>
      <Navbar />
      <ChangeResult />
      <DateFilter />
      <Sort />
      {/* <SoldOut /> */}

      {/* result notfound */}

      {/* <div className="flex">
        <div className="w-[500px] ">
          <Filter />
        </div>

        <div className="flex-1 mr-[200px] ">
          <ResultNotFound />
        </div>
      </div> */}

      {/* flightcard */}

      <div className="flex">
        {/* Komponen Filter dengan lebar tetap */}
        <div className="w-[460px]">
          <Filter />
        </div>

        {/* Komponen ResultNotFound di tengah */}
        <div>
          <FlightCard />
        </div>
      </div>
    </div>
  );
}
