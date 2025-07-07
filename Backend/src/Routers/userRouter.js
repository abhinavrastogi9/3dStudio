import express, { Router } from "express";
import { userLogin, userLogout, userRegistration, verifyUser } from "../Controllers/userController.js";
import verifyJwt from "../MiddleWares/verifyJwtMiddleware.js";
const userRouter = Router();
userRouter.post("/registration",userRegistration);
userRouter.post("/login", userLogin);
userRouter.get("/userVerification", verifyJwt,verifyUser);
userRouter.get("/logout", verifyJwt,userLogout);
export default userRouter;