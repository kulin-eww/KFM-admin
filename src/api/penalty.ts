import axiosInstance from "../utils/axios";

export const listPenaltyPaymentsAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters: any;
}) => {
  try {
    const response = await axiosInstance.get("/api/vendor/penalties", {
      params: {
        page: payload.pageNumber,
        limit: payload.pageSize,
        search: payload.search,
        ...payload.sortConfig,
        filter: { startDate: payload.selectedFilters?.fromDate, endDate: payload.selectedFilters?.toDate },
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};
