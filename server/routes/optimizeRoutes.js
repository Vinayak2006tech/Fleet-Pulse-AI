import { Router } from "express";
import { optimizeRoute } from "../controllers/optimizeController.js";

const router = Router();

router.post("/route", optimizeRoute);

export default router;
