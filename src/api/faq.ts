import axiosInstance from "../utils/axios";

export const faqListAPI = async () => {
  try {
    const response = await axiosInstance.get(`/api/vendor/faq`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};