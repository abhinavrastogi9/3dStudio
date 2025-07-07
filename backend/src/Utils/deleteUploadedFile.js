import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import apiError from "./apiError.js";
import { s3 } from "./uploadFile.js";
export const deleteFileFromS3 = async (key) => {
  try {
    const response = await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
      })
    );
    if (response.$metadata.httpStatusCode !== 204) {
      throw new apiError(
        500,
        "Unexpected response from S3 while deleting file"
      );
    }
  } catch (error) {
    throw new apiError(500, "Failed to delete file from S3", error);
  }
};
