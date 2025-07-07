import mongoose, { model } from "mongoose";

const ThreeDModelSchema = new Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    PublicUrl: {
      type: String,
      required: true,
      trim: true,
    },
    fileName: { type: String, required: true },
    cameraState: {
      position: { x: Number, y: Number, z: Number },
      target: { x: Number, y: Number, z: Number },
      zoom: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

export const ThreeDFile = model("ThreeDFile", ThreeDModelSchema);
