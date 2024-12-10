import { useState } from "react";
import axios from "axios";

const useSend = () => {
  const [loading, setLoading] = useState(false);

  const sendData = async (
    url,
    method,
    body = null,
    token = null,
    json = false,
    formData = false
  ) => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    let data = null,
      message = null,
      statusCode = null;

    try {
      setLoading(true);

      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      if (json) {
        headers["Content-Type"] = "application/json";
      }

      if (formData) {
        headers["Content-Type"] = "multipart/form-data";
      }

      const response = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data: body,
        headers,
      });

      data = response.data;
      statusCode = response.status;
      message = response.data.message;
    } catch (err) {
      statusCode = err.response.status || 500;
      message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
    } finally {
      setLoading(false);
    }

    return { data, message, statusCode };
  };

  return { loading, sendData };
};

export default useSend;
