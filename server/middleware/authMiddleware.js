import jwt from "jsonwebtoken";
import { inMemoryDB } from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "fleetpulse_super_secret_jwt_key_2026";

/**
 * Verify JWT Bearer Token
 */
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired authorization token",
    });
  }
};

/**
 * Role-Based Access Control (RBAC) Guard
 * @param  {...string} allowedRoles - 'admin', 'driver', 'customer'
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: requires one of the following roles: [${allowedRoles.join(", ")}]`,
      });
    }
    next();
  };
};
