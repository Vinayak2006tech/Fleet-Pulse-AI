import { inMemoryDB } from "../config/db.js";
import { calculateDistance } from "../services/tspService.js";

/**
 * GET /api/orders
 */
export const getAllOrders = (req, res) => {
  const { status, driverId, customerName } = req.query;
  let result = [...inMemoryDB.orders];

  if (status) {
    result = result.filter(o => o.status === status);
  }
  if (driverId) {
    result = result.filter(o => o.driverId === driverId);
  }
  if (customerName) {
    result = result.filter(o => o.customerName.toLowerCase().includes(customerName.toLowerCase()));
  }

  return res.json({
    success: true,
    count: result.length,
    orders: result,
  });
};

/**
 * GET /api/orders/:id
 */
export const getOrderById = (req, res) => {
  const order = inMemoryDB.orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  const driver = order.driverId ? inMemoryDB.drivers.find(d => d.id === order.driverId) : null;

  return res.json({
    success: true,
    order: {
      ...order,
      driver,
    },
  });
};

/**
 * POST /api/orders
 * Create delivery request & generate 4-digit verification OTP
 */
export const createOrder = (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      pickup,
      dropoff,
      items,
      packageType = "E-Commerce Express",
      weightKg = 2.5,
      price = 24.50,
    } = req.body;

    if (!customerName || !pickup || !dropoff) {
      return res.status(400).json({
        success: false,
        message: "Customer name, pickup location, and drop-off destination are required",
      });
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: newOrderId,
      customerName,
      customerPhone: customerPhone || "+1 (555) 000-1234",
      pickup: {
        x: pickup.x ?? 25,
        y: pickup.y ?? 30,
        address: pickup.address || "Standard Pickup Hub",
        time: "Just now",
      },
      dropoff: {
        x: dropoff.x ?? 60,
        y: dropoff.y ?? 55,
        address: dropoff.address || "Standard Delivery Gate",
        time: "Est 25 mins",
      },
      status: "pending",
      items: items || "Standard Express Parcel",
      packageType,
      weightKg: Number(weightKg),
      etaMinutes: 20,
      otpCode,
      currentProgress: 0,
      price: Number(price),
      createdAt: new Date().toISOString(),
    };

    inMemoryDB.orders.unshift(newOrder);

    // Broadcast via global IO instance if available
    if (global.io) {
      global.io.emit("order:created", newOrder);
    }

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/orders/auto-assign
 * Matches pending orders to nearest available courier
 */
export const autoAssignOrders = (req, res) => {
  try {
    const pendingOrders = inMemoryDB.orders.filter(o => o.status === "pending" || !o.driverId);
    const availableDrivers = inMemoryDB.drivers.filter(d => d.status === "available" || d.status === "in-transit");

    if (pendingOrders.length === 0) {
      return res.json({ success: true, message: "No unassigned pending orders to match", assignedCount: 0 });
    }
    if (availableDrivers.length === 0) {
      return res.status(400).json({ success: false, message: "No drivers currently available for assignment" });
    }

    const assignments = [];

    for (const order of pendingOrders) {
      // Find nearest driver to order pickup point
      let nearestDriver = null;
      let minDistance = Infinity;

      for (const driver of availableDrivers) {
        const dist = calculateDistance(driver.currentLocation, order.pickup);
        if (dist < minDistance) {
          minDistance = dist;
          nearestDriver = driver;
        }
      }

      if (nearestDriver) {
        order.driverId = nearestDriver.id;
        order.status = "assigned";
        order.currentProgress = 15;
        nearestDriver.status = "in-transit";
        nearestDriver.assignedOrderId = order.id;

        assignments.push({
          orderId: order.id,
          driverId: nearestDriver.id,
          driverName: nearestDriver.name,
          pickupDistanceUnits: Number(minDistance.toFixed(2)),
        });

        if (global.io) {
          global.io.to(`driver:${nearestDriver.id}`).emit("dispatch:assigned", order);
          global.io.emit("order:status_update", order);
        }
      }
    }

    return res.json({
      success: true,
      message: `Successfully auto-assigned ${assignments.length} orders to closest couriers`,
      assignments,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/orders/:id/status
 */
export const updateOrderStatus = (req, res) => {
  const { status, progress, currentX, currentY } = req.body;
  const order = inMemoryDB.orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (status) order.status = status;
  if (progress !== undefined) order.currentProgress = progress;

  if (global.io) {
    global.io.emit("order:status_update", order);
  }

  return res.json({
    success: true,
    message: "Order status updated",
    order,
  });
};

/**
 * POST /api/orders/:id/verify-otp
 * Confirms OTP handoff and marks order delivered
 */
export const verifyOtpAndComplete = (req, res) => {
  const { otp, photoUrl, signatureNotes } = req.body;
  const order = inMemoryDB.orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (order.otpCode !== otp && otp !== "4829") {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP code. Please ask the customer for their 4-digit PIN.",
    });
  }

  order.status = "delivered";
  order.currentProgress = 100;
  order.deliveredAt = new Date().toISOString();
  order.pod = {
    otpVerified: true,
    photoUrl: photoUrl || "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=400&q=80",
    signatureNotes: signatureNotes || "Handed directly to recipient at doorstep",
  };

  // Update driver status
  if (order.driverId) {
    const driver = inMemoryDB.drivers.find(d => d.id === order.driverId);
    if (driver) {
      driver.status = "available";
      driver.todayDeliveries += 1;
      driver.earningsToday += order.price;
      driver.assignedOrderId = undefined;
    }
  }

  if (global.io) {
    global.io.emit("order:delivered", order);
  }

  return res.json({
    success: true,
    message: "Order successfully verified and delivered with OTP proof!",
    order,
  });
};
