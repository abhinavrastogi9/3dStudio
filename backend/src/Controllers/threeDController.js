import { ThreeDFile } from "../Models/ThreeDModel.js";
import { User } from "../Models/userModel.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { deleteFileFromS3 } from "../Utils/deleteUploadedFile.js";

// Controller to handle uploading a 3D file
const uploadThreeDFile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { location, originalname, mimetype, key } = req?.file;
  let fileType;
  // Validate file upload fields
  if (!location || !originalname || !mimetype || !key) {
    throw new apiError(400, "File upload failed");
  }
  // Determine file type based on mimetype
  if (mimetype === "model/obj" || mimetype === "application/x-tgif") {
    fileType = "obj";
  } else if (mimetype === "model/gltf-binary") {
    fileType = "glb";
  } else {
    // Delete unsupported file from S3 and throw error
    await deleteFileFromS3(key);
    throw new apiError(400, "Unsupported file type");
  }
  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "User not found");
  }

  // Prepare file data for database
  const fileData = {
    uploadedBy: userId,
    publicUrl: location,
    fileName: originalname,
    fileType: fileType,
    key: key,
  };

  // Save file data to database
  const createFile = await ThreeDFile.create(fileData);
  if (!createFile) {
    throw new apiError(500, "Something went wrong while saving the file");
  }

  // Respond with success
  res
    .status(200)
    .json(new apiResponse(200, fileData, "File uploaded successfully"));
});

// Controller to get all 3D files uploaded by a user
const getAllThreeDFiles = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    throw new apiError(400, "User ID is required");
  }

  // Find all files uploaded by the user
  const files = await ThreeDFile.find({ uploadedBy: userId });
  if (!files) {
    throw new apiError(404, "No files found for this user");
  }

  // Respond with files
  res
    .status(200)
    .json(new apiResponse(200, files, "Files retrieved successfully"));
});

// Controller to delete a 3D file by its ID
const deleteThreeDFile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { fileId } = req.params;
  if (!userId || !fileId) {
    throw new apiError(400, "User ID and file ID are required");
  }

  // Find file by ID
  const file = await ThreeDFile.findById(fileId);
  if (!file) {
    throw new apiError(404, "File not found");
  }

  // Check if the user is authorized to delete the file
  if (file.uploadedBy.toString() !== userId) {
    throw new apiError(403, "You do not have permission to delete this file");
  }

  // Delete file from S3 and database
  if (file?.key) {
    await deleteFileFromS3(file.key);
  }
  await ThreeDFile.findByIdAndDelete(fileId);

  // Respond with success
  res
    .status(200)
    .json(new apiResponse(200, { _id: fileId }, "File deleted successfully"));
});

// Controller to get a 3D file by its ID
const getThreeDFileById = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  if (!fileId) {
    throw new apiError(400, "File ID is required");
  }
  if (fileId.length != 24) {
    throw new apiError(404, "File not found");
  }
  // Find file by ID
  const file = await ThreeDFile.findById(fileId);
  if (!file) {
    throw new apiError(404, "File not found");
  }
  // Respond with file data
  res
    .status(200)
    .json(new apiResponse(200, file, "File retrieved successfully"));
});

// update changes in file
const updateFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  const { environmentPreset, cameraState } = req.body;

  // Validate input
  if (!fileId || !environmentPreset || !cameraState) {
    throw new apiError(
      400,
      "File ID, environment preset, and camera state are required"
    );
  }

  // Find file by ID
  const file = await ThreeDFile.findById(fileId);
  if (!file) {
    throw new apiError(404, "File not found");
  }

  // Update file details
  file.environmentPreset = environmentPreset;
  file.cameraState = cameraState;
  // Save updated file
  const updatedFile = await file.save();

  // Respond with updated file data
  res
    .status(200)
    .json(new apiResponse(200, updatedFile, "File updated successfully"));
});
// Export all controller functions
export {
  uploadThreeDFile,
  getAllThreeDFiles,
  deleteThreeDFile,
  getThreeDFileById,
  updateFile,
};
