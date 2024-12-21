import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFavoriteDestinations } from "@/hooks/useFetchFavoriteFlight";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import Loading from "@/components/search/Loading";
import ResultNotFound from "../search/ResultNotFound";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function FeaturedFlightCard() {
  const continents = ["Semua", "Asia", "Amerika", "Australia", "Eropa", "Afrika"];
  const [selected, setSelected] = useState("Semua");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filters = useMemo(() => {
    return selected !== "Semua" ? { continent: selected } : {};
  }, [selected]);

  const { data, total, loading: isLoading, error: fetchError } = useFavoriteDestinations(page, limit, filters);

  useEffect(() => {
    setLoading(isLoading);
    if (fetchError) {
      setError(fetchError);
    } else if (data) {
      setDestinations(data);
    }
  }, [data, isLoading, fetchError]);

  const totalPages = Math.ceil(total / limit);

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, x: -75 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.25 }}
        viewport={{ once: true }}
        className="content md:max-w-[1098px] md:w-full mx-4 md:mx-auto relative pt-2 md:pt-6 bg-none rounded-lg mt-[36px]"
        style={{ zIndex: 1 }}
      >
        <div className="text-base font-bold max-w-[200px] mb-4">Destinasi Favorit</div>
        <div className="flex w-full gap-4 overflow-x-auto overflow-y-hidden mx-auto scrollbar-hide">
          {continents.map((category) => (
            <Button
              key={category}
              variant={selected === category ? "default" : "outline"}
              className={`flex gap-2 items-center px-6 py-4 rounded-xl whitespace-nowrap ${
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
      </motion.div>

      {/* Destination Cards */}
      <div className="content max-w-[1098px] w-full md:mx-auto relative pt-6 bg-none rounded-lg mt-3 mb-10">
        {loading && <Loading />}
        {error && (
          <p className="text-gray-500 text-center">Error mengambil data...</p>
        )}
        {!loading && !error && (
          destinations.length === 0 ? (
            <div className="mt-4">
              <ResultNotFound />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

              {/* Pagination */}
              <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 mt-4">
                <Button
                  onClick={goToPreviousPage}
                  disabled={page === 1}
                  variant="outline"
                  className="flex items-center justify-center px-2 py-2 rounded-md border-violet-700 text-xs sm:text-sm"
                >
                <IoIosArrowBack size={16} className="fill-violet-700" />
                </Button>

                <span className="text-xs sm:text-sm text-violet-700 text-center">
                  Page {page} of {totalPages}
                </span>

                <Button
                  onClick={goToNextPage}
                  disabled={page === totalPages}
                  variant="outline"
                  className="flex items-center justify-center px-2 py-2 rounded-md border-violet-700 sm:w-auto text-xs sm:text-sm"
                >
                  <IoIosArrowForward size={16} className="fill-violet-700" />
                </Button>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
}

export default FeaturedFlightCard;