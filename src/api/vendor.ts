import axiosInstance from "../utils/axios";

export const getVendorDetailsAPI = async () => {
  try {
    const response = await axiosInstance.get(`/api/vendor/profile-and-kyc`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateProfileAPI = async (payload: {
  company_name: string;
  tax_number: string;
  commercial_register_number: string;
  license_number: string;
  dumping_yards: string[];
}) => {
  try {
    const response = await axiosInstance.put("/api/vendor/profileUpdate", payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// RESTORE: original vendorKycAPI (POST)
export const vendorKycAPI = async (payload: any) => {
  try {
    const formData = new FormData();
    const { logo, license_certificate, business_images, ...data } = payload;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    if (logo) {
      formData.append("logo", logo);
    }

    if (license_certificate) {
      formData.append("license_certificate", license_certificate);
    }

    if (Array.isArray(business_images)) {
      business_images.forEach((file: File) => {
        formData.append("business_images", file);
      });
    }

    const response = await axiosInstance.post("/api/vendor/profile-and-kyc", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// NEW: PUT update for KYC (separate endpoint per user request)
export const updateVendorKycAPI = async (payload: any) => {
  try {
    const formData = new FormData();

    const { logo, license_certificate, business_images, ...data } = payload;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    if (logo !== undefined && logo !== null) {
      // Support both File and string URL
      if (logo instanceof File) {
        formData.append("logo", logo);
      } else if (typeof logo === "string") {
        formData.append("logo", logo);
      }
    }

    if (license_certificate !== undefined && license_certificate !== null) {
      if (license_certificate instanceof File) {
        formData.append("license_certificate", license_certificate);
      } else if (typeof license_certificate === "string") {
        formData.append("license_certificate", license_certificate);
      }
    }

    if (Array.isArray(business_images)) {
      business_images.forEach((item: File | string) => {
        const key = "business_images";
        if (item instanceof File) {
          formData.append(key, item);
        } else if (typeof item === "string") {
          formData.append(key, item);
        }
      });
    }

    const response = await axiosInstance.put("/api/vendor/profile-and-kyc", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const changeVendorPasswordAPI = async (payload: { oldPassword: string; newPassword: string }) => {
  try {
    const response = await axiosInstance.post("/api/vendor/change-password", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
