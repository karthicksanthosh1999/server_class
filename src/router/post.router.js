import express from "express";
import { createPosts, getAllPosts } from "../controller/posts.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const postsRoutes = express.Router();

postsRoutes.post("/create", authMiddleware, createPosts);
postsRoutes.get("/getAll", authMiddleware, getAllPosts);

export default postsRoutes;