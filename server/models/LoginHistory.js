import mongoose from "mongoose";

const loginHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  role: { type: String, default: "dispatcher" },
  authProvider: { type: String, enum: ["google", "email", "demo"], default: "email" },
  ipAddress: { type: String },
  userAgent: { type: String },
  status: { type: String, enum: ["success", "failed"], default: "success" },
  loginTimestamp: { type: Date, default: Date.now },
  metadata: { type: Object }
}, {
  timestamps: true
});

export const LoginHistory = mongoose.models.LoginHistory || mongoose.model("LoginHistory", loginHistorySchema);
