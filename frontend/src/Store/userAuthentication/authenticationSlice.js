import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const loginApiCall = createAsyncThunk(
  "authenticationSlice/loginApiCall",
  async (loginData) => {
    try {
      const result = await axios.post(
        `${process.env.BASE_URL}/login`,
        loginData
      );
      return result.data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      throw error;
    }
  }
);
export const signupApiCall = createAsyncThunk(
  "authenticationSlice/signupApiCall",
  async (signupData) => {
    try {
      const result = await axios.post(
        `${process.env.BASE_URL}/signup`,
        signupData
      );
      return result.data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      throw error;
    }
  }
);
export const logoutApiCall = createAsyncThunk(
  "authenticationSlice/logoutApiCall",
  async () => {
    try {
      const result = await axios.post(`${process.env.BASE_URL}/logout`, null, {
        withCredentials: true,
      });
      return result.data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed");
      throw error;
    }
  }
);
export const verifyUserApiCall = createAsyncThunk(
  "authenticationSlice/verifyUserApiCall",
  async () => {
    try {
      const result = await axios.get(
        `${process.env.BASE_URL}/userVerification`,
        {
          withCredentials: true,
        }
      );
      return result.data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch user info");
      throw error;
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
        toast.success("Login successful");
      })
      .addCase(loginApiCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Login failed");
      })
      .addCase(signupApiCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload;
        toast.success("Signup successful");
      })
      .addCase(signupApiCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Signup failed");
      })
      .addCase(logoutApiCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutApiCall.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.userInfo = null;
        toast.success("Logout successful");
      })
      .addCase(logoutApiCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Logout failed");
      })
      .addCase(verifyUserApiCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.userInfo = action.payload;
      })
      .addCase(verifyUserApiCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Failed to fetch user info");
      });
  },
});
export default authenticationSlice.reducer;
