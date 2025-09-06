import express from "express";
import { register, login, loginGuest } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/guest-login", loginGuest);

export default router;
