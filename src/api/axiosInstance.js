import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI || "https://ngeflyaja.shop",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
