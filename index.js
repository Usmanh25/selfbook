import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import fileRoutes from "./routes/files.js";
import upload from "./middleware/upload.js";

import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.set('strictQuery', false);

const app = express();

/* MIDDLEWARE SETUP */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES WITH FILES */
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/files", fileRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
const MONGO_URI = process.env.MONGO_URI

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Connected to MongoDB Atlas. Server running on port ${PORT}`)
    );

  })
  .catch((error) => console.error("❌ MongoDB connection error:", error.message));

/* GRACEFUL SHUTDOWN */
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});
