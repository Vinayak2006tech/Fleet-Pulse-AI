import { inMemoryDB } from "../config/db.js";

/**
 * Socket.io Event Broker for Real-Time Telemetry & Dispatch
 * @param {import("socket.io").Server} io 
 */
export function setupSocketIO(io) {
  io.on("connection", (socket) => {
    console.log(`🔌 [Socket.io] Client connected: ${socket.id}`);

    // Join driver specific room
    socket.on("driver:join", ({ driverId }) => {
      if (driverId) {
        socket.join(`driver:${driverId}`);
        console.log(`📡 [Socket.io] Driver joined room: driver:${driverId}`);
      }
    });

    // Customer subscribes to live tracking for a specific order
    socket.on("order:subscribe", ({ orderId }) => {
      if (orderId) {
        socket.join(`order:${orderId}`);
        console.log(`📦 [Socket.io] Client subscribed to order:${orderId}`);
      }
    });

    // High frequency GPS location updates from Driver mobile device
    socket.on("driver:location_update", (payload) => {
      const { driverId, x, y, speedKmh, batteryFuel, heading } = payload;
      
      const driver = inMemoryDB.drivers.find(d => d.id === driverId);
      if (driver) {
        if (x !== undefined && y !== undefined) {
          driver.currentLocation.x = Number(x);
          driver.currentLocation.y = Number(y);
        }
        if (speedKmh !== undefined) driver.speedKmh = Number(speedKmh);
        if (batteryFuel !== undefined) driver.batteryFuel = Number(batteryFuel);
        driver.updatedAt = new Date().toISOString();

        // Broadcast to all dispatchers and active customers
        io.emit("telemetry:driver_update", {
          driverId,
          name: driver.name,
          vehicle: driver.vehicle,
          currentLocation: driver.currentLocation,
          speedKmh: driver.speedKmh,
          batteryFuel: driver.batteryFuel,
          status: driver.status,
          heading: heading || 0,
          timestamp: driver.updatedAt,
        });

        // Also broadcast to the specific order room if driver is on active assignment
        if (driver.assignedOrderId) {
          io.to(`order:${driver.assignedOrderId}`).emit("order:courier_position", {
            orderId: driver.assignedOrderId,
            currentLocation: driver.currentLocation,
            speedKmh: driver.speedKmh,
            estimatedEtaMin: Math.max(2, Math.round((100 - (driver.currentLocation.x || 50)) / 6)),
          });
        }
      }
    });

    // Order status progression
    socket.on("order:status_change", ({ orderId, status, progress }) => {
      const order = inMemoryDB.orders.find(o => o.id === orderId);
      if (order) {
        if (status) order.status = status;
        if (progress !== undefined) order.currentProgress = progress;

        io.emit("order:status_update", order);
        io.to(`order:${orderId}`).emit("order:status_update", order);
      }
    });

    socket.on("disconnect", () => {
      console.log(`🔌 [Socket.io] Client disconnected: ${socket.id}`);
    });
  });
}
