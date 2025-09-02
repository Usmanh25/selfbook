import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js"; 

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, createPost);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

//  DELETE route
router.delete("/:id", verifyToken, deletePost);

export default router;
