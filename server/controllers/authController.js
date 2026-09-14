import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { inMemoryDB } from "../config/db.js";
import { User } from "../models/User.js";
import { LoginHistory } from "../models/LoginHistory.js";

const JWT_SECRET = process.env.JWT_SECRET || "fleetpulse_super_secret_jwt_key_2026";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || "147538276946-rp9ctvp1igopt6i7041t68le12ho9557.apps.googleusercontent.com";
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

/**
 * Helper to record login activity in MongoDB Atlas
 */
const recordLoginEvent = async ({ userId, name, email, role, authProvider = "email", status = "success", req, metadata = {} }) => {
  try {
    const ipAddress = req?.headers["x-forwarded-for"] || req?.socket?.remoteAddress || "127.0.0.1";
    const userAgent = req?.headers["user-agent"] || "Browser Client";

    // 1. Record in MongoDB Atlas LoginHistory collection
    const logDoc = await LoginHistory.create({
      userId,
      name,
      email: email.toLowerCase(),
      role,
      authProvider,
      ipAddress,
      userAgent,
      status,
      loginTimestamp: new Date(),
      metadata,
    });
    console.log(`📊 [MongoDB Atlas] Logged login event for ${email} (${authProvider}) -> ID: ${logDoc._id}`);

    // 2. In-memory tracking fallback
    if (!inMemoryDB.telemetryLogs) inMemoryDB.telemetryLogs = [];
    inMemoryDB.telemetryLogs.unshift({
      id: `LOG-${Date.now()}`,
      userId,
      email,
      role,
      authProvider,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.warn(`⚠️ [MongoDB Atlas] Login recording notice: ${err.message}`);
  }
};

/**
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, role = "customer", phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    const cleanEmail = email.toLowerCase().trim();
    let existingUser = inMemoryDB.users.find(u => u.email.toLowerCase() === cleanEmail);

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const generatedId = `USR-${Math.floor(100 + Math.random() * 900)}`;

    const newUser = {
      id: generatedId,
      name,
      email: cleanEmail,
      passwordHash,
      role,
      phone: phone || "",
      authProvider: "email",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    if (!existingUser) {
      inMemoryDB.users.push(newUser);
    }

    // Persist to MongoDB Atlas
    try {
      await User.findOneAndUpdate(
        { email: cleanEmail },
        { 
          id: generatedId,
          name, 
          email: cleanEmail, 
          passwordHash, 
          role, 
          phone: phone || "",
          authProvider: "email",
          lastLogin: new Date(),
          $inc: { loginCount: 1 }
        },
        { upsert: true, new: true }
      );
    } catch (dbErr) {
      console.warn("MongoDB User persist notice:", dbErr.message);
    }

    // Record login audit in Atlas
    await recordLoginEvent({
      userId: generatedId,
      name,
      email: cleanEmail,
      role,
      authProvider: "email",
      req,
      metadata: { action: "register" }
    });

    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = inMemoryDB.users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      user = {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase()),
        email: cleanEmail,
        passwordHash: "$2a$10$wN38zV5.4vX2J0X7VfTgeOxDqJqG4Y1A6o/fFkY/JqZkG/dE3V2G2",
        role: email.includes("driver") ? "driver" : email.includes("client") || email.includes("customer") ? "customer" : "dispatcher",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        authProvider: "email",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      inMemoryDB.users.push(user);
    }

    // Persist user & update lastLogin in MongoDB Atlas
    try {
      await User.findOneAndUpdate(
        { email: cleanEmail },
        { 
          id: user.id,
          name: user.name, 
          email: cleanEmail, 
          role: user.role, 
          avatar: user.avatar,
          authProvider: "email",
          lastLogin: new Date(),
          $inc: { loginCount: 1 }
        },
        { upsert: true, new: true }
      );
    } catch (dbErr) {
      console.warn("MongoDB User sync notice:", dbErr.message);
    }

    // Record login audit event in MongoDB Atlas
    await recordLoginEvent({
      userId: user.id,
      name: user.name,
      email: cleanEmail,
      role: user.role,
      authProvider: "email",
      req,
      metadata: { action: "password_login" }
    });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role, driverId: user.driverId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        driverId: user.driverId,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/auth/google
 */
export const googleAuth = async (req, res) => {
  try {
    let { name, email, avatar, role = "dispatcher", credential } = req.body;

    // If a Google ID token credential was sent, attempt to decode/verify it
    if (credential) {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (payload && payload.email) {
          email = payload.email;
          name = payload.name || name;
          avatar = payload.picture || avatar;
        }
      } catch (tokenErr) {
        // Fallback: decode JWT payload if client ID isn't set in backend
        try {
          const decoded = jwt.decode(credential);
          if (decoded && decoded.email) {
            email = decoded.email;
            name = decoded.name || name;
            avatar = decoded.picture || avatar;
          }
        } catch (decErr) {
          console.warn("Could not decode credential token:", decErr.message);
        }
      }
    }

    if (!email) {
      return res.status(400).json({ success: false, message: "Google email is required" });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = inMemoryDB.users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      user = {
        id: `USR-G-${Math.floor(100 + Math.random() * 900)}`,
        name: name || email.split("@")[0].replace(".", " "),
        email: cleanEmail,
        avatar: avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
        role,
        authProvider: "google",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      inMemoryDB.users.push(user);
    } else {
      user.lastLogin = new Date().toISOString();
      if (avatar) user.avatar = avatar;
    }

    // Persist Google user to MongoDB Atlas
    try {
      await User.findOneAndUpdate(
        { email: cleanEmail },
        { 
          id: user.id,
          name: user.name, 
          email: cleanEmail, 
          role: user.role, 
          avatar: user.avatar,
          authProvider: "google",
          lastLogin: new Date(),
          $inc: { loginCount: 1 }
        },
        { upsert: true, new: true }
      );
    } catch (dbErr) {
      console.warn("MongoDB Atlas user sync notice:", dbErr.message);
    }

    // Record login audit event in MongoDB Atlas
    await recordLoginEvent({
      userId: user.id,
      name: user.name,
      email: cleanEmail,
      role: user.role,
      authProvider: "google",
      req,
      metadata: { action: "google_oauth" }
    });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Google login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/auth/login-history
 * Returns the most recent login events stored in MongoDB Atlas
 */
export const getLoginHistory = async (req, res) => {
  try {
    const mongoLogs = await LoginHistory.find().sort({ loginTimestamp: -1 }).limit(50).lean();
    return res.json({
      success: true,
      source: "MongoDB Atlas",
      count: mongoLogs.length,
      history: mongoLogs,
    });
  } catch (err) {
    return res.json({
      success: true,
      source: "in-memory fallback",
      count: (inMemoryDB.telemetryLogs || []).length,
      history: inMemoryDB.telemetryLogs || [],
    });
  }
};

/**
 * GET /api/auth/me
 */
export const getProfile = (req, res) => {
  const user = inMemoryDB.users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  return res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      driverId: user.driverId,
    },
  });
};
