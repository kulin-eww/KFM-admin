import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./slices/vendorSlice";
import uiReducer from "./slices/uiSlice";
import searchReducer from "./slices/searchSlice"

export const store = configureStore({
  reducer: {
    user: vendorReducer,
    ui: uiReducer,
    globalSearch: searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
