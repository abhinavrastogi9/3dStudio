import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

//  Upload file
export const uploadFileApiCall = createAsyncThunk(
  "fileApiSlice/uploadFileApiCall",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/file/upload`, formData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "File Not Uploaded. Retry."
      );
    }
  }
);

//  Get file by ID
export const getFileByIdApiCall = createAsyncThunk(
  "fileApiSlice/getFileByIdApiCall",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/file/${_id}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch file."
      );
    }
  }
);

// Update file
export const UpdateFileApiCall = createAsyncThunk(
  "fileApiSlice/UpdateFileApiCall",
  async ({ FileId, environmentPreset, cameraState }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/file/${FileId}`,
        { environmentPreset: environmentPreset, cameraState: cameraState },
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update file."
      );
    }
  }
);
//  Get all files
export const getAllFilesApiCall = createAsyncThunk(
  "fileApiSlice/getAllFilesApiCall",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/file/allfiles`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load files."
      );
    }
  }
);

//  Delete file
export const deleteFileApiCall = createAsyncThunk(
  "fileApiSlice/deleteFileApiCall",
  async (fileId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/file/${fileId}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete file."
      );
    }
  }
);

//  Slice
const fileApiSlice = createSlice({
  name: "fileApiSlice",
  initialState: {
    fileData: {},
    allFiles: [],
    error: null,
    filesLoading: false,
    fileFetched: "pending",
    uploading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Upload file
    builder
      .addCase(uploadFileApiCall.pending, (state) => {
        state.uploading = true;
      })
      .addCase(uploadFileApiCall.fulfilled, (state, action) => {
        state.uploading = false;
        state.fileData = action.payload;
        toast.success("File uploaded successfully");
      })
      .addCase(uploadFileApiCall.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload || action.error.message;
        toast.error(action.payload);
      });

    // Update file
    builder
      .addCase(UpdateFileApiCall.fulfilled, (state, action) => {
        state.fileData = action.payload;
        toast.success("File updated successfully");
      })
      .addCase(UpdateFileApiCall.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        toast.error(action.payload);
      });

    // Get single file
    builder
      .addCase(getFileByIdApiCall.pending, (state) => {
        state.fileData = {};
      })
      .addCase(getFileByIdApiCall.fulfilled, (state, action) => {
        state.fileFetched = "success";
        state.fileData = action.payload;
      })
      .addCase(getFileByIdApiCall.rejected, (state, action) => {
        state.fileFetched = "failed";
        state.fileData = {};
        state.error = action.payload || action.error.message;
        toast.error(action.payload);
      });

    // Get all files
    builder
      .addCase(getAllFilesApiCall.pending, (state) => {
        state.filesLoading = true;
      })
      .addCase(getAllFilesApiCall.fulfilled, (state, action) => {
        state.filesLoading = false;
        state.allFiles = action.payload;
      })
      .addCase(getAllFilesApiCall.rejected, (state, action) => {
        state.filesLoading = false;
        state.error = action.payload || action.error.message;
        toast.error(action.payload);
      });

    // Delete file
    builder
      .addCase(deleteFileApiCall.fulfilled, (state, action) => {
        state.allFiles = state.allFiles.filter(
          (file) => file._id !== action.payload._id
        );
        toast.success("File deleted successfully");
      })
      .addCase(deleteFileApiCall.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        toast.error(action.payload);
      });
  },
});

export default fileApiSlice.reducer;
