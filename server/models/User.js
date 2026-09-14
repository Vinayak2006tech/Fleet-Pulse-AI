import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, sparse: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String },
  role: { type: String, enum: ["dispatcher", "driver", "customer", "admin"], default: "dispatcher" },
  avatar: { type: String },
  phone: { type: String },
  authProvider: { type: String, enum: ["google", "email", "demo"], default: "email" },
  driverId: { type: String },
  lastLogin: { type: Date, default: Date.now },
  loginCount: { type: Number, default: 1 },
}, {
  timestamps: true
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
