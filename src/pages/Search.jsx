import DateFilter from "@/components/DateFilter";
import Navbar from "@/components/Navbar";
import Sort from "@/components/Sort";
import React from "react";

export default function Search() {
  return (
    <div>
      <Navbar />
      <DateFilter />
      <Sort />
    </div>
  );
}
