// minimal-seed.js
import mongoose from "mongoose";
import User from "./models/User.js";
import Post from "./models/Post.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/selfbook";

await mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("✅ Connected to MongoDB");

const seedDB = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Post.deleteMany();
    console.log("🗑️ Cleared existing users and posts");

    // Hardcoded 3 users
    const usersData = [
      { firstName: "Alice", lastName: "Johnson", email: "alice@example.com", password: "password", picturePath: "alice.jpg" },
      { firstName: "Bob", lastName: "Smith", email: "bob@example.com", password: "password", picturePath: "bob.jpg" },
      { firstName: "Charlie", lastName: "Lee", email: "charlie@example.com", password: "password", picturePath: "charlie.jpg" },
    ];

    const createdUsers = [];
    for (const user of usersData) {
      const u = await User.create({ ...user, friends: [] });
      createdUsers.push(u);
    }

    console.log(`👤 Inserted ${createdUsers.length} users:`);
    createdUsers.forEach(u => console.log(u._id.toString(), u.firstName));

    // Create 2 posts per user (1 with picture, 1 without)
    const posts = [];
    for (const user of createdUsers) {
      posts.push(
        {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          location: "Somewhere",
          description: `Post with picture by ${user.firstName}`,
          picturePath: "sample.jpg",
          userPicturePath: user.picturePath,
        },
        {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          location: "Somewhere else",
          description: `Post without picture by ${user.firstName}`,
          picturePath: "",
          userPicturePath: user.picturePath,
        }
      );
    }

    const insertedPosts = await Post.insertMany(posts);
    console.log(`📝 Inserted ${insertedPosts.length} posts:`);
    insertedPosts.forEach(p => console.log(p._id.toString(), p.description));

    console.log("🎉 Minimal seeding complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
