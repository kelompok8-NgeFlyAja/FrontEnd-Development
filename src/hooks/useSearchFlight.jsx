import { useState, useEffect } from "react";
import { searchFlights } from "@/services/flights.service";

const useSearchFlight = (params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await searchFlights(params);
        if (result.success) {
          setData(result.data || []);
          setSuccess(true);
        } else {
          setError(result.message || "Failed to fetch flights");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(params).length > 0) {
      fetchFlights();
    }
  }, [params]);

  return { data, loading, error, success };
};

export { useSearchFlight };
