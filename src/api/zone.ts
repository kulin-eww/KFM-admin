import axiosInstance from "../utils/axios";

export const listZoneAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  // selectedFilters: any;
}) => {
  try {
    const response = await axiosInstance.get("/api/vendor/zones", {
      params: {
        page: payload.pageNumber,
        limit: payload.pageSize,
        search: payload.search,
        ...payload.sortConfig,
        // ...payload?.selectedFilters,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createZoneAPI = async (payload: { zone_name: string; radius: any }) => {
  try {
    const response = await axiosInstance.post("/api/vendor/create-zone", {
      ...payload,
      radius: JSON.stringify(payload.radius),
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const updateZoneAPI = async (payload: { id: string; zone_name: string; radius: any }) => {
  try {
    const response = await axiosInstance.put(`/api/vendor/update-zone/${payload.id}`, {
      zone_name: payload.zone_name,
      radius: JSON.stringify(payload.radius),
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const toggleZoneStatusAPI = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/api/vendor/toggle-zone-status/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const viewZoneAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/get-zone/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteZoneAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/vendor/delete-zone/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
