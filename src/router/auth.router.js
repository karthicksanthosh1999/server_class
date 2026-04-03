import express from "express";
import { loginUser, logout, registerUser } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/logout", logout)

export default authRouter;