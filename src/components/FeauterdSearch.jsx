import React from "react";
import { Button } from "@/components/ui/button";

function FeaturedSearch() {
  const categories = [
    "Semua",
    "Asia",
    "Amerika",
    "Australia",
    "Eropa",
    "Afrika",
  ];
  const [selected, setSelected] = React.useState("Semua");

  return (
    <div className="content max-w-[1098px] w-full mx-auto -mt-12 relative pt-6 bg-none rounded-lg">
      <div className="flex gap-4 flex-wrap justify-start">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selected === category ? "default" : "outline"}
            className={`flex gap-2 items-center px-6 py-4 rounded-xl ${
              selected === category
                ? "bg-[#7126B5] text-white"
                : "text-[#3C3C3C]"
            }`}
            onClick={() => setSelected(category)}
          >
            <img src="icons/search.svg" alt="" />
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default FeaturedSearch;
