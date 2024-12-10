import axiosInstance from "@/api/axiosInstance";

const getFavoriteDestinations = async (page = 1, limit = 5, filters = {}) => {
  try {
    const response = await axiosInstance.get("/favorite-destination", {
      params: {
        page: Number(page),
        limit: Number(limit),
        continent: filters.continent,
      },
    });

    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to fetch favorite destinations",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export { getFavoriteDestinations };
