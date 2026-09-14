import "dotenv/config";
import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import { setupSocketIO } from "./socket/socketHandler.js";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import optimizeRoutes from "./routes/optimizeRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5050;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

// Initialize Socket.io with CORS
const io = new SocketIOServer(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

// Expose global.io for controller emissions
global.io = io;

// Setup Socket.io event listeners
setupSocketIO(io);

// Middleware
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "FleetPulse Logistics Backend",
    version: "2.4.0",
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// REST API Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/optimize", optimizeRoutes);
app.use("/api/analytics", analyticsRoutes);

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../dist");

// Serve built frontend assets if present (for single-service deployment like Render)
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api") || req.originalUrl.startsWith("/socket.io")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Centralized 404 Handler for API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ [Server Error]:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Database & Server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 [FleetPulse Backend] Server running on http://localhost:${PORT}`);
    console.log(`📡 [Socket.io] Gateway active on ws://localhost:${PORT}`);
    console.log(`🔒 [Auth] JWT Role-based security active`);
    console.log(`⚡ [Optimizer] 2-Opt & Nearest-Neighbor TSP engine ready at /api/optimize/route`);
  });
});
