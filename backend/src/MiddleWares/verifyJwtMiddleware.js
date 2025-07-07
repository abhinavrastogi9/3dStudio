import { User } from "../Models/userModel.js";
import apiError from "../Utils/apiError.js";
import asyncHandler from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// Middleware to verify JWT tokens from cookies
const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    // Get cookies from request
    const cookies = req?.cookies;
    const accessToken = cookies?.accessToken;
    const refreshToken = cookies?.refreshToken;

    // Check if both tokens are present
    if (!refreshToken || !accessToken) {
      throw new apiError(401, "Unauthorized request");
    }

    // Verify access token using secret
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN
    );

    // Find user by ID from decoded token
    const user = await User.findById(decodedAccessToken._id);
    if (!user) {
      throw new apiError(401, "Invalid Access Token");
    }

    // Attach user info to request object
    req.user = {
      userId: decodedAccessToken._id,
      firstName: decodedAccessToken.firstName,
      email: decodedAccessToken.email,
    };

    // Proceed to next middleware/controller
    next();
  } catch (error) {
    // Handle token errors
    throw new apiError(401, error?.message || " Access Token Expired");
  }
});

export default verifyJwt;