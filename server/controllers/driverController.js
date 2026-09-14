import { inMemoryDB } from "../config/db.js";

/**
 * GET /api/drivers
 */
export const getAllDrivers = (req, res) => {
  const { status, type } = req.query;
  let result = [...inMemoryDB.drivers];

  if (status) {
    result = result.filter(d => d.status === status);
  }
  if (type) {
    result = result.filter(d => d.type === type);
  }

  return res.json({
    success: true,
    count: result.length,
    drivers: result,
  });
};

/**
 * GET /api/drivers/:id
 */
export const getDriverById = (req, res) => {
  const driver = inMemoryDB.drivers.find(d => d.id === req.params.id);
  if (!driver) {
    return res.status(404).json({ success: false, message: "Driver not found" });
  }

  const activeOrder = driver.assignedOrderId
    ? inMemoryDB.orders.find(o => o.id === driver.assignedOrderId)
    : null;

  return res.json({
    success: true,
    driver: {
      ...driver,
      activeOrder,
    },
  });
};

/**
 * POST /api/drivers/:id/location
 * Ingest high-frequency GPS coordinate pings
 */
export const updateDriverLocation = (req, res) => {
  const { x, y, address, speedKmh, batteryFuel } = req.body;
  const driver = inMemoryDB.drivers.find(d => d.id === req.params.id);

  if (!driver) {
    return res.status(404).json({ success: false, message: "Driver not found" });
  }

  if (x !== undefined && y !== undefined) {
    driver.currentLocation.x = Number(x);
    driver.currentLocation.y = Number(y);
  }
  if (address) driver.currentLocation.address = address;
  if (speedKmh !== undefined) driver.speedKmh = Number(speedKmh);
  if (batteryFuel !== undefined) driver.batteryFuel = Number(batteryFuel);
  driver.updatedAt = new Date().toISOString();

  // Broadcast to Socket.io subscribers
  if (global.io) {
    global.io.emit("driver:location_ping", {
      driverId: driver.id,
      name: driver.name,
      vehicle: driver.vehicle,
      currentLocation: driver.currentLocation,
      speedKmh: driver.speedKmh,
      batteryFuel: driver.batteryFuel,
      status: driver.status,
      timestamp: driver.updatedAt,
    });
  }

  return res.json({
    success: true,
    message: "Driver location telemetry updated",
    driver,
  });
};

/**
 * GET /api/drivers/:id/earnings
 */
export const getDriverEarnings = (req, res) => {
  const driver = inMemoryDB.drivers.find(d => d.id === req.params.id);
  if (!driver) {
    return res.status(404).json({ success: false, message: "Driver not found" });
  }

  const completedOrders = inMemoryDB.orders.filter(
    o => o.driverId === driver.id && o.status === "delivered"
  );

  return res.json({
    success: true,
    driverId: driver.id,
    driverName: driver.name,
    todayEarnings: driver.earningsToday,
    todayDeliveries: driver.todayDeliveries,
    rating: driver.rating,
    completedHistory: completedOrders,
  });
};
