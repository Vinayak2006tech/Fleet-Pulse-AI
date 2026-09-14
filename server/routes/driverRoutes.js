import { Router } from "express";
import { 
  getAllDrivers, 
  getDriverById, 
  updateDriverLocation, 
  getDriverEarnings 
} from "../controllers/driverController.js";

const router = Router();

router.get("/", getAllDrivers);
router.get("/:id", getDriverById);
router.post("/:id/location", updateDriverLocation);
router.get("/:id/earnings", getDriverEarnings);

export default router;
