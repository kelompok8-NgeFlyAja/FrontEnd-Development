import { getAirports } from "@/services/airports.service";
import { useState, useEffect } from "react";

const useFetchAirports = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirports = async () => {
      setLoading(true);
      const response = await getAirports();

      if (response.success) {
        setAirports(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchAirports();
  }, []);

  return { airports, loading, error };
};

export default useFetchAirports;
