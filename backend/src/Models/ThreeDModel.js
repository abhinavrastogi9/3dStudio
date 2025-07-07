import mongoose, { model, Schema } from "mongoose";

const ThreeDModelSchema = new Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publicUrl: {
      type: String,
      required: true,
      trim: true,
    },
    fileName: { type: String, required: true },
    fileType: { type: String,  }, 
    cameraState: {
      position: { x: Number, y: Number, z: Number },
      target: { x: Number, y: Number, z: Number },
      zoom: { type: Number },
    },
    fileType: {
      type: String,
      enum: ["obj", "glb"],
      required: true,
    },
    environmentPreset: {
      type: String,
      enum: [
        "sunset",
        "dawn",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
        "park",
        "lobby",
      ],
      default: "apartment", // Default preset
    },
  },
  {
    timestamps: true,
  }
);

export const ThreeDFile = model("ThreeDFile", ThreeDModelSchema);
