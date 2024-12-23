import { getTransactionHistory } from "@/services/history.services";
import { useState, useEffect } from "react";

const useFetchTransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      setLoading(true);
      const response = await getTransactionHistory();

      if (response.success) {
        setTransactionHistory(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchTransactionHistory();
  }, []);

  return { transactionHistory, loading, error };
};

export default useFetchTransactionHistory;
