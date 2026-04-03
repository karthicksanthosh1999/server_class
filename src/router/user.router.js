import express from "express";
import { createUser, deleteUser, filterUser, getAllUsers, getSingleUser, sendOtp, updateUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.get("/getAll", getAllUsers);
userRouter.get("/getSingle/:id", getSingleUser);
userRouter.put("/update/:id", updateUser);
userRouter.post("/filterUsers", filterUser);
userRouter.post("/sendOtp", sendOtp);

export default userRouter;