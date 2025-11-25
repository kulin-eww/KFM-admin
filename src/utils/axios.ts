import axios from "axios";
import useToast from "../hooks/useToast";
// import i18n from "../i18n";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.key = "Eww$779277123";
    const authToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    const locale = localStorage.getItem("i18nextLng") || "en";
    config.headers.Accept = "application/json";
    config.headers["Accept-Language"] = locale;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    if (error.code === "ERR_NETWORK") {
      useToast(error.message, "error");
    }
    throw error;
  }
);

export default axiosInstance;
