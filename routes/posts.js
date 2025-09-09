import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import upload, { uploadToGridFS } from "../middleware/upload.js";

const router = express.Router();

/* CREATE POST */
router.post(
  "/",
  verifyToken,
  upload.single("picture"),
  async (req, res, next) => {
    try {
      if (req.file) {
        const filename = Date.now() + "_" + req.file.originalname;
        // write buffer to GridFS and get ObjectId
        const fileId = await uploadToGridFS(req.file.buffer, filename);
        // attach ObjectId to req.body
        req.body.picturePath = fileId.toString();
      }
      next(); // pass to controller
    } catch (err) {
      console.error("[post route] Error uploading file to GridFS:", err);
      return res.status(500).json({ message: "Failed to upload file" });
    }
  },
  createPost
);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* DELETE */
router.delete("/:id", verifyToken, deletePost);

export default router;
