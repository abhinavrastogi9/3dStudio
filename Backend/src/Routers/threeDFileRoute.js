import { Router } from "express";
import uploadFile from "../Utils/uploadFile.js";
import uploadThreeDFile from "../Controllers/threeDController.js";
import verifyJwt from "../MiddleWares/verifyJwtMiddleware.js";

const ThreeDFileRouter = Router();
ThreeDFileRouter.post("/upload", verifyJwt, uploadFile.single("file"), uploadThreeDFile);

export default ThreeDFileRouter;