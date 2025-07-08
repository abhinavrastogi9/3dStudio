import asyncHandler from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { User } from "../Models/userModel.js";

// Helper function to generate access and refresh tokens for a user
async function generateTokens(userId) {
  try {
    // Find user by ID
    const user = await User.findById(userId);
    // Generate access and refresh tokens using user methods
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // Save refresh token to user document
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    // Handle errors during token generation
    throw new apiError(
      500,
      "Something went wrong while generating access and referesh tokens"
    );
  }
}

// Cookie options for storing tokens
const isProduction = process.env.PRODUCTION === "production";
const options = {
  domain: isProduction ? ".clikn.in" : "localhost", // Use production domain or localhost
  path: "/",
  httpOnly: true,
  secure: isProduction, // Secure cookies in production
  sameSite: isProduction ? "None" : "Lax", // Adjust for cross-domain in production
};

// Controller for user registration
const userRegistration = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req?.body;
  // Validate required fields
  if (firstName == "" || lastName == "" || email == "" || password == "") {
    throw new apiError(400, "All fields are required");
  }
  // Check if user already exists
  const userExits = await User.findOne({ email: email });
  if (userExits) {
    throw new apiError(409, "Email is already in use");
  }
  // Create new user
  let user = await User.create({
    firstName,
    lastName,
    email,
    hash_password: password,
  });
  if (!user) {
    throw new apiError(500, "Something went wrong while registering user");
  }
  // Generate tokens for the new user
  const { accessToken, refreshToken } = await generateTokens(user?._id);
  if (!accessToken || !refreshToken) {
    throw new apiError(500, "Something went wrong while generating  tokens");
  }
  // Fetch user data without sensitive fields
  user = await User.findById(user._id).select(
    " -hash_password -refreshToken -createdAt -updatedAt -__v -_id -googleId"
  );
  if (!user) {
    throw new apiError(500, "something went wrong while Creating  user");
  }

  // Respond with user data and set cookies
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, user, "Registration and login successful"));
});

// Controller for user login
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  // Validate required fields
  if (!email || !password) {
    throw new apiError(400, "Missing  required data");
  }
  // Check if user exists
  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    throw new apiError(400, "User not registred");
  }
  // Fetch user data without sensitive fields
  const loggedInUser = await User.findById(userExists._id).select(
    "-hash_password -refreshToken -createdAt -updatedAt -__v -_id"
  );
  // Verify password
  const isPasswordCorrect = await userExists.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new apiError(401, "Invalid email or password.");
  }
  // Generate tokens for the user
  const { accessToken, refreshToken } = await generateTokens(userExists?._id);
  if (!accessToken || !refreshToken) {
    throw new apiError(500, "Something went wrong while generating  tokens");
  }
  // Respond with user data and set cookies
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(200, loggedInUser, " login successful")
    );
});

// Controller to verify user authentication and return user data
const verifyUser = asyncHandler(async (req, res) => {
  const { userId } = req?.user;
  // Check if userId is present
  if (!userId) {
    throw new apiError(400, "Required data is missing ");
  }
  // Fetch user data without sensitive fields
  const user = await User.findById(userId).select(
    "-refreshToken -createdAt -updatedAt -__v -_id  -hash_password"
  );
  if (!user) {
    throw new apiError(404, "User not found");
  }
  // Respond with user data
  res
    .status(200)
    .json(new apiResponse(200, user, "User successfully verified"));
});

// Controller for user logout
const userLogout = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  // Check if userId is present
  if (!userId) {
    throw new apiError(400, " Missing required data");
  }
  // Remove refresh token from user document
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  // Clear cookies and respond
  res
    .status(201)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(201, {}, "user logged out successfully"));
  res.status(200).cookie();
});

// Export all user controller functions
export { userRegistration, userLogin, verifyUser, userLogout };