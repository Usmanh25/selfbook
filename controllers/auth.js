import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined. Check your .env file.");
}


/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: picturePath || "default-image.jpg",
      friends: friends || [],
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: "7d" });
    const userObj = savedUser.toObject();
    delete userObj.password;

    res.status(201).json({ token, user: userObj });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN USER */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ token, user: userObj });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GUEST LOGIN */
export const loginGuest = async (req, res) => {
  try {
    // Find a dedicated guest account
    let guestUser = await User.findOne({ email: "guest@example.com" });

    // If not found, create it on the fly
    if (!guestUser) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash("guestpassword", salt);

      guestUser = await User.create({
        firstName: "Guest",
        lastName: "User",
        email: "guest@example.com",
        password: passwordHash,
        friends: [],
        location: "Nowhere",
        occupation: "Guest",
        viewedProfile: 0,
        impressions: 0,
      });
    }

    const token = jwt.sign({ id: guestUser._id }, JWT_SECRET, { expiresIn: "7d" });

    const userObj = guestUser.toObject();
    delete userObj.password;

    res.status(200).json({ token, user: userObj });
  } catch (err) {
    console.error("loginGuest error:", err);
    res.status(500).json({ error: err.message });
  }
};
