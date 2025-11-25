import axiosInstance from "../utils/axios";

export const listEarningAPI = async ({
  pageSize,
  pageNumber,
  search,
  sortConfig,
  selectedFilters,
}: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: any;
  selectedFilters: any;
}) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/earnings`, {
      params: {
        pageSize,
        pageNumber,
        search,
        sortBy: sortConfig?.sortBy,
        sortOrder: sortConfig?.sortOrder,
        startDate: selectedFilters?.fromDate,
        endDate: selectedFilters?.toDate,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
