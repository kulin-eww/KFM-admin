import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface searchProps {
    globalSearch: string
}

const initialState: searchProps = {
    globalSearch: ""
}

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setGlobalSearch: (state, action: PayloadAction<any>) => {
      state.globalSearch = action.payload;
    },
  },
});

export const { setGlobalSearch } = searchSlice.actions;
export default searchSlice.reducer;