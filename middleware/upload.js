import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Ensure uploads directory exists
// const uploadDir = "public/assets";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// Configure storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const storage = new GridFsStorage({
  url: MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // Only allow image files
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);

      if (extname && mimetype) {
        // Generate random filename
        crypto.randomBytes(16, (err, buf) => {
          if (err) return reject(err);
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename,
            bucketName: "uploads", // GridFS collection name
          };
          resolve(fileInfo);
        });
      } else {
        reject(new Error("Only .jpeg, .jpg, .png files are allowed!"));
      }
    });
  },
  options: { useUnifiedTopology: true },
});

// file filter for images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, .png files are allowed!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload