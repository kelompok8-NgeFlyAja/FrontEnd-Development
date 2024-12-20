import { getFavoriteDestinations } from "@/services/flights.service";
import { useState, useEffect } from "react";

const useFavoriteDestinations = (page = 1, limit = 5, filters = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      setError(null); 
      try {
        const result = await getFavoriteDestinations(page, limit, filters);
        if (result.success) {
          setData(result.data || []);
          setSuccess(true);
          setTotal(result.total);
        } else {
          setError(result.message || "Failed to fetch destinations");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [page, limit, filters]);

  return { data, total, loading, error, success };
};

export { useFavoriteDestinations };
