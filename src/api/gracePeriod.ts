import axiosInstance from "../utils/axios";

export const listGracePeriodAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters?: any;
}) => {
  try {
    const { binType, deliveryLocation, customerName, startDate, endDate } = payload.selectedFilters;
    const { selectedFilters, ...rest } = payload;
    const response = await axiosInstance.get("/api/vendor/gracePeriodRequests", {
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

export const acceptRejectGracePeriod = async (payload: {
  id: string;
  status: "approved" | "rejected" | "";
  reason?: string;
}) => {
  try {
    const { id, status, reason } = payload;
    const response = await axiosInstance.post(`/api/vendor/gracePeriodRequests/${id}/change-status`, {
      status: status,
      reject_reason: reason,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const exportGracePeriodAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters?: any;
}) => {
  try {
    const { binType, deliveryLocation, customerName, startDate, endDate } = payload.selectedFilters;
    const { selectedFilters, ...rest } = payload;
    const response = await axiosInstance.get("/api/vendor/exports/gracePeriodRequests", {
      params: {
        page: rest.pageNumber,
        limit: rest.pageSize,
        search: rest.search,
        ...rest.sortConfig,
        filters: {
          binType: selectedFilters?.binType,
          deliveryLocation: selectedFilters?.deliveryLocation,
          customerName: selectedFilters?.customerName,
          startDate: selectedFilters?.startDate,
          endDate: selectedFilters?.endDate,
        },
      },
      responseType: "blob", 
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
