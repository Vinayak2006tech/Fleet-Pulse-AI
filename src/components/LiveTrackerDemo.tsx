import React, { useState, useEffect } from "react";
import { Driver, Order, INITIAL_DRIVERS, INITIAL_ORDERS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Bike, 
  MapPin, 
  Navigation, 
  Battery, 
  Fuel, 
  Thermometer, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Send,
  UserCheck
} from "lucide-react";

export const LiveTrackerDemo: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedDriverId, setSelectedDriverId] = useState<string>("DRV-101");
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [logs, setLogs] = useState<{ id: string; time: string; text: string; type: "info" | "success" | "warn" }[]>([
    { id: "1", time: "14:24:02", text: "WebSocket connection established with Gateway #us-west-1", type: "info" },
    { id: "2", time: "14:24:15", text: "Marcus Vance (Ford E-Transit) GPS ping: 38.2, 44.5 [Speed: 42 km/h]", type: "info" },
    { id: "3", time: "14:24:28", text: "ORD-9482 Cold Chain sensor verified at 3.8°C (Normal)", type: "success" },
  ]);

  const selectedDriver = drivers.find(d => d.id === selectedDriverId) || drivers[0];
  const activeOrder = orders.find(o => o.driverId === selectedDriver.id);

  // Simulation tick for real-time movement
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setDrivers(prevDrivers => 
        prevDrivers.map(driver => {
          if (driver.status !== "in-transit") return driver;

          // Subtle jitter / directional movement towards target
          const dx = (Math.random() - 0.48) * 0.8;
          const dy = (Math.random() - 0.48) * 0.8;
          const newX = Math.min(90, Math.max(10, driver.currentLocation.x + dx));
          const newY = Math.min(90, Math.max(10, driver.currentLocation.y + dy));

          return {
            ...driver,
            currentLocation: {
              ...driver.currentLocation,
              x: Number(newX.toFixed(2)),
              y: Number(newY.toFixed(2)),
            },
            speedKmh: Math.max(15, Math.min(65, Math.round(driver.speedKmh + (Math.random() * 6 - 3)))),
          };
        })
      );

      // Random occasional telemetry log
      if (Math.random() > 0.65) {
        const timeStr = new Date().toTimeString().split(" ")[0];
        const randomEvents = [
          `Telemetry: ${selectedDriver.name} battery at ${selectedDriver.batteryFuel}%`,
          `Traffic update: Market St slow down, recalculated +1.2m ETA`,
          `GPS Beacon: 12 satellites locked, high accuracy mode (±1.5m)`,
          `Socket.io: Packet delivered in 14ms to Dispatch Dashboard`,
        ];
        const eventText = randomEvents[Math.floor(Math.random() * randomEvents.length)];
        setLogs(prev => [
          { id: Date.now().toString(), time: timeStr, text: eventText, type: "info" },
          ...prev.slice(0, 7)
        ]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulating, selectedDriver]);

  const handleSimulateDeliverySuccess = () => {
    if (!activeOrder) return;
    const timeStr = new Date().toTimeString().split(" ")[0];
    
    setOrders(prev => prev.map(o => o.id === activeOrder.id ? { ...o, status: "delivered", currentProgress: 100 } : o));
    setDrivers(prev => prev.map(d => d.id === selectedDriver.id ? { 
      ...d, 
      status: "available", 
      todayDeliveries: d.todayDeliveries + 1,
      earningsToday: d.earningsToday + activeOrder.price 
    } : d));

    setLogs(prev => [
      { id: Date.now().toString(), time: timeStr, text: `✅ ORDER ${activeOrder.id} DELIVERED! OTP ${activeOrder.otpCode} verified.`, type: "success" },
      ...prev.slice(0, 7)
    ]);
  };

  const handleAssignNewOrder = () => {
    const timeStr = new Date().toTimeString().split(" ")[0];
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: "Apex BioTech Labs",
      customerPhone: "+1 (555) 309-8800",
      pickup: { x: 30, y: 30, address: "Pacific Med Center", time: "Just now" },
      dropoff: { x: 70, y: 65, address: "Stanford Tech Hub", time: "Est 22m" },
      status: "in_transit",
      driverId: selectedDriver.id,
      items: "Urgent Medical Diagnostics & Reagents",
      packageType: "Pharmacy / Cold Chain",
      weightKg: 3.4,
      etaMinutes: 14,
      otpCode: `${Math.floor(1000 + Math.random() * 9000)}`,
      currentProgress: 20,
      price: 42.00,
    };

    setOrders(prev => [newOrder, ...prev]);
    setDrivers(prev => prev.map(d => d.id === selectedDriver.id ? { ...d, status: "in-transit", assignedOrderId: newOrder.id } : d));
    setLogs(prev => [
      { id: Date.now().toString(), time: timeStr, text: `🚀 New Order ${newOrder.id} auto-dispatched to ${selectedDriver.name} via nearest-neighbor matching.`, type: "info" },
      ...prev.slice(0, 7)
    ]);
  };

  return (
    <section id="live-tracker" className="py-20 bg-slate-50/70 relative overflow-hidden border-t border-b border-slate-200">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-2">
              <Radio className="h-4 w-4 animate-pulse text-blue-600" />
              Live Telemetry &amp; Dispatch Console
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real-Time Fleet Visibility &amp; GPS Telemetry
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl text-sm sm:text-base">
              Monitor your active vans, e-bikes, and cold-chain reefers with sub-second WebSocket updates. 
              Inspect driver location, battery levels, speed, and real-time package status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSimulating(!isSimulating)}
              className="gap-2 border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-slate-50"
            >
              {isSimulating ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-amber-500" />
                  <span>Pause Telemetry</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-blue-600" />
                  <span>Resume Telemetry</span>
                </>
              )}
            </Button>

            <Button
              variant="supabase"
              size="sm"
              onClick={handleAssignNewOrder}
              className="gap-1.5 shadow-md shadow-blue-500/20"
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>Simulate Auto-Dispatch</span>
            </Button>
          </div>
        </div>

        {/* Live Tracking Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Driver Fleet Selector Sidebar (3 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Couriers ({drivers.length})
              </span>
              <span className="text-[11px] text-blue-600 font-mono font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping" />
                Live Sync
              </span>
            </div>

            <div className="space-y-2.5">
              {drivers.map((driver) => {
                const isSelected = driver.id === selectedDriver.id;
                return (
                  <div
                    key={driver.id}
                    onClick={() => setSelectedDriverId(driver.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/70 border-blue-500/80 shadow-md ring-1 ring-blue-500/30"
                        : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50 shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={driver.avatar}
                            alt={driver.name}
                            className="h-10 w-10 rounded-full object-cover border border-slate-200"
                          />
                          <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                            driver.status === "in-transit" ? "bg-blue-600" :
                            driver.status === "available" ? "bg-emerald-500" : "bg-amber-500"
                          }`} />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm text-slate-900">{driver.name}</h4>
                            <span className="text-[10px] font-mono text-slate-500">{driver.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            {driver.type === "van" ? <Truck className="h-3 w-3 text-blue-600" /> : <Bike className="h-3 w-3 text-cyan-600" />}
                            <span>{driver.vehicle}</span>
                          </div>
                        </div>
                      </div>

                      <Badge 
                        variant={driver.status === "in-transit" ? "brand" : driver.status === "available" ? "success" : "warning"}
                        className="text-[10px] capitalize"
                      >
                        {driver.status.replace("-", " ")}
                      </Badge>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600 font-mono">
                      <div className="flex items-center gap-1">
                        <Battery className="h-3.5 w-3.5 text-blue-600" />
                        <span>{driver.batteryFuel}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="h-3.5 w-3.5 text-cyan-600" />
                        <span>{driver.speedKmh} km/h</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 font-semibold">
                        <span>★ {driver.rating}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* WebSocket Terminal Log Stream */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs font-mono shadow-md text-slate-100">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2 mb-2">
                <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <Radio className="h-3.5 w-3.5 text-blue-400" />
                  Socket.io Event Stream
                </span>
                <span className="text-blue-400 text-[10px] font-bold">Connected</span>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {logs.map(log => (
                  <div key={log.id} className="flex items-start gap-2 leading-tight">
                    <span className="text-slate-500 shrink-0 text-[10px]">{log.time}</span>
                    <span className={log.type === "success" ? "text-emerald-400" : log.type === "warn" ? "text-amber-400" : "text-slate-300"}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Simulation Map & Telemetry HUD (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Interactive Vector Map Canvas */}
            <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl border border-slate-300 bg-slate-950 overflow-hidden shadow-xl">
              
              {/* Map Grid and Urban Road Network Graphic */}
              <svg className="absolute inset-0 h-full w-full opacity-45" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  </pattern>
                  <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(37,99,235,0.18)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <rect width="100%" height="100%" fill="url(#mapGlow)" />
                
                {/* Arterial Highway Network */}
                <path d="M 50 0 Q 200 200 450 180 T 800 400" fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="3" strokeDasharray="6 4" />
                <path d="M 0 350 C 300 320 500 250 850 100" fill="none" stroke="rgba(14,165,233,0.4)" strokeWidth="3" />
                <path d="M 250 0 L 250 600" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <path d="M 600 0 L 600 600" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <path d="M 0 250 L 900 250" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              </svg>

              {/* Map Top HUD Bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 pointer-events-auto">
                  <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-xs font-mono text-white font-semibold">Bay Area Metro Dispatch #01</span>
                  <span className="text-[10px] text-slate-400 font-mono">LAT: 37.7749° N, LON: 122.4194° W</span>
                </div>

                <div className="hidden sm:flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-xs font-mono text-blue-300">
                  <span>GPS Satellites: 14 Active</span>
                </div>
              </div>

              {/* Fixed Hubs & Depots on the Map */}
              <div className="absolute top-[20%] left-[18%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group">
                <div className="h-6 w-6 rounded-lg bg-blue-500/30 border border-blue-400 flex items-center justify-center text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="mt-1 px-1.5 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-slate-200 whitespace-nowrap">
                  North Fulfillment Hub
                </span>
              </div>

              <div className="absolute top-[70%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group">
                <div className="h-6 w-6 rounded-lg bg-cyan-500/30 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="mt-1 px-1.5 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-slate-200 whitespace-nowrap">
                  Cold Logistics Hub
                </span>
              </div>

              <div className="absolute top-[60%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group">
                <div className="h-6 w-6 rounded-lg bg-indigo-500/30 border border-indigo-400 flex items-center justify-center text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.6)]">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="mt-1 px-1.5 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-slate-200 whitespace-nowrap">
                  East Bay Darkstore
                </span>
              </div>

              {/* Active Vehicle Markers */}
              {drivers.map(driver => {
                const isSelected = driver.id === selectedDriver.id;
                return (
                  <div
                    key={driver.id}
                    onClick={() => setSelectedDriverId(driver.id)}
                    style={{
                      left: `${driver.currentLocation.x}%`,
                      top: `${driver.currentLocation.y}%`,
                      transition: isSimulating ? "left 1.5s linear, top 1.5s linear" : "none",
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer flex flex-col items-center group`}
                  >
                    {/* Pulsing ring for selected driver */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full border-2 border-blue-400 animate-ping opacity-75" />
                    )}

                    <div className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-lg transition-transform ${
                      isSelected
                        ? "bg-blue-600 text-white border-white scale-125 shadow-[0_0_20px_rgba(37,99,235,0.9)]"
                        : "bg-slate-900 text-blue-400 border-blue-500/60 hover:scale-110"
                    }`}>
                      {driver.type === "van" ? (
                        <Truck className="h-4 w-4 font-bold" />
                      ) : driver.type === "bike" ? (
                        <Bike className="h-4 w-4 font-bold" />
                      ) : (
                        <Truck className="h-4 w-4 font-bold" />
                      )}
                    </div>

                    {/* Driver Mini Tag */}
                    <div className={`mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold whitespace-nowrap border shadow-md ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-300"
                        : "bg-black/90 text-white border-white/20"
                    }`}>
                      {driver.name.split(" ")[0]} ({driver.speedKmh} km/h)
                    </div>
                  </div>
                );
              })}

              {/* Map Bottom Status Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-slate-300 pointer-events-auto">
                  <span className="text-white font-mono font-semibold">Active Fleet:</span>
                  <span>{drivers.filter(d => d.status === "in-transit").length} Transit</span>
                  <span>&bull;</span>
                  <span>{drivers.filter(d => d.status === "available").length} Standby</span>
                </div>

                <div className="bg-blue-600/30 border border-blue-400 text-blue-200 text-xs font-mono px-3 py-1.5 rounded-lg backdrop-blur-md">
                  GPS Auto-Tracking Enabled
                </div>
              </div>

            </div>

            {/* Selected Vehicle Detailed Telemetry Card */}
            <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedDriver.avatar}
                    alt={selectedDriver.name}
                    className="h-12 w-12 rounded-xl object-cover border border-blue-200 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">{selectedDriver.name}</h3>
                      <Badge variant="brand" className="font-mono text-xs">
                        {selectedDriver.plate}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 text-blue-600" />
                      {selectedDriver.currentLocation.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeOrder && activeOrder.status !== "delivered" && (
                    <Button
                      variant="supabase"
                      size="sm"
                      onClick={handleSimulateDeliverySuccess}
                      className="gap-1.5 text-xs font-bold shadow-md shadow-blue-500/20"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                      Confirm OTP Delivery ({activeOrder.otpCode})
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert(`Calling ${selectedDriver.name}: ${selectedDriver.phone}`)}
                    className="gap-1.5 text-xs border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    <Phone className="h-3.5 w-3.5 text-blue-600" />
                    Call Courier
                  </Button>
                </div>
              </div>

              {/* Order Telemetry in Flight */}
              {activeOrder ? (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-mono block text-[11px] mb-1">Active Cargo &amp; SLA</span>
                    <p className="font-semibold text-slate-900">{activeOrder.items}</p>
                    <span className="inline-block mt-1 text-[10px] text-blue-600 font-mono font-medium">
                      {activeOrder.packageType} &bull; {activeOrder.weightKg} kg
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-mono block text-[11px] mb-1">Destination &amp; ETA</span>
                    <p className="font-semibold text-slate-900 truncate">{activeOrder.dropoff.address}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-blue-700 font-bold font-mono text-sm">{activeOrder.etaMinutes} min away</span>
                      <span className="text-slate-500">({activeOrder.currentProgress}% completed)</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-mono block text-[11px] mb-1">Security &amp; OTP Handoff</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold font-mono text-blue-600 tracking-wider">
                        {activeOrder.otpCode}
                      </span>
                      <Badge variant="outline" className="text-[10px] text-slate-600 border-slate-300 bg-white">
                        Customer PIN
                      </Badge>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Requires customer OTP before completion</span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center">
                  <p className="text-xs text-slate-600">
                    Driver is currently <span className="text-blue-600 font-semibold">Available</span> in standby zone. Click &quot;Simulate Auto-Dispatch&quot; to assign a new order.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
