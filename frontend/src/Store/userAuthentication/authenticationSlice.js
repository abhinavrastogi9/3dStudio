import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const loginApiCall = createAsyncThunk(
  "authenticationSlice/loginApiCall",
  async (loginData, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${BASE_URL}/login`, loginData, {
        withCredentials: true,
      });
      return result.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);
export const signupApiCall = createAsyncThunk(
  "authenticationSlice/signupApiCall",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${BASE_URL}/signup`, formData, {
        withCredentials: true,
      });
      return result.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Signup failed");
    }
  }
);
export const logoutApiCall = createAsyncThunk(
  "authenticationSlice/logoutApiCall",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      return result.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Logout failed");
    }
  }
);
export const verifyUserApiCall = createAsyncThunk(
  "authenticationSlice/verifyUserApiCall",
  async (page, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${BASE_URL}/userVerification`, {
        withCredentials: true,
      });
      return result.data.data;
    } catch (error) {
      if (page === "entry") throw error;
      else {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch user info"
        );
      }
    }
  }
);
const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState: {
    isLoggedIn: false,
    userInfo: null,
    error: null,
    loading: false,
    status: "pending",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginApiCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload;
        state.status = "success";

        toast.success("Login successful");
      })
      .addCase(loginApiCall.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || action.error.message;
        toast.error(action.payload);
      })
      .addCase(signupApiCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.status = "success";
        state.userInfo = action.payload;
        toast.success("Signup successful");
      })
      .addCase(signupApiCall.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || action.error.message;
        toast.error(action.payload);
      })
      .addCase(logoutApiCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutApiCall.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.status = "failed";
        state.userInfo = null;
        toast.success("Logout successful");
      })
      .addCase(logoutApiCall.rejected, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.error = action.error.message;
        toast.error("Logout failed");
      })
      .addCase(verifyUserApiCall.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(verifyUserApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.status = "success";
        state.userInfo = action.payload;
        toast.success("User info Fetched Successfully");
      })
      .addCase(verifyUserApiCall.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || action.error.message;
        toast.error(action.payload);
      });
  },
});
export default authenticationSlice.reducer;
