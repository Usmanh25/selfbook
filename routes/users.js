import express from "express";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import {
  getUser,
  updateUser,
  getUserFriends,
  addRemoveFriend,
  uploadProfileImage,
} from "../controllers/users.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);

router.patch("/:id", verifyToken, updateUser);

router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id/profile-image", verifyToken, upload.single("picture"), uploadProfileImage);

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
