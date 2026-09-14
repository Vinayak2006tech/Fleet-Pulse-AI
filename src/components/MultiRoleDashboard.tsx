import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Smartphone, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Navigation, 
  Camera, 
  KeyRound, 
  Star, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Search,
  Plus
} from "lucide-react";

export const MultiRoleDashboard: React.FC = () => {
  const [activeRole, setActiveRole] = useState<string>("admin");
  
  // Driver Mobile State
  const [driverStatus, setDriverStatus] = useState<"picked_up" | "in_transit" | "delivered">("in_transit");
  const [podPhotoUploaded, setPodPhotoUploaded] = useState<boolean>(false);
  const [driverOtpInput, setDriverOtpInput] = useState<string>("");
  const [podSuccess, setPodSuccess] = useState<boolean>(false);

  // Customer Portal State
  const [customerRating, setCustomerRating] = useState<number>(5);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);

  // New Order State in Customer Portal
  const [pickupInput, setPickupInput] = useState<string>("Mission Bay Biotechnology Center, Lab 4");
  const [dropoffInput, setDropoffInput] = useState<string>("Presidio Heights Medical Clinic, Suite 200");
  const [orderCreatedToast, setOrderCreatedToast] = useState<boolean>(false);

  const handleVerifyPod = () => {
    if (driverOtpInput === "4829" || driverOtpInput.length >= 4) {
      setPodSuccess(true);
      setDriverStatus("delivered");
    } else {
      alert("Please enter the 4-digit customer OTP (e.g. 4829)");
    }
  };

  const handlePlaceCustomerOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCreatedToast(true);
    setTimeout(() => setOrderCreatedToast(false), 4000);
  };

  return (
    <section id="dashboards" className="py-20 bg-slate-50/70 relative overflow-hidden border-t border-b border-slate-200">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-2">
            <Users className="h-4 w-4 text-blue-600" />
            Full-Stack Role-Based Access Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Purpose-Built Portals for Every Stakeholder
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Seamless multi-role workflow. Experience the platform from the perspective of an Enterprise Dispatcher, a Field Driver on mobile, and a Customer tracking their parcel.
          </p>

          {/* Role Navigation Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-xl bg-white p-1.5 border border-slate-200 shadow-sm">
              <button
                onClick={() => setActiveRole("admin")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeRole === "admin"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Admin / Dispatch Control Tower</span>
              </button>

              <button
                onClick={() => setActiveRole("driver")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeRole === "driver"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Smartphone className="h-4 w-4" />
                <span>Driver / Rider Mobile App</span>
              </button>

              <button
                onClick={() => setActiveRole("customer")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeRole === "customer"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <MapPin className="h-4 w-4" />
                <span>Customer Live Tracking &amp; OTP</span>
              </button>
            </div>
          </div>
        </div>

        {/* ROLE 1: ADMIN / DISPATCH CONSOLE */}
        {activeRole === "admin" && (
          <div className="glass-card rounded-2xl border border-slate-200 p-6 shadow-xl bg-white animate-in fade-in-50 duration-300">
            
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900">Central Dispatch &amp; Operations Center</h3>
                  <Badge variant="brand">Enterprise Tier</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Autonomous order allocation engine &bull; Real-time driver telemetry &bull; Fleet maintenance tracker
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Button variant="outline" size="sm" className="text-xs text-slate-700 gap-1.5 border-slate-300 bg-white">
                  <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
                  Generate Fuel Audit
                </Button>
                <Button variant="supabase" size="sm" className="text-xs gap-1.5 font-bold shadow-md shadow-blue-500/20">
                  <Plus className="h-3.5 w-3.5 text-white" />
                  Auto-Assign Unallocated (14)
                </Button>
              </div>
            </div>

            {/* Admin Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-medium">
                  <span>ONGOING DELIVERIES</span>
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold font-mono text-slate-900 mt-1">42 <span className="text-xs font-sans text-blue-600 font-normal">In Transit</span></div>
                <div className="text-[11px] text-slate-500 mt-1">98.2% on schedule</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-medium">
                  <span>DISPATCH DELAY RISK</span>
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-amber-600 mt-1">2 <span className="text-xs font-sans text-slate-500 font-normal">Orders</span></div>
                <div className="text-[11px] text-amber-700 mt-1">Tendered to nearest courier</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-medium">
                  <span>DRIVER UTILIZATION</span>
                  <Users className="h-4 w-4 text-cyan-600" />
                </div>
                <div className="text-2xl font-bold font-mono text-cyan-700 mt-1">91.4%</div>
                <div className="text-[11px] text-slate-500 mt-1">18 Couriers Active</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-medium">
                  <span>TOTAL ESTIMATED SAVINGS</span>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold font-mono text-blue-600 mt-1">$4,820</div>
                <div className="text-[11px] text-slate-500 mt-1">This month vs enterprise tool</div>
              </div>
            </div>

            {/* Live Operations Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
                <span className="font-semibold text-slate-800">LIVE DISPATCH QUEUE</span>
                <span>Sorted by Priority &amp; SLA Time Window</span>
              </div>
              <div className="divide-y divide-slate-200 text-xs">
                
                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-mono font-bold">
                      01
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 font-mono">ORD-9482</span>
                        <Badge variant="brand" className="text-[10px]">Cold Chain (2°C)</Badge>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">BioGenix Labs → St. Jude Memorial Hospital</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-left sm:text-right">
                      <span className="text-slate-800 font-medium">Marcus Vance (Van)</span>
                      <p className="text-[10px] text-blue-600 font-mono font-medium">ETA: 8 mins &bull; 42 km/h</p>
                    </div>
                    <Badge variant="brand">In Transit</Badge>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 font-mono font-bold">
                      02
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 font-mono">ORD-9485</span>
                        <Badge variant="secondary" className="text-[10px]">Express Grocery</Badge>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">Union Square Dark Store → 742 Evergreen Terrace</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-left sm:text-right">
                      <span className="text-slate-800 font-medium">Elena Rostova (E-Bike)</span>
                      <p className="text-[10px] text-cyan-700 font-mono font-medium">ETA: 4 mins &bull; 24 km/h</p>
                    </div>
                    <Badge variant="brand">In Transit</Badge>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-mono font-bold">
                      03
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 font-mono">ORD-9489</span>
                        <Badge variant="warning" className="text-[10px]">Heavy Industrial</Badge>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">Central Hub → Precision Auto Works (28.5 kg)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-left sm:text-right">
                      <span className="text-slate-800 font-medium">Tariq Al-Mansoor (Sprinter)</span>
                      <p className="text-[10px] text-amber-700 font-mono font-medium">Status: Loading at Bay 4</p>
                    </div>
                    <Badge variant="warning">Loading</Badge>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ROLE 2: DRIVER / RIDER MOBILE VIEW */}
        {activeRole === "driver" && (
          <div className="max-w-md mx-auto">
            
            {/* Realistic Smartphone Frame */}
            <div className="rounded-[40px] border-4 border-slate-800 bg-slate-950 p-3 shadow-2xl">
              
              {/* Speaker & camera notch */}
              <div className="flex justify-center mb-2">
                <div className="h-4 w-32 rounded-full bg-slate-900" />
              </div>

              {/* Mobile Screen Area */}
              <div className="rounded-[32px] bg-slate-950 border border-slate-800 p-4 text-white min-h-[580px] flex flex-col justify-between">
                
                {/* Driver App Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                        alt="Marcus"
                        className="h-8 w-8 rounded-full object-cover border border-blue-500"
                      />
                      <div>
                        <h4 className="text-xs font-bold leading-none text-white">Marcus Vance</h4>
                        <span className="text-[10px] text-blue-400 font-mono font-medium">Ford E-Transit &bull; Online</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-blue-400">$186.50</span>
                      <p className="text-[9px] text-slate-400">14 Trips Today</p>
                    </div>
                  </div>

                  {/* Active Delivery Card */}
                  <div className="mt-4 rounded-xl border border-blue-500/40 bg-slate-900/90 p-3 shadow-lg">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <Badge variant="brand" className="text-[9px]">Active Stop #4</Badge>
                      <span className="text-[10px] font-mono text-slate-400">ORD-9482</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400">PICKUP COMPLETED</p>
                          <p className="text-xs font-semibold text-slate-200">BioCenter Lab 3, Embarcadero</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Navigation className="h-3.5 w-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-blue-400 font-bold">NEXT DROPOFF &bull; 8 MINS</p>
                          <p className="text-xs font-semibold text-white">St. Jude Memorial Hospital, Gate B</p>
                        </div>
                      </div>
                    </div>

                    {/* Turn-by-turn Navigation Simulation Bar */}
                    <div className="mt-3 p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-blue-300 font-medium">In 200m turn right on Mission St</span>
                      <Navigation className="h-4 w-4 text-blue-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Proof of Delivery (POD) Section */}
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs">
                    <h5 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                      <Camera className="h-3.5 w-3.5 text-blue-400" />
                      Proof of Delivery (POD) &amp; OTP
                    </h5>

                    {/* Photo Upload Simulation */}
                    <div 
                      onClick={() => setPodPhotoUploaded(!podPhotoUploaded)}
                      className={`p-3 rounded-lg border border-dashed cursor-pointer text-center transition-all ${
                        podPhotoUploaded 
                          ? "bg-blue-600/20 border-blue-500 text-blue-300"
                          : "bg-slate-950 border-slate-800 hover:border-blue-500/50 text-slate-400"
                      }`}
                    >
                      {podPhotoUploaded ? (
                        <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                          <CheckCircle2 className="h-4 w-4 text-blue-400" />
                          <span>Parcel Photo Captured &amp; Geotagged</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <Camera className="h-5 w-5 text-slate-400" />
                          <span className="text-[10px]">Tap to take doorstep photo</span>
                        </div>
                      )}
                    </div>

                    {/* Customer OTP Verification Input */}
                    <div className="mt-3">
                      <label className="text-[10px] text-slate-400 block mb-1">
                        Enter Customer 4-Digit OTP Code (Demo code: 4829)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={4}
                          value={driverOtpInput}
                          onChange={(e) => setDriverOtpInput(e.target.value)}
                          placeholder="4829"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-center tracking-widest text-sm font-bold text-white focus:outline-none focus:border-blue-500"
                        />
                        <Button 
                          variant="supabase" 
                          size="sm" 
                          onClick={handleVerifyPod}
                          className="text-xs font-bold shrink-0"
                        >
                          Verify &amp; Finish
                        </Button>
                      </div>
                    </div>

                    {podSuccess && (
                      <div className="mt-2.5 p-2 rounded-lg bg-blue-600/20 border border-blue-500 text-blue-300 text-center font-bold text-[11px] animate-bounce">
                        🎉 Delivery Completed! $38.50 credited.
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Bottom Navigation Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-around text-slate-400 text-[10px]">
                  <div className="flex flex-col items-center text-blue-400 font-bold">
                    <Navigation className="h-4 w-4" />
                    <span>Route</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="h-4 w-4" />
                    <span>History</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <DollarSign className="h-4 w-4" />
                    <span>Earnings</span>
                  </div>
                </div>

              </div>
            </div>
            
            <p className="text-center text-xs text-slate-500 mt-3">
              📱 PWA Driver App with offline storage &amp; automatic background GPS beacon sync.
            </p>

          </div>
        )}

        {/* ROLE 3: CUSTOMER LIVE TRACKING & PORTAL */}
        {activeRole === "customer" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Customer Live Tracking View (7 Cols) */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-blue-600 uppercase tracking-wider font-semibold">Live Customer Tracking</span>
                  <h3 className="text-xl font-bold text-slate-900">Your Delivery is on the Way</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Estimated Arrival</span>
                  <p className="text-lg font-bold font-mono text-blue-600">14:45 (8 mins)</p>
                </div>
              </div>

              {/* Visual Progress Stepper */}
              <div className="my-6">
                <div className="flex items-center justify-between relative mb-2">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-200 -z-0" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-3/4 bg-blue-600 -z-0 transition-all duration-500" />

                  <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shadow-sm">
                    ✓
                  </div>
                  <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shadow-sm">
                    ✓
                  </div>
                  <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs animate-pulse ring-4 ring-blue-500/20 shadow-md">
                    <Truck className="h-3.5 w-3.5" />
                  </div>
                  <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span className="text-blue-700 font-semibold">Order Placed</span>
                  <span className="text-blue-700 font-semibold">Picked Up</span>
                  <span className="text-slate-900 font-bold">In Transit</span>
                  <span>Delivered</span>
                </div>
              </div>

              {/* OTP Delivery Verification Card */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs text-blue-900 font-semibold block">Delivery Confirmation Code</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">Share this 4-digit OTP with your courier at the door</p>
                </div>
                <div className="text-2xl font-mono font-extrabold text-blue-700 tracking-widest bg-white px-4 py-2 rounded-lg border border-blue-300 shadow-sm">
                  4829
                </div>
              </div>

              {/* Courier Profile & Rating */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="Marcus"
                    className="h-11 w-11 rounded-full object-cover border border-blue-300 shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Marcus Vance</h4>
                    <p className="text-xs text-slate-500">Ford E-Transit &bull; CA-9X28</p>
                    <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5">
                      <span>★ 4.95 Rating</span>
                      <span className="text-slate-400">(1,420 deliveries)</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Star Rating */}
                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-[11px] text-slate-500 mb-1">Rate Courier Service:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setCustomerRating(star);
                          setRatingSubmitted(true);
                        }}
                        className={`text-lg transition-transform hover:scale-125 ${
                          star <= customerRating ? "text-amber-500" : "text-slate-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  {ratingSubmitted && (
                    <span className="text-[10px] text-blue-600 mt-1 font-semibold">
                      Thank you for rating {customerRating}/5!
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Place New Delivery Request Form (5 Cols) */}
            <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-xl">
              <div className="border-b border-slate-200 pb-3 mb-4">
                <span className="text-[10px] font-mono text-blue-600 uppercase tracking-wider font-semibold">Instant Request</span>
                <h3 className="text-lg font-bold text-slate-900">Place a New Delivery Request</h3>
              </div>

              <form onSubmit={handlePlaceCustomerOrder} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-600 font-medium block mb-1">Pickup Address</label>
                  <input
                    type="text"
                    value={pickupInput}
                    onChange={(e) => setPickupInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-medium block mb-1">Drop-off Destination</label>
                  <input
                    type="text"
                    value={dropoffInput}
                    onChange={(e) => setDropoffInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Package Category</label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-900 text-xs focus:outline-none focus:border-blue-500">
                      <option>Pharmacy / Cold Chain</option>
                      <option>E-Commerce Express</option>
                      <option>Fresh Grocery</option>
                      <option>Industrial Spare Part</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Delivery SLA</label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-900 text-xs focus:outline-none focus:border-blue-500">
                      <option>Rush Express (under 45m)</option>
                      <option>Same Day Window</option>
                      <option>Scheduled Next Day</option>
                    </select>
                  </div>
                </div>

                <Button variant="supabase" size="sm" type="submit" className="w-full mt-2 font-bold gap-2 shadow-md shadow-blue-500/20">
                  <Sparkles className="h-4 w-4 text-white" />
                  <span>Request Instant Courier Quote ($24.50)</span>
                </Button>

                {orderCreatedToast && (
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-center font-semibold text-xs animate-in fade-in-50">
                    🚀 Order requested! Matched to closest available Ford E-Transit in 3.2 seconds.
                  </div>
                )}
              </form>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
