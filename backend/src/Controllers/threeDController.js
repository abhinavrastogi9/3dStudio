import { ThreeDFile } from "../Models/ThreeDModel.js";
import { User } from "../Models/userModel.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { deleteFileFromS3 } from "../Utils/deleteUploadedFile.js";

const uploadThreeDFile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { location, originalname, mimetype, key } = req?.file;
  let fileType;
  if (!location || !originalname || !mimetype || !key) {
    throw new apiError(400, "File upload failed");
  }
  if (mimetype === "model/obj") {
    //check for obj
    fileType = "obj";
  } else if (mimetype === "model/gltf-binary") {
    //check for glb
    fileType = "glb";
  } else {
    await deleteFileFromS3(key);
    throw new apiError(400, "Unsupported file type");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "User not found");
  }
  const fileData = {
    uploadedBy: userId,
    publicUrl: location,
    fileName: originalname,
    fileType: fileType,
  };
  const createFile = await ThreeDFile.create(fileData);
  if (!createFile) {
    throw new apiError(500, "Something went wrong while saving the file");
  }
  res
    .status(200)
    .json(new apiResponse(200, fileData, "File uploaded successfully"));
});
const getAllThreeDFiles = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    throw new apiError(400, "User ID is required");
  }
  const files = await ThreeDFile.find({ uploadedBy: userId });
  if (!files ) {
    throw new apiError(404, "No files found for this user");
  }
  res.status(200).json(new apiResponse(200, files, "Files retrieved successfully"));
});
const deleteThreeDFile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { fileId } = req.params;
  if (!userId || !fileId) {
    throw new apiError(400, "User ID and file ID are required");
  }
  const file = await ThreeDFile.findById(fileId);
  if (!file) {
    throw new apiError(404, "File not found");
  }
  if (file.uploadedBy.toString() !== userId) {
    throw new apiError(403, "You do not have permission to delete this file");
  }
  await deleteFileFromS3(file.key);
  await ThreeDFile.findByIdAndDelete(fileId);
  res.status(200).json(new apiResponse(200, null, "File deleted successfully"));
});

const getThreeDFileById = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  if (!fileId) {
    throw new apiError(400, "File ID is required");
  }
  const file = await ThreeDFile.findById(fileId);
  if (!file) {
    throw new apiError(404, "File not found");
  }
  res.status(200).json(new apiResponse(200, file, "File retrieved successfully"));
});

export  {uploadThreeDFile, getAllThreeDFiles, deleteThreeDFile, getThreeDFileById};
