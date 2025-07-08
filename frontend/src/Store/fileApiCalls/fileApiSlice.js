import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const uploadFileApiCall = createAsyncThunk(
  "fileApiSlice/uploadFile",
  async (file) => {
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/file/upload`,
        { file: file },
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getFileByIdApiCall = createAsyncThunk(
  "fileApiSlice/getFileByIdApiCall",
  async (FileId) => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/file/${FileId}`,null,{withCredentials:true}
      );
      response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
export const UpdateFileApiCall = createAsyncThunk(
  "fileApiSlice/UpdateFileApiCall",
  async ({FileId,filedata}) => {
    try {
      const response = await axios.put(
        `${process.env.BASE_URL}/file/${FileId}`,{filedata},{withCredentials:true}
      );
      response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getAllFilesApiCall = createAsyncThunk(
  "fileApiSlice/getAllFilesApiCall",
  async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/file/allfiles`,null,{withCredentials:true});
      response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteFileApiCall = createAsyncThunk(
  "fileApiSlice/deleteFileApiCall",
  async (fileId) => {
    try {
      const response = await axios.delete(`${process.env.BASE_URL}/file/${fileId}`,null,{withCredentials:true});
      response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
const fileApiSlice = createSlice({
  name: "fileApiSlice",
  initialState: {
    fileData: {},
    allFiles: [],
    error: null,
    filesLoading: false,
    fileDataLoading: false,
    uploading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileApiCall.pending, (state) => {
        state.uploading = true;
      })
      .addCase(uploadFileApiCall.fulfilled, (state) => {
        toast.success("File uploaded successfully");
        state.uploading = false;
      })
      .addCase(uploadFileApiCall.rejected, (state, action) => {
        toast.error("Failed to Upload Please Retry");
        (state.uploading = false), (state.error = action.error.message);
      });
  },
});

export default fileApiSlice.reducer;
