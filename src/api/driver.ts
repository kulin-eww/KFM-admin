import axiosInstance from "../utils/axios";

export const listDriverAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters: any;
}) => {
  try {
    const response = await axiosInstance.get("/api/vendor/drivers", {
      params: {
        page: payload.pageNumber,
        limit: payload.pageSize,
        search: payload.search,
        ...payload.sortConfig,
        ...payload?.selectedFilters,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createDriverAPI = async (payload: {
  name: string;
  phone: string;
  email: string;
  dob: string;
  address: string;
  license_number: string;
  license_expiry_date: string;
  profile_image: File;
  driving_license_front: File;
}) => {
  try {
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("phone", payload.phone);
    formData.append("email", payload.email);
    formData.append("dob", payload.dob);
    formData.append("address", payload.address);
    formData.append("license_number", payload.license_number);
    formData.append("license_expiry_date", payload.license_expiry_date);

    if (payload.profile_image) {
      formData.append("profile_image", payload.profile_image);
    }
    if (payload.driving_license_front) {
      formData.append("driving_license_front", payload.driving_license_front);
    }

    const response = await axiosInstance.post("/api/vendor/drivers", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const updateDriverAPI = async (payload: {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  address: string;
  license_number: string;
  license_expiry_date: string;
  profile_image: any;
  driving_license_front: any;
}) => {
  try {
    const formData = new FormData();

    // Always include base fields
    formData.append("name", payload.name);
    formData.append("phone", payload.phone);
    formData.append("email", payload.email);
    formData.append("dob", payload.dob);
    formData.append("address", payload.address);
    formData.append("license_number", payload.license_number);
    formData.append("license_expiry_date", payload.license_expiry_date);

    // Only append files if they’re actually Files (i.e., changed)
    if (payload.profile_image instanceof File) {
      formData.append("profile_image", payload.profile_image);
    }

    if (payload.driving_license_front instanceof File) {
      formData.append("driving_license_front", payload.driving_license_front);
    }

    const response = await axiosInstance.put(`/api/vendor/drivers/${payload.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const toggleDriverStatusAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/drivers/toggle/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const viewDriverAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/drivers/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteDriverAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/vendor/drivers/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const sendOtpAPI = async (payload: { phone: string }) => {
  try {
    const response = await axiosInstance.post(`/api/vendor/otp/sendDriver`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const verifyOtpAPI = async (payload: { phone: string; otp: string }) => {
  try {
    const response = await axiosInstance.post(`/api/vendor/otp/verifyOtpDriver`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const uploadFileDriverAPI = async (payload: { file_type: string; is_private: string; file: any }) => {
  try {
    const formData = new FormData();
    for (let i in payload) {
      formData.append(i, payload[i]);
    }
    const response = await axiosInstance.post("/api/driver/upload-file", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const listDriverBookingAPI = async (payload: {
  id: string;
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters: any;
  type: string;
}) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/drivers/${payload?.id}/driverBookings`, {
      params: {
        page: payload.pageNumber,
        limit: payload.pageSize,
        search: payload.search,
        type: payload?.type,
        ...payload.sortConfig,
        filter: {
          startDate: payload.selectedFilters?.fromDate,
          endDate: payload.selectedFilters?.toDate,
          type: payload?.selectedFilters?.ongoing ? "ongoing" : payload?.selectedFilters?.upcoming ? "upcoming" : null,
        },
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const exportDriverBookingAPI = async (payload: {
  id: string;
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
  selectedFilters: any;
  type: string;
}) => {
  try {
    const response = await axiosInstance.get(`/api/vendor/drivers/${payload?.id}/exportDriverBookings`, {
      params: {
        page: payload.pageNumber,
        limit: payload.pageSize,
        search: payload.search,
        type: payload?.type,
        ...payload.sortConfig,
        filter: { startDate: payload.selectedFilters?.fromDate, endDate: payload.selectedFilters?.toDate },
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
