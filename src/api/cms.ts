import axiosInstance from "../utils/axios";

export const cmsAPI = async () => {
  try {
    const response = await axiosInstance.get(`/api/vendor/appLinks`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

interface updateCMSPayload {
  id: string;
  show_name: {
    ar: string;
    en: string;
  };
  value: {
    ar: string;
    en: string;
  };
}

export const getCMSAPI = async () => {
  try {
    const response = await axiosInstance.get(`/api/admin/app-links`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getCMSDetailAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/app-links/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateCMSDetailAPI = async (payload: updateCMSPayload) => {
  const { id, ...rest } = payload;
  try {
    const response = await axiosInstance.post(`/api/admin/app-links/${id}/update`, rest);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
