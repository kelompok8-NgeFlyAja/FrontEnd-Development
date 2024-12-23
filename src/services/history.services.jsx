import axiosInstance from "@/api/axiosInstance";
import Cookies from "universal-cookie";


const getTransactionHistory = async () => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");
    console.log("token: " + token);
    if (!token) {
      return {
        success: false,
        message: "Authentication token is missing",
      };
    }

    const response = await axiosInstance.get("/transaction-history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.data) {
      return {
        success: true,
        data: response.data.data,
      };
    }

    return {
      success: false,
      message: response.data.message || "Failed to fetch transaction history",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export { getTransactionHistory };
