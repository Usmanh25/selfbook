// controllers/users.js
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

    if (!id || !friendId) {
      return res.status(400).json({ message: "User ID and Friend ID are required" });
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      console.info(`addRemoveFriend failed: user or friend not found (user: ${id}, friend: ${friendId})`);
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((fid) => fid.toString() !== friendId.toString());
      friend.friends = friend.friends.filter((fid) => fid.toString() !== id.toString());
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    // Return formatted friends list safely
    const friends = await Promise.all(
      user.friends.map(async (fid) => {
        try {
          const f = await User.findById(fid).lean();
          if (!f) return null;
          const { _id, firstName, lastName, occupation, location, picturePath } = f;
          return { _id, firstName, lastName, occupation, location, picturePath };
        } catch (err) {
          console.error(`Error fetching friend ${fid}:`, err);
          return null;
        }
      })
    );

    res.status(200).json(friends.filter(Boolean));
  } catch (err) {
    console.error("Error in addRemoveFriend:", err);
    res.status(500).json({ message: "Internal server error updating friends" });
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
    const { id } = req.params;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { picturePath: file.originalname },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error uploading profile image:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};