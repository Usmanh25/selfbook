import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadToGridFS } from "../middleware/upload.js"; 

export const createPost = async (req, res) => {
  try {
    const description = req.body.description || req.body.postText || "";

    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: "User not authenticated" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let picturePath = ""; // default: no image

    if (req.file) {
      // Save file to GridFS and get the ObjectId string
      const fileId = await uploadToGridFS(req.file.buffer, req.file.originalname);
      picturePath = fileId.toString();
    }

    const newPost = new Post({
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      picturePath, // GridFS ObjectId if uploaded
      likes: [],
      comments: [],
    });

    await newPost.save();

    // Populate user info for frontend
    const populatedPost = await Post.findById(newPost._id)
      .populate("userId", "firstName lastName picturePath location");

    return res.status(201).json(populatedPost);

  } catch (err) {
    console.error("[createPost] Error:", err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "firstName lastName picturePath location")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error("[getFeedPosts] Error:", err);
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ userId })
      .populate("userId", "firstName lastName picturePath location")
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (err) {
    console.error("[getUserPosts] Error:", err);
    return res.status(500).json({ message: "Failed to fetch user posts" });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likes.some((l) => l.toString() === userId);
    if (isLiked) {
      post.likes = post.likes.filter((l) => l.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    const updatedPost = await Post.findById(id)
      .populate("userId", "firstName lastName picturePath location");

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error("[likePost] Error updating likes:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error("[deletePost] Error deleting post:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
