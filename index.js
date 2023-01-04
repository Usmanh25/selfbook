import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
mongoose.set('strictQuery', false);
const app = express();
app.use(express.json());



app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.contentSecurityPolicy({ contentSecurityPolicy: false }));
// app.use(helmet({contentSecurityPolicy: false}));



app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);



/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`CONNECTED TO MDB! Server Port: ${PORT}`));

    /* ADD DATA THEN COMMENT IT OUT IMMEDIATELY */
    // User.insertMany(users);
    // Post.insertMany(posts);

  })
  .catch((error) => console.log(`${error} Check code in server/index.js`));


// FIRST HEROKU CONFIG
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "./client/build")))
//   app.get("*", function(request, response) {
//     response.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
//   })
// }

// // Step 1:
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// // Step 2:
// app.get("*", function(request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });





// use
// app.use('*', express.static(path.join(__dirname, "client", "build")))


// instead of
// app.use("/*", (req, res) => {
//   res.send(path.join(__dirname, "client", "build", "index.html"));
// });