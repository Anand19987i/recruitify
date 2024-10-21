import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    token: null, // Add token state
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // Store token in state
    },
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
