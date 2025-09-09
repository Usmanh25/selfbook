import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadToGridFS } from "../middleware/upload.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      console.warn("getUser called without id");
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id).lean(); 

    if (!user) {
      console.info(`User not found for id: ${id}`);
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error in getUser:", err);
    res.status(500).json({ message: "Internal server error fetching user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.status(200).json(users || []);
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).json({ message: "Internal server error fetching all users" });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      console.warn("getUserFriends called without id");
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id).lean();
    if (!user) {
      console.info(`User not found for id: ${id}`);
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(user.friends) || user.friends.length === 0) {
      return res.status(200).json([]); // empty array if no friends
    }

    const friends = await Promise.all(
      user.friends.map(async (friendId) => {
        try {
          const f = await User.findById(friendId).lean();
          if (!f) return null;
          const { _id, firstName, lastName, occupation, location, picturePath } = f;
          return { _id, firstName, lastName, occupation, location, picturePath };
        } catch (err) {
          console.error(`Error fetching friend ${friendId}:`, err);
          return null;
        }
      })
    );

    res.status(200).json(friends.filter(Boolean));
  } catch (err) {
    console.error("Error in getUserFriends:", err);
    res.status(500).json({ message: "Internal server error fetching friends" });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      console.warn(`[addRemoveFriend] User or friend not found - user: ${!!user}, friend: ${!!friend}`);
      return res.status(404).json({ message: "User not found" });
    }

    const isFriend = user.friends.some(f => f.toString() === friendId);

    if (isFriend) {
      // Remove friend
      user.friends = user.friends.filter(f => f.toString() !== friendId);
      friend.friends = friend.friends.filter(f => f.toString() !== id);
    } else {
      // Add friend
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    // Populate updated friends with minimal fields for frontend
    const updatedUser = await User.findById(id)
      .populate({
        path: "friends",
        select: "_id firstName lastName occupation picturePath",
      });


    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("[addRemoveFriend] Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, location, occupation } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, location, occupation },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload to GridFS
    const filename = Date.now() + "_" + (req.file.originalname || "profile.jpg");
    const fileId = await uploadToGridFS(req.file.buffer, filename);

    // Update user with GridFS ObjectId
    const user = await User.findByIdAndUpdate(
      userId,
      { picturePath: fileId.toString() },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update all posts with new user picture
    await Post.updateMany(
      { userId: user._id },
      { $set: { userPicturePath: fileId.toString() } }
    );

    res.status(200).json(user);
  } catch (err) {
    console.error("Error uploading profile image:", err);
    res.status(500).json({ message: "Server error" });
  }
};
