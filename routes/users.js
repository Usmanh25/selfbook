// routes/users.js
import express from "express";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import {
  getUser,
  updateUser,
  getUserFriends,
  addRemoveFriend,
  uploadProfileImage,
} from "../controllers/users.js";

const router = express.Router();

// Configure multer storage for profile images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});
const upload = multer({ storage });

// Routes

// GET a single user
router.get("/:id", verifyToken, getUser);

// PATCH user info (firstName, lastName, location, occupation)
router.patch("/:id", verifyToken, updateUser);

// GET a user's friends
router.get("/:id/friends", verifyToken, getUserFriends);

// PATCH upload profile image
router.patch("/:id/profile-image", verifyToken, upload.single("picture"), uploadProfileImage);

// PATCH add/remove friend
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);



export default router;
