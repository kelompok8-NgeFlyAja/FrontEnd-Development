import { getNotifications, updateNotifications } from "@/services/notification.service";
import { useState, useEffect } from "react";

const useNotifications = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getNotifications();
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

    fetchNotifications();
  }, []);

  return { data, total, loading, error, success };
};

const useUpdateNotifications = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [total, setTotal] = useState(0);

  const triggerUpdateNotifications = async (notificationId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateNotifications(notificationId);
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

  useEffect(() => {
    const triggerUpdateNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await updateNotifications(notificationId);
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

    triggerUpdateNotifications();
  }, []);

  return { triggerUpdateNotifications, data, total, loading, error, success };
};

export { useNotifications, useUpdateNotifications };
