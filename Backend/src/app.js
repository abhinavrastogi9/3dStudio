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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",userRouter)
app.use("/threeDFile",ThreeDFileRouter)
app.use(errorHandler);
