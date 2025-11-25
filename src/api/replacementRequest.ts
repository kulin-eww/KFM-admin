import axiosInstance from "../utils/axios";

export const listReplacementRequestAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters?: any;
}) => {
  try {
    const response = await axiosInstance.get("/api/vendor/replaceRequests", {
      params: {
        page: payload.pageNumber,
        limit: payload.pageSize,
        search: payload.search,
        ...payload.sortConfig,
        startDate: payload.selectedFilters?.fromDate,
        endDate: payload.selectedFilters?.toDate,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const acceptRejectReplacementRequestAPI = async (payload: {
  id: string;
  status: "approved" | "rejected" | "cancelled" | "";
  reason?: string;
}) => {
  const { id, status, reason } = payload;
  try {
    const response = await axiosInstance.post(`/api/vendor/replaceRequests/${id}/change-status`, {
      status: status,
      reject_reason: reason,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const detailsReplacementRequestAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/replaceRequests/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const availableBinsForReplacementAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/availableVendorContainerForReplacement`, {
      params: { booking_id: id },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const availableDriversForReplacementAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/available-driversForReplacement`, {
      params: { booking_id: id },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const assignDriverForReplacementAPI = async (payload: { booking_id: number; assign: any }) => {
  try {
    const response = await axiosInstance.post(`/api/vendor/replaceRequest/assign-driver`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const exportReplacementRequestAPI = async (payload: {
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters?: any;
}) => {
  try {
    const response = await axiosInstance.get("/api/vendor/exports/replaceRequests", {
      params: {
        search: payload.search,
        ...payload.sortConfig,
        startDate: payload.selectedFilters?.fromDate,
        endDate: payload.selectedFilters?.toDate,
      },
      responseType: "blob"
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
