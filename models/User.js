// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  picturePath: { type: String, default: "/assets/default-image.jpg" },
  location: { type: String, default: "" },
  occupation: { type: String, default: "" },
  friends: { type: Array, default: [] },
  viewedProfile: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
