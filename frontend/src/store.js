import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import { userApi } from "./slice/apiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
