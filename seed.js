import mongoose from "mongoose";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

await mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("✅ Connected to MongoDB");

const seedDB = async () => {
  try {
    // Clear old data
    await User.deleteMany();
    await Post.deleteMany();
    console.log("🗑️ Cleared existing users and posts");

    // Insert users first (no friends yet)
    const createdUsers = await User.insertMany(users.map((u) => ({ ...u, friends: [] })));
    console.log(`👤 Inserted ${createdUsers.length} users`);

    // Make everyone friends with each other
    for (const user of createdUsers) {
      user.friends = createdUsers
        .filter((u) => u._id.toString() !== user._id.toString())
        .map((u) => u._id);
      await user.save();
    }
    console.log("🤝 Linked all users as mutual friends");

    // Attach valid userIds to posts
    const postsWithUserIds = posts.map((post) => {
      const user = createdUsers.find((u) => u.firstName === post.firstName);
      if (!user) throw new Error(`No matching user for post by ${post.firstName}`);
      return {
        ...post,
        userId: user._id,
        userPicturePath: user.picturePath,
      };
    });

    // Add 40-50 random likes per post (array of ObjectIds)
    const MIN_LIKES = 20;
    const MAX_LIKES = 30;

    for (const post of postsWithUserIds) {
      const shuffledIds = [...createdUsers.map(u => u._id)].sort(() => 0.5 - Math.random());
      const likeCount = MIN_LIKES + Math.floor(Math.random() * (MAX_LIKES - MIN_LIKES + 1));
      post.likes = shuffledIds.slice(0, Math.min(likeCount, createdUsers.length));
    }

    await Post.insertMany(postsWithUserIds);
    console.log(`📝 Inserted ${postsWithUserIds.length} posts with likes`);

    console.log("🎉 Seeding complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDB();

