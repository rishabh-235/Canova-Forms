import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});
export const { signout, setUser, setInitialized } = userSlice.actions;
export default userSlice.reducer;



