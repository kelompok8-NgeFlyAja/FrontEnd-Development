import { useState, useEffect, useCallback } from "react";
import { searchFlights } from "@/services/flights.service";

const useSearchFlight = (params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Define the fetchFlights function to handle fetching
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

  // Provide a refetch function that can be manually triggered
  const refetch = useCallback(() => {
    fetchFlights(params); // Re-fetch with the current params
  }, [fetchFlights, params]);

  return { data, loading, error, success, refetch };
};

export { useSearchFlight };
