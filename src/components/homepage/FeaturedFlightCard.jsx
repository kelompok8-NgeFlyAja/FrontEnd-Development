import { useMemo, useState } from "react";
import { useFavoriteDestinations } from "@/hooks/useFetchFavoriteFlight";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";

function FeaturedFlightCard() {
  const continents = ["Semua", "Asia", "Amerika", "Australia", "Eropa", "Afrika"];
  const [selected, setSelected] = useState("Semua");

  const params = useMemo(() => {
    const baseParams = { page: 1, limit: 10 };
    if (selected !== "Semua") {
      baseParams.continent = selected;
    }
    return baseParams;
  }, [selected]);
  const { data: destinations, loading, error } = useFavoriteDestinations(params);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;
  
  return (
    <>
      <div
      className="content max-w-[1098px] w-full mx-auto relative pt-6 bg-none rounded-lg mt-[36px]"
      style={{ zIndex: 1 }}
    >
      <div className="text-base font-bold leading-6 mb-4">
        Destinasi Favorit
      </div>
      <div className="flex gap-4 flex-wrap justify-start">
        {continents.map((category) => (
          <Button
            key={category}
            variant={selected === category ? "default" : "outline"}
            className={`flex gap-2 items-center px-6 py-4 rounded-xl ${
              selected === category
                ? "bg-[#7126B5] text-white"
                : "bg-[#E2D4F0] text-[#3C3C3C]"
            }`}
            onClick={() => setSelected(category)}
          >
            <img src="icons/search.svg" alt="" />
            {category}
          </Button>
        ))}
      </div>
      </div>
      <div className="content max-w-[1098px] w-full mx-auto relative pt-6 bg-none rounded-lg mt-3 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {destinations.map((dest, index) => (
            <Card
              key={index}
              className="max-w-[200px] max-h-[212px] shadow-md rounded-lg relative transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              <span className="absolute top-0 right-0 bg-[#A06ECE] text-white text-[8px] font-bold px-2 py-1 rounded-l-lg rounded-tr-lg z-10">
                {dest.label}
              </span>
              <CardHeader className="p-0">
                <div className="w-full h-[108px] overflow-hidden rounded-t-lg">
                  <img src={dest.imageUrl} alt={dest.arrival} className="w-full h-full object-cover" />
                </div>
              </CardHeader>
              <CardContent className="px-3 py-2">
                <p className="text-[#3C3C3C] font-medium text-[10px] leading-[14px]">
                  {`${dest.departure} → ${dest.arrival}`}
                </p>
                <p className="text-[#3C3C3C] text-[9px] mt-1">{`${dest.startDate} - ${dest.endDate}`}</p>
                <p className="text-[#3C3C3C] text-[8px]">
                  Mulai dari{" "}
                  <span className="text-[#FF0000] font-bold text-[10px] leading-[14px]">
                    IDR {dest.price.toLocaleString()}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default FeaturedFlightCard;
