import axiosInstance from "../utils/axios";

export const loginAPI = async (payload: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post("/api/admin/auth/login", {
      ...payload,
      device_type: "web",
      device_token: localStorage.getItem("fcmToken") ?? "",
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const forgotPasswordAPI = async (payload: { email: string }) => {
  try {
    const response = await axiosInstance.post("/api/admin/auth/forgot-password", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const resetPasswordAPI = async (payload: { token: string; newPassword: string; userType: string }) => {
  try {
    const { userType, ...data } = payload;
    console.log("Forgot Password API URL", `/api/${userType}/auth/reset-password`);
    const response = await axiosInstance.post(`/api/${userType}/auth/reset-password`, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const logoutAPI = async () => {
  try {
    // const response = await axiosInstance.get("/api/vendor/auth/logout");
    const response = { data: { message: "Logged out successfully" } };
    localStorage.clear();
    sessionStorage.clear();
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};