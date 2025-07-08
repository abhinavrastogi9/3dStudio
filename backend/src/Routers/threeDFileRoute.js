import { Router } from "express";
import uploadFile from "../Utils/uploadFile.js";
import {
  uploadThreeDFile,
  getAllThreeDFiles,
  deleteThreeDFile,
  getThreeDFileById,
  updateFile,
} from "../Controllers/threeDController.js";
import verifyJwt from "../MiddleWares/verifyJwtMiddleware.js";

const ThreeDFileRouter = Router();
ThreeDFileRouter.post(
  "/upload",
  verifyJwt,
  uploadFile.single("file"),
  uploadThreeDFile
);
ThreeDFileRouter.get("/allfiles", verifyJwt, getAllThreeDFiles);
ThreeDFileRouter.delete("/:fileId", verifyJwt, deleteThreeDFile);
ThreeDFileRouter.get("/:fileId", verifyJwt, getThreeDFileById);
ThreeDFileRouter.put("/:fileId", verifyJwt, updateFile);
export default ThreeDFileRouter;
