import axiosInstance from "../utils/axios";

export const createUserAPI = async (payload: {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  profile_image: string;
  password: string;
  device_type: string;
  device_token: string;
}) => {
  try {
    const formData = new FormData();
    for (let i in payload) {
      formData.append(i, payload[i]);
    }
    const response = await axiosInstance.post("/api/admin/user/users/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const listUsersAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
}) => {
  try {
    const response = await axiosInstance.get("/api/admin/user/users", {
      params: { page: payload.pageNumber, limit: payload.pageSize, search: payload.search, ...payload.sortConfig },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getUserDetailsAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/user/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const toggleUserStatusAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/user/users/${id}/toggle`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteUserAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/user/users/${id}/delete`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
