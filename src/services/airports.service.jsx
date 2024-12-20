import axiosInstance from "@/api/axiosInstance";

const getAirports = async () => {
  try {
    const response = await axiosInstance.get("/get-airports");

    if (response.data.data) {
      return {
        success: true,
        data: response.data.data,
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to fetch airports",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export { getAirports };
