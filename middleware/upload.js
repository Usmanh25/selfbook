import multer from "multer";
import { MongoClient, GridFSBucket } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const storage = multer.memoryStorage();


// File filter for images options
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(file.originalname.toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb(new Error("Only .jpeg, .jpg, .png files are allowed!"));
};

// Export multer middleware
const upload = multer({ storage, fileFilter });

export default upload;

// Helper function for writing buffer to GridFS
export const uploadToGridFS = async (buffer, filename) => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(); // default DB from connection string
  const bucket = new GridFSBucket(db, { bucketName: "uploads" });
  
  return new Promise((resolve, reject) => {
    const stream = bucket.openUploadStream(filename);
    stream.end(buffer);
    stream.on("finish", () => {
      resolve(stream.id); // returns ObjectId for the file
    });
    stream.on("error", (err) => reject(err));
  });
};