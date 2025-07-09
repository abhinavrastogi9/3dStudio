import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./userAuthentication/authenticationSlice.js";
import fileApiSlice from "./fileApiCalls/fileApiSlice.js";
const store = configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    fileApiSlice: fileApiSlice,
  },
});
export default store;
