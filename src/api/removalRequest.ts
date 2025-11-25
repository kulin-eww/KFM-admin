import axiosInstance from "../utils/axios";

export const listRemovalRequestAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters?: any;
}) => {
  const { binType, deliveryLocation, customerName, startDate, endDate } = payload?.selectedFilters || {};
  try {
    const response = await axiosInstance.get("/api/vendor/removalRequests", {
      params: {
        page: payload.pageNumber,
        limit: payload.pageSize,
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

export const acceptRejectRemovalRequestAPI = async (payload: {
  id: string;
  status: "approved" | "rejected";
  reject_reason?: string;
}) => {
  try {
    const response = await axiosInstance.post(`/api/vendor/removalRequests/${payload?.id}/change-status`, {
      status: payload?.status,
      reject_reason: payload?.reject_reason,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const exportRemovalRequestAPI = async (payload: {
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters?: any;
}) => {
  try {
    const { binType, deliveryLocation, customerName, startDate, endDate } = payload.selectedFilters;
    const response = await axiosInstance.get("/api/vendor/exports/removalRequests", {
      params: {
        search: payload.search,
        ...payload.sortConfig,
        filters: { binType, deliveryLocation, customerName, startDate, endDate },
      },
      responseType: "blob"
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
