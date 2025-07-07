import { ThreeDFile } from "../Models/ThreeDModel.js";
import { User } from "../Models/userModel.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";

const uploadThreeDFile = asyncHandler(async (req, res) => {
  //req.file.location.originalname
  const { userId } = req.user;
  const { location, originalname } = req?.file;
  if (!location || !originalname) {
    throw new apiError(400, "File upload failed");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "User not found");
  }
  const fileData = {
    uploadedBy: userId,
    PublicUrl: location,
    fileName: originalname,
  };
  const createFile = await ThreeDFile.create(fileData);
  if (!createFile) {
    throw new apiError(500, "Something went wrong while saving the file");
  }

  res
    .status(200)
    .json(new apiResponse(200, fileData, "File uploaded successfully"));
});
export default uploadThreeDFile;
