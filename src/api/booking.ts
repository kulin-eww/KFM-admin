import axiosInstance from "../utils/axios";

export const listBookingAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  tab: "active" | "upcoming" | "past" | "cancelled" | "new_booking" | "all";
  selectedFilters?: any;
}) => {
  try {
    const response = await axiosInstance.get("/api/vendor/bookings", {
      params: {
        page: payload.pageNumber,
        limit: payload.pageSize,
        search: payload.search,
        ...payload.sortConfig,
        tab: payload.tab,
        filter: {
          startDate: payload.selectedFilters?.fromDate,
          endDate: payload.selectedFilters?.toDate,
          type: payload.selectedFilters?.ongoing ? "ongoing" : payload.selectedFilters?.upcoming ? "upcoming" : null,
        },
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const exportBookingAPI = async (payload) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/exports/bookings`, {
      params: {
        search: payload.search,
        tab: payload.tab,
        filter: {
          startDate: payload.selectedFilters?.fromDate,
          endDate: payload.selectedFilters?.toDate,
          type: payload.selectedFilters?.ongoing
            ? "ongoing"
            : payload.selectedFilters?.upcoming
            ? "upcoming"
            : null,
        },
      },
      responseType: "blob",   // 🔥 KEY FIX
    });

    return response.data; // this is now the Excel file blob
  } catch (error) {
    throw error.response?.data;
  }
};


export const detailsBookingAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/bookings/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const availableBinsAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/availableVendorContainer`, {
      params: { booking_id: id },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const availableDriversAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/available-drivers`, {
      params: { booking_id: id },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const assignDriverAPI = async (payload: { id: string; assign: any }) => {
  try {
    const response = await axiosInstance.post(`/api/vendor/bookings/${payload.id}/assign-driver`, payload.assign);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateAssignDriverAPI = async (payload: { id: string; assign: any }) => {
  try {
    const response = await axiosInstance.post(
      `/api/vendor/bookings/${payload.id}/update-assign-driver`,
      payload.assign
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const acceptCancelBooking = async (payload: {
  bookingId: string;
  status: "accepted" | "rejected" | "cancelled" | "";
  reason: string;
}) => {
  const { bookingId, ...rest } = payload;
  try {
    const response = await axiosInstance.post(`/api/vendor/bookings/${bookingId}/change-status`, rest);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getDumpYardListAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/bookings/${id}/dumpYards`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const selectDumpYardAPI = async (payload: { id: string; dumpYardId: string }) => {
  try {
    const response = await axiosInstance.post(`/api/vendor/bookings/${payload.id}/add-dump-yard`, {
      dump_yard_id: payload.dumpYardId,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const paymentCollectedAPI = async (id: string) => {
  try {
    const response = await axiosInstance.post(`api/vendor/bookings/${id}/payment-collected`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const availableDriversForPickupAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/available-driversForPickup`, {
      params: { booking_id: id },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const availableBinsForPickupAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/availableVendorPickupContainer`, {
      params: { booking_id: id },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const assignDriverForPickupAPI = async (payload: { booking_id: number; assign: any }) => {
  try {
    const response = await axiosInstance.post(`/api/vendor/pickup/assign-driver`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
