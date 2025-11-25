import axiosInstance from "../utils/axios";

export const languageAPI = async (payload: { language: string }) => {
  try {
    const response = await axiosInstance.post("/api/vendor/update/language", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
