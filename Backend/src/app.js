import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import errorHandler from "./MiddleWares/errorHandlerMiddleware.js";
import userRouter from "./Routers/userRouter.js";
dotenv.config();

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",userRouter)
app.use(errorHandler);
