import axiosInstance from "../utils/axios";

export const listContainerAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
}) => {
  try {
    const response = await axiosInstance.get("/api/vendor/containers", {
      params: { page: payload.pageNumber, limit: payload.pageSize, search: payload.search, ...payload.sortConfig },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createContainerAPI = async (payload: {
  wasteTypeId: string;
  binSizeId: string;
  stock: string;
  basePrice: string;
  pickupFee: string;
  deliveryFee: string;
  vendorContainer: any[];
}) => {
  try {
    const response = await axiosInstance.post(`/api/vendor/containers`, {
      ...payload,
      basePrice: parseFloat(payload.basePrice),
      pickupFee: parseFloat(payload.pickupFee),
      deliveryFee: parseFloat(payload.deliveryFee),
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const editContainerAPI = async (payload: {
  id: string;
  wasteTypeId: string;
  binSizeId: string;
  stock: string;
  basePrice: string;
  pickupFee: string;
  deliveryFee: string;
  vendorContainer: any[];
}) => {
  try {
    const { id, ...data } = payload;
    const response = await axiosInstance.put(`/api/vendor/containers/${id}`, {
      ...data,
      basePrice: parseFloat(data.basePrice),
      pickupFee: parseFloat(data.pickupFee),
      deliveryFee: parseFloat(data.deliveryFee),
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const viewContainerAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/containers/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const toggleContainerStatusAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/containers/toggle/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteContainerAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/vendor/containers/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const wasteTypeSelectListAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/vendor/wasteType");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const binSizeSelectListAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/vendor/binSize");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getGlobalPricingAPI = async (payload: { wasteTypeId: string; binSizeId: string; zoneId: string }) => {
  try {
    const response = await axiosInstance.get("/api/vendor/container/globalPricing", {
      params: { wasteTypeId: payload?.wasteTypeId, binSizeId: payload?.binSizeId, zoneId: payload?.zoneId },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getZoneOptionsListAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/vendor/zone-list");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
