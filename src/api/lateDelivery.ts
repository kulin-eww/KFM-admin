import axiosInstance from "../utils/axios";

export const listLateDeliveryAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters: any;
}) => {
  try {
    const response = await axiosInstance.get("/api/vendor/driver-late-deliveries", {
      params: {
        pageSize: payload?.pageSize,
        pageNumber: payload?.pageNumber,
        search: payload?.search,
        sortBy: payload?.sortConfig?.sortBy,
        sortOrder: payload?.sortConfig?.sortOrder,
        from_date: payload?.selectedFilters?.fromDate,
        to_date: payload?.selectedFilters?.toDate,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
