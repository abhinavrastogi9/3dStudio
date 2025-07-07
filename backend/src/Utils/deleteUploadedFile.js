import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import apiError from "./apiError.js";
import { s3 } from "./uploadFile.js";

// Utility function to delete a file from AWS S3 bucket by its key
export const deleteFileFromS3 = async (key) => {
  try {
    // Send delete command to S3
    const response = await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
      })
    );
    // Check if S3 responded with the expected status code
    if (response.$metadata.httpStatusCode !== 204) {
      throw new apiError(
        500,
        "Unexpected response from S3 while deleting file"
      );
    }
  } catch (error) {
    // Handle errors during deletion
    throw new apiError(500, "Failed to delete file from S3", error);
  }
};
