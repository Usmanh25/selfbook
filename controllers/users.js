// controllers/users.js
import Post from "../models/Post.js";
import User from "../models/User.js";

/* READ: Get a single user */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      console.warn("getUser called without id");
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id).lean(); // lean() returns a plain JS object

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

/* READ: Get all users */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.status(200).json(users || []);
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).json({ message: "Internal server error fetching all users" });
  }
};

/* READ: Get a user's friends */
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
    console.log("Friends resolved:", friends);

    res.status(200).json(friends.filter(Boolean)); // remove any nulls
  } catch (err) {
    console.error("Error in getUserFriends:", err);
    res.status(500).json({ message: "Internal server error fetching friends" });
  }
};

/* UPDATE: Add or remove a friend */

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    console.log(`[addRemoveFriend] Called with id=${id} and friendId=${friendId}`);

    // 1️⃣ Fetch both users
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      console.warn(`[addRemoveFriend] User or friend not found - user: ${!!user}, friend: ${!!friend}`);
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Check if friend already exists
    const isFriend = user.friends.some(f => f.toString() === friendId);

    console.log(`[addRemoveFriend] isFriend before update: ${isFriend}`);

    if (isFriend) {
      // Remove friend
      user.friends = user.friends.filter(f => f.toString() !== friendId);
      friend.friends = friend.friends.filter(f => f.toString() !== id);
      console.log(`[addRemoveFriend] Removed friendId=${friendId} from user and id=${id} from friend`);
    } else {
      // Add friend
      user.friends.push(friendId);
      friend.friends.push(id);
      console.log(`[addRemoveFriend] Added friendId=${friendId} to user and id=${id} to friend`);
    }

    // 3️⃣ Save both users
    await user.save();
    await friend.save();
    console.log("[addRemoveFriend] Saved both users");

    // 4️⃣ Populate updated friends with minimal fields for frontend
    const updatedUser = await User.findById(id)
      .populate({
        path: "friends",
        select: "_id firstName lastName occupation picturePath",
      });

    console.log("[addRemoveFriend] Updated user friends populated");

    // 5️⃣ Return updated friend list
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

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Option A: store only filename
    const imagePath = req.file.filename;

    // update the user’s profile image
    const user = await User.findByIdAndUpdate(
      userId,
      { picturePath: imagePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // cascade update for posts
    await Post.updateMany(
      { userId: user._id },
      { $set: { userPicturePath: imagePath } }
    );

    res.status(200).json(user);
  } catch (err) {
    console.error("Error uploading profile image:", err);
    res.status(500).json({ message: "Server error" });
  }
};
