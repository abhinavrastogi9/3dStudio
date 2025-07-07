import { Router } from "express";
import uploadFile from "../Utils/uploadFile.js";
import {
  uploadThreeDFile,
  getAllThreeDFiles,
  deleteThreeDFile,
  getThreeDFileById,
} from "../Controllers/threeDController.js";
import verifyJwt from "../MiddleWares/verifyJwtMiddleware.js";

const ThreeDFileRouter = Router();
ThreeDFileRouter.post(
  "/upload",
  verifyJwt,
  uploadFile.single("file"),
  uploadThreeDFile
);
ThreeDFileRouter.get("/all", verifyJwt, getAllThreeDFiles);
ThreeDFileRouter.delete("/:fileId", verifyJwt, deleteThreeDFile);
ThreeDFileRouter.get("/:fileId", verifyJwt, getThreeDFileById);
export default ThreeDFileRouter;
