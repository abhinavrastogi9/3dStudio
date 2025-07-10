import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import errorHandler from "./MiddleWares/errorHandlerMiddleware.js";
import userRouter from "./Routers/userRouter.js";
dotenv.config();
import cookieParser from "cookie-parser";
import ThreeDFileRouter from "./Routers/threeDFileRoute.js";
export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use("/api/user",userRouter)
app.use("/api/file",ThreeDFileRouter)
app.use(errorHandler);
