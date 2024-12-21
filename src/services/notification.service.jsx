import axiosInstance from "@/api/axiosInstance";

const getNotifications = async () => {
  try {
    const response = await axiosInstance.get("/notifications");
    console.log(response);

    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
        total: response.data.total,
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to get notifications",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

const updateNotifications = async (notificationId) => {
  try {
    const response = await axiosInstance.put(`/notifications/${notificationId}`);
    console.log(response);

    if (response.data.status) {
      return {
        success: true,
        data: response.data.data,
        total: response.data.total,
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to put notifications",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export { getNotifications, updateNotifications };
