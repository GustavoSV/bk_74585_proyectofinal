import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String },
    date: { type: Date },
    city: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://cdn-icons-png.flaticon.com/512/266/266033.png" },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREM"], index: true },
    isVerified: { type: Boolean, default: false },
    verifyCode: { type: String }
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
