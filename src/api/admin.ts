import axiosInstance from "../utils/axios";

export const getAdminDetailsAPI = async () => {
  try {
    const response = await axiosInstance.get(`/api/admin/auth/get-profile`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateProfileAPI = async (payload: {
  company_name: string;
  tax_number: string;
  commercial_register_number: string;
  license_number: string;
  dumping_yards: string[];
}) => {
  try {
    const response = await axiosInstance.put("/api/admin/auth/profileUpdate", payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const changeAdminPasswordAPI = async (payload: { oldPassword: string; newPassword: string }) => {
  try {
    const response = await axiosInstance.post("/api/admin/auth/change-password", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
