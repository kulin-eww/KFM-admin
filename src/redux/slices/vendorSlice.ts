import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface vendorState {
  vendorDetails: {
    id: string;
    company_name: string;
    email: string;
    commercial_register_number: string;
    tax_number: string;
    license_number: string;
    kyc: any;
    device_token: string;
    device_type: string;
    is_kyc: boolean;
    status: boolean;
    created_at: string;
    dumpYards: any[];
    open_time: string,
    close_time: string
  };
  vendorBookingRequestTimeout: any;
  isVendorDetailsFetched: boolean;
}

const initialState: vendorState = {
  vendorDetails: {
    id: "",
    company_name: "",
    email: "",
    commercial_register_number: "",
    tax_number: "",
    license_number: "",
    kyc: "",
    device_token: "",
    device_type: "",
    is_kyc: false,
    status: false,
    created_at: "",
    dumpYards: [],
    open_time: "",
    close_time: ""
  },
  vendorBookingRequestTimeout: {
    grace_period_booking_request: "60",
    replacement_booking_request: "60",
    removal_booking_request: "60",
    renewal_booking_request: "60",
    early_booking_request: "60",
    new_booking_request: "60",
  },
  isVendorDetailsFetched: false,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState: initialState,
  reducers: {
    setVendorDetails: (state, action: PayloadAction<any>) => {
      state.vendorDetails = action.payload;
    },
    setIsVendorDetailsFetched: (state, action: PayloadAction<boolean>) => {
      state.isVendorDetailsFetched = action.payload;
    },
    setVendorBookingRequestTimeout: (state, action: PayloadAction<any>) => {
      state.vendorBookingRequestTimeout = action.payload;
    },
  },
});

export const { setVendorDetails, setIsVendorDetailsFetched, setVendorBookingRequestTimeout } = vendorSlice.actions;
export default vendorSlice.reducer;
