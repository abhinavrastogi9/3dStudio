import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "User last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      trim: true,
    },
    hash_password: {
      type: String,
      required: [true, "User password is required"],
      trim: true,
    },
    refreshToken: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  this.hash_password = await bcrypt.hash(this.hash_password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.hash_password);
};

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign(
    { _id: this._id, firstName: this.firstName, email: this.email },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  return accessToken;
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
  return refreshToken;
};

export const User = model("User", userSchema);
