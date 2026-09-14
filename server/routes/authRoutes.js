import { Router } from "express";
import { register, login, googleAuth, getLoginHistory, getProfile } from "../controllers/authController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/login-history", getLoginHistory);
router.get("/me", authenticateJWT, getProfile);

export default router;
