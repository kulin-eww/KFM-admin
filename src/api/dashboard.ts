import axiosInstance from "../utils/axios";

export const getDashboardDetailsAPI = async () => {
  try {
    const response = await axiosInstance.get(`/api/vendor/dashboard`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getDashboardDetailsChartsAPI = async ({ year }: { year: string }) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/dashboard/chartBookingData`, { params: { year } });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getNotificationsListAPI = async (payload: { page?: number; limit?: number; filter: string }) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/notifications`, { params: { filter: payload?.filter } });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
