import axiosInstance from "../utils/axios";

export const exportReportAPI = async (payload: { search: string; selectedFilters: any; report_type: string }) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/exports/reports`, {
      params: {
        search: payload.search,
        report_type: payload.report_type,
        filter: {
          startDate: payload.selectedFilters?.fromDate,
          endDate: payload.selectedFilters?.toDate,
          // type: payload.selectedFilters?.ongoing ? "ongoing" : payload.selectedFilters?.upcoming ? "upcoming" : null,
        },
      },
      responseType:"blob"
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
