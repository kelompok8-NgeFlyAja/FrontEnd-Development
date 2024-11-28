import DateFilter from "@/components/DateFilter";
import Navbar from "@/components/Navbar";
import Sort from "@/components/Sort";
import ChangeResult from "@/components/ChangeResult";
import SoldOut from "@/components/SoldOut";
import Filter from "@/components/Filter";
import React from "react";

export default function Search() {
  return (
    <div>
      <Navbar />
      <ChangeResult />
      <DateFilter />
      <Sort />
      {/* <SoldOut /> */}
      <Filter />
    </div>
  );
}
