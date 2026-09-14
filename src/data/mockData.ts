export interface StreamHeroImage {
  src: string;
  alt: string;
  tag: string;
  title: string;
}

export const LOGISTICS_HERO_IMAGES: StreamHeroImage[] = [
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    alt: "Modern automated fulfillment warehouse with conveyor lines",
    tag: "Smart Hub",
    title: "AI Sorting Hubs",
  },
  {
    src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80",
    alt: "Fleet of electric delivery vans at charging station",
    tag: "EV Fleet",
    title: "Eco Fleet Routing",
  },
  {
    src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    alt: "Modern cargo freighter and port logistics terminal",
    tag: "Global Freight",
    title: "Multi-Modal Freight",
  },
  {
    src: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80",
    alt: "Delivery driver with handheld digital scanner confirming parcel",
    tag: "Last Mile",
    title: "Mobile Courier App",
  },
  {
    src: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
    alt: "Logistics control tower with real-time multi-screen telemetry",
    tag: "Dispatch AI",
    title: "Live Command Center",
  },
  {
    src: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80",
    alt: "Urban electric bike courier delivering medicine package",
    tag: "Micro-Hubs",
    title: "Hyperlocal Express",
  },
  {
    src: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
    alt: "Robotic automated guided vehicles in distribution center",
    tag: "Robotics",
    title: "Autonomous Hub AGVs",
  },
  {
    src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    alt: "Heavy freight truck driving across highway bridge at sunset",
    tag: "Long Haul",
    title: "Interstate Telemetry",
  },
  {
    src: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80",
    alt: "Delivery courier handing package to happy customer",
    tag: "Customer First",
    title: "OTP Proof of Delivery",
  },
];

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  vehicle: string;
  plate: string;
  type: "van" | "bike" | "truck";
  status: "in-transit" | "available" | "loading" | "offline";
  currentLocation: { x: number; y: number; address: string };
  assignedOrderId?: string;
  rating: number;
  batteryFuel: number;
  speedKmh: number;
  todayDeliveries: number;
  earningsToday: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  pickup: { x: number; y: number; address: string; time: string };
  dropoff: { x: number; y: number; address: string; time: string };
  status: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered";
  driverId?: string;
  items: string;
  packageType: "Pharmacy / Cold Chain" | "E-Commerce Express" | "Fresh Grocery" | "Industrial Spare";
  weightKg: number;
  etaMinutes: number;
  otpCode: string;
  currentProgress: number; // 0 to 100%
  price: number;
}

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: "DRV-101",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    phone: "+1 (555) 349-8812",
    vehicle: "Ford E-Transit Van",
    plate: "CA-9X28",
    type: "van",
    status: "in-transit",
    currentLocation: { x: 38, y: 44, address: "Mission Bay Blvd, Sector 4" },
    assignedOrderId: "ORD-9482",
    rating: 4.95,
    batteryFuel: 78,
    speedKmh: 42,
    todayDeliveries: 14,
    earningsToday: 186.50,
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
    currentLocation: { x: 62, y: 32, address: "Market St & 5th Ave" },
    assignedOrderId: "ORD-9485",
    rating: 4.88,
    batteryFuel: 91,
    speedKmh: 24,
    todayDeliveries: 19,
    earningsToday: 214.00,
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
    currentLocation: { x: 22, y: 70, address: "Central Cold Logistics Hub" },
    assignedOrderId: "ORD-9489",
    rating: 4.92,
    batteryFuel: 64,
    speedKmh: 0,
    todayDeliveries: 8,
    earningsToday: 152.00,
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
    currentLocation: { x: 75, y: 68, address: "Potrero Hill Depot" },
    rating: 4.98,
    batteryFuel: 85,
    speedKmh: 0,
    todayDeliveries: 16,
    earningsToday: 220.00,
  },
];

export const INITIAL_ORDERS: Order[] = [
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
  },
];

export interface RouteStop {
  id: string;
  name: string;
  address: string;
  x: number;
  y: number;
  type: "hub" | "delivery";
  packages: number;
  timeWindow: string;
}

export const SAMPLE_ROUTE_STOPS: RouteStop[] = [
  { id: "S0", name: "Central Hub Depot", address: "Dispatch Terminal Alpha", x: 15, y: 50, type: "hub", packages: 0, timeWindow: "08:00 AM" },
  { id: "S1", name: "North Pharmacy", address: "402 Sutter St", x: 28, y: 18, type: "delivery", packages: 3, timeWindow: "08:45 AM" },
  { id: "S2", name: "Embarcadero Tech Park", address: "Pier 9 Building C", x: 78, y: 22, type: "delivery", packages: 8, timeWindow: "09:30 AM" },
  { id: "S3", name: "Financial District Darkstore", address: "333 Montgomery St", x: 48, y: 35, type: "delivery", packages: 5, timeWindow: "10:15 AM" },
  { id: "S4", name: "SoMa Creative Lofts", address: "555 Howard St", x: 42, y: 62, type: "delivery", packages: 4, timeWindow: "11:00 AM" },
  { id: "S5", name: "Mission Med Center", address: "1001 Potrero Ave", x: 65, y: 75, type: "delivery", packages: 2, timeWindow: "11:40 AM" },
  { id: "S6", name: "Dogpatch Artisan Hub", address: "2200 3rd St", x: 85, y: 70, type: "delivery", packages: 6, timeWindow: "12:15 PM" },
  { id: "S7", name: "Castro Retail Collective", address: "400 Castro St", x: 25, y: 82, type: "delivery", packages: 4, timeWindow: "01:00 PM" },
];
