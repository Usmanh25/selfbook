import express from "express";
import mongoose from "mongoose";
import pkg from "gridfs-stream";

const Grid = pkg;

const router = express.Router();
let gfs;

const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // match the bucket name in multer-gridfs-storage
});

// GET /files/:filename
router.get("/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file || !file.length) return res.status(404).json({ error: "File not found" });

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  } catch (err) {
    console.error("Error fetching file:", err);
    res.status(500).json({ error: "Server error fetching file" });
  }
});

export default router;
