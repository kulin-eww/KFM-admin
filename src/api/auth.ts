import axiosInstance from "../utils/axios";

export const loginAPI = async (payload: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post("/api/vendor/auth/login", {
      ...payload,
      device_type: "web",
      device_token: localStorage.getItem("fcmToken") ?? "",
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const signupAPI = async (payload: {
  company_name: string;
  email: string;
  tax_number: string;
  commercial_register_number: string;
  license_number: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/api/vendor/auth/register", {
      ...payload,
      device_type: "web",
      device_token: "asdfgh",
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const forgotPasswordAPI = async (payload: { email: string }) => {
  try {
    const response = await axiosInstance.post("/api/vendor/auth/forgot-password", payload);
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
    const response = await axiosInstance.get("/api/vendor/auth/logout");
    localStorage.clear();
    sessionStorage.clear();
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const verifyEmailAPI = async (payload: { token: string; email: string }) => {
  try {
    const response = await axiosInstance.get("/api/vendor/auth/verify-email", {
      params: { token: payload.token, email: payload.email },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
