import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: object | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
} as UserState;

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setIsAuthenticated, setLoading } = userSlice.actions;
