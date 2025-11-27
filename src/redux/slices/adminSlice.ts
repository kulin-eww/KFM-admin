import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface adminState {
  adminDetails: {
    id: string;
    full_name: string;
    email: string;
  };
}

const initialState: adminState = {
  adminDetails: {
    id: "",
    full_name: "",
    email: "",
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setAdminDetails: (state, action: PayloadAction<any>) => {
      state.adminDetails = action.payload;
    },
  },
});

export const { setAdminDetails } = adminSlice.actions;
export default adminSlice.reducer;
