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

/* CREATE */
// router.post("/", verifyToken, createPost);
// router.post("/", verifyToken, upload.single("picture"), createPost);

router.post("/", verifyToken, upload.single("picture"), async (req, res, next) => {
  try {
    if (req.file) {
      // generate unique filename
      const filename = Date.now() + "_" + req.file.originalname;
      // write buffer to GridFS
      const fileId = await uploadToGridFS(req.file.buffer, filename);
      // attach filename or ObjectId to req.body so controller can save it
      req.body.picturePath = filename; // or fileId if you prefer storing ObjectId
    }
    next(); // proceed to createPost controller
  } catch (err) {
    console.error("[post route] Error uploading file to GridFS:", err);
    return res.status(500).json({ message: "Failed to upload file" });
  }
}, createPost);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

//  DELETE route
router.delete("/:id", verifyToken, deletePost);

// import upload from "../middleware/upload.js";
// router.post("/", verifyToken, upload.single("picture"), createPost);
// router.get("/", verifyToken, getFeedPosts);
// router.get("/:userId/posts", verifyToken, getUserPosts);
// router.patch("/:id/like", verifyToken, likePost);
// router.delete("/:id", verifyToken, deletePost);

export default router;
