import express from "express";
import { register, login, loginGuest } from "../controllers/auth.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login with email/password
router.post("/login", login);

// Login as guest
router.post("/guest-login", loginGuest);

export default router;
