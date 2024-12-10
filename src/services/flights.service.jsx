import axiosInstance from "../api/axiosInstance";

const getFavoriteDestinations = async (params = { page: 1, limit: 5, continent: "Asia" }) => {
  console.log("stage pertama koma lima")
    try {
      const response = await axiosInstance.get("/favorite-destination", { params });
      console.log(response.data)
      return response.data; // Assuming the API returns data in the `data` field
    } catch (error) {
      console.error("Failed to fetch favorite destinations:", error);
      console.log(error)
      throw error;
    }
  };

export {getFavoriteDestinations};
