import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, requried: true },
  email: { type: String, unique: true, requried: true },
  password: { type: String, requried: true },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
    requried: true,
  },
  district: { type:String, requried: true },
  isVerified: { type: Boolean, default: true },
});

export default mongoose.model("user", userSchema);
