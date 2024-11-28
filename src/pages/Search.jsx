import DateFilter from "@/components/DateFilter";
import Navbar from "@/components/Navbar";
import Sort from "@/components/Sort";
import ChangeResult from "@/components/ChangeResult";
import SoldOut from "@/components/SoldOut";
import Filter from "@/components/Filter";
import ResultNotFound from "@/components/ResultNotFound";
import React from "react";

export default function Search() {
  return (
    <div>
      <Navbar />
      <ChangeResult />
      <DateFilter />
      <Sort />
      {/* <SoldOut /> */}

      <div className="flex">
        {/* Komponen Filter dengan lebar tetap */}
        <div className="w-[500px] ">
          <Filter />
        </div>

        {/* Komponen ResultNotFound di tengah */}
        <div className="flex-1 mr-[300px]">
          <ResultNotFound />
        </div>
      </div>
    </div>
  );
}
