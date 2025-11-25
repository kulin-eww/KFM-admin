import axiosInstance from "../utils/axios";

export const contactUsAPI = async (payload: { name: string; email: string; phone: string; message: string }) => {
  try {
    const response = await axiosInstance.post("/api/vendor/contact-us", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
