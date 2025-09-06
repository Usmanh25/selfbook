import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createPost);

router.get("/", verifyToken, getFeedPosts);

router.get("/:userId/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);

router.delete("/:id", verifyToken, deletePost);

export default router;
