import { getFavoriteDestinations } from "@/services/flights.service";
import { useState, useEffect } from "react";


const useFavoriteDestinations = (params) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("stage pertama")
  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const result = await getFavoriteDestinations(params);
        setData(result.data || []);
        console.log(result.data)
      } catch (err) {
        setError(err);
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [params]);

  return { data, loading, error };
};

export {useFavoriteDestinations};
