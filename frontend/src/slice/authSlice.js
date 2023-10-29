import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      window.localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
    },

    removeCredentials: (state) => {
      window.localStorage.setItem("userInfo", null);
      state.userInfo = null;
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;
