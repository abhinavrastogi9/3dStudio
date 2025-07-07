import asyncHandler from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { User } from "../Models/userModel.js";

async function generateTokens(userId) {
  try {
    //genrate access and refresh token
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong while generating access and referesh tokens"
    );
  }
}
const isProduction = process.env.PRODUCTION === "true";
const options = {
  domain: isProduction ? ".clikn.in" : "localhost", // Change from "frontend" to "localhost"
  path: "/",
  httpOnly: true,
  secure: isProduction, // Set to true in production with HTTPS
  sameSite: isProduction ? "None" : "Lax", // Use "None" if frontend and backend are on different domains
  maxAge: 24 * 60 * 60 * 1000,
};

const userRegistration = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req?.body;
    if (firstName == "" || lastName == "" || email == "" || password == "") {
      throw new apiError(400, "All fields are required");
    }
    const userExits = await User.findOne({ email: email });
    if (userExits) {
     throw new apiError(409, "Email is already in use");
    }
   let user = await User.create({
      firstName,
      lastName,
      email,
      hash_password: password,
    });
    if (!user) {
      throw new apiError(500, "Something went wrong while registering user");
    }
  const { accessToken, refreshToken } = await generateTokens(user?._id);
  if (!accessToken || !refreshToken) {
    throw new apiError(500, "Something went wrong while generating  tokens");
  }
  user = await User.findById(user._id).select(
    " -hash_password -refreshToken -createdAt -updatedAt -__v -_id -googleId"
  );
  if (!user) {
    throw new apiError(500, "something went wrong while Creating  user");
  }

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, user, "Registration and login successful"));
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    throw new apiError(400, "Missing  required data");
  }
  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    throw new apiError(400, "User not registred");
  }
  const loggedInUser = await User.findById(userExists._id).select(
    "-hash_password -refreshToken -createdAt -updatedAt -__v -_id"
  );
  const isPasswordCorrect = await userExists.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new apiError(401, "Unauthorized request");
  }
  const { accessToken, refreshToken } = await generateTokens(userExists?._id);
  if (!accessToken || !refreshToken) {
    throw new apiError(500, "Something went wrong while generating  tokens");
  }
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(200, loggedInUser, " login successful")
    );
});

const verifyUser = asyncHandler(async (req, res) => {
  const { userId } = req?.user;
  if (!userId) {
    throw new apiError(400, "Required data is missing ");
  }
  const user = await User.findById(userId).select(
    "-refreshToken -createdAt -updatedAt -__v -_id  -hash_password"
  );
  if (!user) {
    throw new apiError(404, "User not found");
  }
  res
    .status(200)
    .json(new apiResponse(200, user, "User successfully verified"));
});


const userLogout = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    throw new apiError(400, " Missing required data");
  }
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
  res
    .status(201)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(201, {}, "user logged out successfully"));
  res.status(200).cookie();
});

export { userRegistration, userLogin, verifyUser, userLogout };