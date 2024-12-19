import { useState, useEffect, useCallback } from "react";
import { searchFlights } from "@/services/flights.service";

const useSearchFlight = (params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchFlights = useCallback(async (newParams = params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchFlights(newParams);
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
  }, [params]);

  const refetch = useCallback(() => {
    fetchFlights(params); 
  }, [fetchFlights, params]);

  return { data, loading, error, success, refetch };
};

export { useSearchFlight };
