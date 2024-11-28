import DateFilter from "@/components/DateFilter";
import Navbar from "@/components/Navbar";
import Sort from "@/components/Sort";
import ChangeResult from "@/components/ChangeResult";
import SoldOut from "@/components/SoldOut";
import Filter from "@/components/Filter";
import ResultNotFound from "@/components/ResultNotFound";
import FlightCard from "@/components/FlightCard";
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
