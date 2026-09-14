import mongoose from "mongoose";

// Pre-seeded in-memory store for instant zero-config startup
export const inMemoryDB = {
  users: [
    {
      id: "USR-001",
      name: "Dispatcher Admin",
      email: "admin@fleetpulse.ai",
      passwordHash: "$2a$10$wN38zV5.4vX2J0X7VfTgeOxDqJqG4Y1A6o/fFkY/JqZkG/dE3V2G2", // password123
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: "USR-002",
      name: "Marcus Vance",
      email: "marcus.vance@fleetpulse.ai",
      passwordHash: "$2a$10$wN38zV5.4vX2J0X7VfTgeOxDqJqG4Y1A6o/fFkY/JqZkG/dE3V2G2",
      role: "driver",
      driverId: "DRV-101",
      createdAt: new Date().toISOString(),
    },
    {
      id: "USR-003",
      name: "BioGenix Diagnostics",
      email: "client@biogenix.com",
      passwordHash: "$2a$10$wN38zV5.4vX2J0X7VfTgeOxDqJqG4Y1A6o/fFkY/JqZkG/dE3V2G2",
      role: "customer",
      createdAt: new Date().toISOString(),
    }
  ],
  drivers: [
    {
      id: "DRV-101",
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      phone: "+1 (555) 349-8812",
      vehicle: "Ford E-Transit Van",
      plate: "CA-9X28",
      type: "van",
      status: "in-transit",
      currentLocation: { x: 38.2, y: 44.5, address: "Mission Bay Blvd, Sector 4" },
      assignedOrderId: "ORD-9482",
      rating: 4.95,
      batteryFuel: 78,
      speedKmh: 42,
      todayDeliveries: 14,
      earningsToday: 186.50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "DRV-102",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      phone: "+1 (555) 772-9104",
      vehicle: "Super73 Cargo E-Bike",
      plate: "BK-4421",
      type: "bike",
      status: "in-transit",
      currentLocation: { x: 62.0, y: 32.1, address: "Market St & 5th Ave" },
      assignedOrderId: "ORD-9485",
      rating: 4.88,
      batteryFuel: 91,
      speedKmh: 24,
      todayDeliveries: 19,
      earningsToday: 214.00,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "DRV-103",
      name: "Tariq Al-Mansoor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      phone: "+1 (555) 612-4439",
      vehicle: "Mercedes Sprinter Reefer",
      plate: "CA-7T99",
      type: "truck",
      status: "loading",
      currentLocation: { x: 22.0, y: 70.0, address: "Central Cold Logistics Hub" },
      assignedOrderId: "ORD-9489",
      rating: 4.92,
      batteryFuel: 64,
      speedKmh: 0,
      todayDeliveries: 8,
      earningsToday: 152.00,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "DRV-104",
      name: "Aaliyah Chen",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      phone: "+1 (555) 883-2019",
      vehicle: "Rivian EDV 700",
      plate: "CA-1R04",
      type: "van",
      status: "available",
      currentLocation: { x: 75.0, y: 68.0, address: "Potrero Hill Depot" },
      rating: 4.98,
      batteryFuel: 85,
      speedKmh: 0,
      todayDeliveries: 16,
      earningsToday: 220.00,
      updatedAt: new Date().toISOString(),
    }
  ],
  orders: [
    {
      id: "ORD-9482",
      customerName: "BioGenix Diagnostics",
      customerPhone: "+1 (555) 902-1201",
      pickup: { x: 18, y: 22, address: "BioCenter Lab 3, Embarcadero", time: "14:15" },
      dropoff: { x: 52, y: 58, address: "St. Jude Memorial Hospital", time: "14:45" },
      status: "in_transit",
      driverId: "DRV-101",
      items: "Cryo-vials (Temp controlled 2°C - 8°C)",
      packageType: "Pharmacy / Cold Chain",
      weightKg: 4.2,
      etaMinutes: 8,
      otpCode: "4829",
      currentProgress: 65,
      price: 38.50,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "ORD-9485",
      customerName: "GreenPulse Organics",
      customerPhone: "+1 (555) 441-9988",
      pickup: { x: 70, y: 20, address: "Union Square Dark Store", time: "14:20" },
      dropoff: { x: 55, y: 40, address: "742 Evergreen Terrace #4B", time: "14:38" },
      status: "in_transit",
      driverId: "DRV-102",
      items: "Artisan Breads & Organic Produce Box",
      packageType: "Fresh Grocery",
      weightKg: 6.8,
      etaMinutes: 4,
      otpCode: "7193",
      currentProgress: 82,
      price: 19.00,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: "ORD-9489",
      customerName: "Apex Precision Tools",
      customerPhone: "+1 (555) 303-7721",
      pickup: { x: 22, y: 70, address: "Central Cold Logistics Hub", time: "14:35" },
      dropoff: { x: 82, y: 80, address: "Precision Auto Works, Pier 70", time: "15:20" },
      status: "assigned",
      driverId: "DRV-103",
      items: "Hydraulic Pump Replacement Core",
      packageType: "Industrial Spare",
      weightKg: 28.5,
      etaMinutes: 28,
      otpCode: "6034",
      currentProgress: 15,
      price: 64.00,
      createdAt: new Date(Date.now() - 900000).toISOString(),
    }
  ],
  telemetryLogs: []
};

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("⚡ [Database] MONGODB_URI not set. Running in-memory database mode with pre-seeded fleet data.");
    return { isConnected: true, mode: "in-memory" };
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ [Database] MongoDB Connected: ${conn.connection.host}`);
    return { isConnected: true, mode: "mongodb" };
  } catch (err) {
    console.warn(`⚠️ [Database] MongoDB connection failed (${err.message}). Falling back to in-memory mode.`);
    return { isConnected: true, mode: "in-memory-fallback" };
  }
};
