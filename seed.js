// seed.js
import mongoose from "mongoose";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js"; // original data import
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

// const MONGO_URL = "mongodb://127.0.0.1:27017/selfbook";

await mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("✅ Connected to MongoDB");

const seedDB = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    console.log("🗑️ Cleared existing users and posts");

    const createdUsers = [];
    for (const user of users) {
      const u = await User.create({ ...user, friends: [] });
      createdUsers.push(u);
    }
    console.log(`👤 Inserted ${createdUsers.length} users`);

    const postsWithUserIds = posts.map((post) => {
      const user = createdUsers.find((u) => u.firstName === post.firstName);
      return { ...post, userId: user._id, userPicturePath: user.picturePath };
    });

    await Post.insertMany(postsWithUserIds);
    console.log(`📝 Inserted ${postsWithUserIds.length} posts`);

    console.log("🎉 Seeding complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
