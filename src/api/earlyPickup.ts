import axiosInstance from "../utils/axios";

export const listEarlyPickupAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters?: any;
}) => {
  const { binType, deliveryLocation, customerName, startDate, endDate } = payload.selectedFilters;
  const { selectedFilters, ...rest } = payload;
  try {
    const response = await axiosInstance.get("/api/vendor/earlyPickupRequests", {
      params: { ...rest, filters: { binType, deliveryLocation, customerName, startDate, endDate } },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const acceptRejectEarlyPickupAPI = async (payload: {
  id: string;
  status: "approved" | "rejected";
  reject_reason?: string;
}) => {
  try {
    const response = await axiosInstance.post(`/api/vendor/earlyPickupRequests/${payload?.id}/change-status`, {
      status: payload?.status,
      reject_reason: payload?.reject_reason,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const exportEarlyPickupAPI = async (payload: {
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters?: any;
}) => {
  const { binType, deliveryLocation, customerName, startDate, endDate } = payload.selectedFilters;
  const { selectedFilters, ...rest } = payload;
  try {
    const response = await axiosInstance.get("/api/vendor/exports/earlyPickupRequests", {
      params: {
        search: payload.search,
        ...payload.sortConfig,
        filters: { binType, deliveryLocation, customerName, startDate, endDate },
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
