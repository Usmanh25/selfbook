import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

dotenv.config();
mongoose.set("strictQuery", false);

const MONGO_URL = process.env.MONGO_URL;

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log("🗑️ Cleared existing users and posts");

    // Insert regular users
    const createdUsers = await User.insertMany(users);
    console.log(`👤 Inserted ${createdUsers.length} users`);

    // Insert guest user if not already present
    const guestEmail = "guest@example.com";
    let guestUser = await User.findOne({ email: guestEmail });

    if (!guestUser) {
      const hashedPassword = await bcrypt.hash("guest123", 10);

      guestUser = new User({
        firstName: "Guest",
        lastName: "User",
        email: guestEmail,
        password: hashedPassword,
        picturePath: "",
        friends: [],
        location: "World",
        occupation: "Guest",
        viewedProfile: 0,
        impressions: 0,
      });

      await guestUser.save();
      console.log("👤 Guest user created successfully!");
    } else {
      console.log("👤 Guest user already exists");
    }

    // Map posts to real user _id and fix likes
    const postsWithUserIds = posts.map(post => {
      const user = createdUsers.find(u => u.username === post.username) || guestUser;

      // Convert likes to array of user IDs
      let likesArray = [];
      if (post.likes) {
        if (post.likes instanceof Map) {
          likesArray = Array.from(post.likes.keys());
        } else if (typeof post.likes === "object" && !Array.isArray(post.likes)) {
          likesArray = Object.keys(post.likes);
        } else if (Array.isArray(post.likes)) {
          likesArray = post.likes;
        }
      }

      return {
        ...post,
        userId: user._id,
        likes: likesArray,
      };
    });

    // Insert posts
    const createdPosts = await Post.insertMany(postsWithUserIds);
    console.log(`📝 Inserted ${createdPosts.length} posts`);

    console.log("🎉 Database seeding completed!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    mongoose.connection.close();
  }
};

seedDB();
