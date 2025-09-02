// controllers/posts.js
import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    console.log("[createPost] req.user:", req.user);
    const description = req.body.description || req.body.postText || "";
    const picturePath = req.file ? req.file.filename : (req.body.picturePath || "");

    const userId = (req.user && (req.user.id || req.user._id)) || null;
    if (!userId) {
      console.warn("[createPost] No userId in req.user - user not authenticated");
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.warn("[createPost] user not found for id:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      userId: user._id,
      firstName: user.firstName, 
      lastName: user.lastName,
      description,
      picturePath,
      likes: [],
      comments: [],
    });

    await newPost.save();
    console.log("[createPost] saved post id:", newPost._id.toString(), "by user:", user._id.toString());

    // repopulate so frontend gets user info inline
    const populatedPost = await Post.findById(newPost._id)
      .populate("userId", "firstName lastName picturePath location");

    return res.status(201).json(populatedPost);
  } catch (err) {
    console.error("[createPost] Error:", err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

/* READ: all feed posts */
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

/* READ: posts by user */
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ userId })
      .populate("userId", "firstName lastName picturePath location")
      .sort({ createdAt: -1 });

    console.log(`[getUserPosts] userId param: ${userId} - found ${posts.length} posts`);
    return res.status(200).json(posts);
  } catch (err) {
    console.error("[getUserPosts] Error:", err);
    return res.status(500).json({ message: "Failed to fetch user posts" });
  }
};

/* LIKE/UNLIKE */
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

/* DELETE */
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
