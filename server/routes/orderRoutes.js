import { Router } from "express";
import { 
  getAllOrders, 
  getOrderById, 
  createOrder, 
  autoAssignOrders, 
  updateOrderStatus, 
  verifyOtpAndComplete 
} from "../controllers/orderController.js";

const router = Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.post("/auto-assign", autoAssignOrders);
router.put("/:id/status", updateOrderStatus);
router.post("/:id/verify-otp", verifyOtpAndComplete);

export default router;
