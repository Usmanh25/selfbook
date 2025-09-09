import express from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const router = express.Router();

let gfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

// GET /files/:id
router.get("/:id", async (req, res) => {
  try {
    const fileId = new ObjectId(req.params.id);
    const downloadStream = gfsBucket.openDownloadStream(fileId);
    downloadStream.on("error", () => res.sendStatus(404));
    downloadStream.pipe(res);
  } catch (err) {
    console.error("Error fetching file by ID:", err);
    res.sendStatus(500);
  }
});

export default router;
