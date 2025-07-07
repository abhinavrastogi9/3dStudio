import dotenv from "dotenv";
dotenv.config();
import multerS3 from "multer-s3";
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";

// Initialize AWS S3 client with credentials from environment variables
export const s3 = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// Configure multer to upload files directly to S3 using multer-s3 storage engine
const uploadFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the content type based on the file
    key: function (req, file, cb) {
      // Generate unique file key using timestamp and original filename
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

export default uploadFile;
