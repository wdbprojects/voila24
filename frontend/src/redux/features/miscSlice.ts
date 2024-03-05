import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  currentTheme: "dark",
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setThemeRedux: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setTerm, setThemeRedux } = searchSlice.actions;
