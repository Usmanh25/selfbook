// controllers/posts.js
import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE: Create a new post */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    if (!userId) {
      console.warn("createPost called without userId");
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      console.info(`User not found for createPost: ${userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      userId,
      firstName: user.firstName || "Unknown",
      lastName: user.lastName || "",
      location: user.location || "Unknown",
      description: description || "",
      userPicturePath: user.picturePath || "",
      picturePath: picturePath || "",
      likes: {},
      comments: [],
    });

    await newPost.save();

    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    res.status(201).json(posts);
  } catch (err) {
    console.error("Error in createPost:", err);
    res.status(500).json({ message: "Internal server error creating post" });
  }
};

/* READ: Get all posts (feed) */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(posts || []);
  } catch (err) {
    console.error("Error in getFeedPosts:", err);
    res.status(500).json({ message: "Internal server error fetching feed posts" });
  }
};

/* READ: Get posts for a specific user */
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      console.warn("getUserPosts called without userId");
      return res.status(400).json({ message: "User ID is required" });
    }

    const posts = await Post.find({ userId }).sort({ createdAt: -1 }).lean();
    res.status(200).json(posts || []);
  } catch (err) {
    console.error("Error in getUserPosts:", err);
    res.status(500).json({ message: "Internal server error fetching user posts" });
  }
};

/* UPDATE: Like or unlike a post */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!id || !userId) {
      return res.status(400).json({ message: "Post ID and User ID are required" });
    }

    const post = await Post.findById(id);
    if (!post) {
      console.info(`Post not found for likePost: ${id}`);
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    ).lean();

    res.status(200).json(updatedPost || {});
  } catch (err) {
    console.error("Error in likePost:", err);
    res.status(500).json({ message: "Internal server error updating likes" });
  }
};
