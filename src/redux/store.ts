import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import uiReducer from "./slices/uiSlice";
import searchReducer from "./slices/searchSlice"

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    ui: uiReducer,
    globalSearch: searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
