import axiosInstance from "../utils/axios";

export const listDumpYardAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/vendor/dumpYards");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};