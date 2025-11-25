import axiosInstance from "../utils/axios";

export const listBookingRenewalAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters?: any;
}) => {
  try {
    const { binType, deliveryLocation, customerName, startDate, endDate } = payload.selectedFilters;
    const { selectedFilters, ...rest } = payload;
    const response = await axiosInstance.get("/api/vendor/bookingRenewalRequests", {
      params: {
        page: rest.pageNumber,
        limit: rest.pageSize,
        search: rest.search,
        ...rest.sortConfig,
        filters: { binType, deliveryLocation, customerName, startDate, endDate },
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const acceptRejectBookingRenewal = async (payload: {
  id: string;
  status: "approved" | "rejected" | "";
  reason?: string;
}) => {
  const { id, status, reason } = payload;
  try {
    const response = await axiosInstance.post(`/api/vendor/bookingRenewalRequests/${id}/change-status`, {
      status: status,
      reject_reason: reason,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const exportBookingRenewalAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters?: any;
}) => {
  try {
    const { binType, deliveryLocation, customerName, startDate, endDate } = payload.selectedFilters;
    const { selectedFilters, ...rest } = payload;
    const response = await axiosInstance.get("/api/vendor/exports/bookingRenewalRequests", {
      params: {
        page: rest.pageNumber,
        limit: rest.pageSize,
        search: rest.search,
        ...rest.sortConfig,
        filters: { binType, deliveryLocation, customerName, startDate, endDate },
      },
      responseType: "blob", 
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
