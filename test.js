import mongoose from "mongoose";
import User from "./models/User.js";

mongoose.connect(process.env.MONGO_URL).then(async () => {
  const users = await User.find({}, "firstName picturePath");
  console.log(users);
  mongoose.disconnect();
});
