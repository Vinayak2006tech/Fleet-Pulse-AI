import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  ShieldCheck, 
  Truck, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Zap
} from "lucide-react";

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    authModalMode, 
    closeAuthModal, 
    login, 
    register 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">(authModalMode || "login");
  const [email, setEmail] = useState<string>("dispatcher@fleetpulse.io");
  const [password, setPassword] = useState<string>("password123");
  const [name, setName] = useState<string>("Alex Mercer");
  const [phone, setPhone] = useState<string>("+1 (555) 349-8812");
  const [role, setRole] = useState<"dispatcher" | "driver" | "customer">("dispatcher");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  useEffect(() => {
    if (authModalMode) {
      setActiveTab(authModalMode);
    }
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  const handlePresetRole = (presetRole: "dispatcher" | "driver" | "customer") => {
    setRole(presetRole);
    if (presetRole === "dispatcher") {
      setEmail("dispatcher@fleetpulse.io");
      setName("Alex Mercer");
    } else if (presetRole === "driver") {
      setEmail("driver.marcus@fleetpulse.io");
      setName("Marcus Vance");
    } else {
      setEmail("client.retail@fleetpulse.io");
      setName("Sarah Jenkins");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (activeTab === "login") {
      const res = await login(email, password);
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg("Signed in successfully!");
      } else {
        setErrorMsg(res.error || "Invalid email or password");
      }
    } else {
      const res = await register(name, email, password, role, phone);
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg("Account registered successfully in MongoDB Atlas!");
      } else {
        setErrorMsg(res.error || "Registration failed");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn overflow-y-auto max-h-screen py-8">
      
      {/* Backdrop */}
      <div 
        onClick={closeAuthModal}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200/90 bg-white/95 p-5 sm:p-6 shadow-2xl backdrop-blur-2xl transition-all my-auto">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 mb-2 shadow-inner">
            <Truck className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {activeTab === "login" ? "Sign in to FleetPulse AI" : "Create FleetPulse Account"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-xs mx-auto">
            Live MongoDB Atlas Cloud Storage &amp; Role-Based Access.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-3.5">
          <button
            type="button"
            onClick={() => { setActiveTab("login"); setErrorMsg(""); setSuccessMsg(""); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === "login"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("register"); setErrorMsg(""); setSuccessMsg(""); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === "register"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Role Demo Selector (for quick login switching) */}
        {activeTab === "login" && (
          <div className="mb-3.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Quick Role Demo
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handlePresetRole("dispatcher")}
                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                  email.includes("dispatcher")
                    ? "border-blue-500 bg-blue-50/80 text-blue-700 font-bold"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5 mx-auto mb-0.5 text-blue-600" />
                <span className="text-[10px] block">Dispatcher</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetRole("driver")}
                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                  email.includes("driver")
                    ? "border-emerald-500 bg-emerald-50/80 text-emerald-700 font-bold"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Truck className="h-3.5 w-3.5 mx-auto mb-0.5 text-emerald-600" />
                <span className="text-[10px] block">Courier</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetRole("customer")}
                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                  email.includes("client") || email.includes("customer")
                    ? "border-purple-500 bg-purple-50/80 text-purple-700 font-bold"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5 mx-auto mb-0.5 text-purple-600" />
                <span className="text-[10px] block">Client</span>
              </button>
            </div>
          </div>
        )}

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mb-3 flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs animate-fadeIn">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-3 flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Register: Name & Phone & Role */}
          {activeTab === "register" && (
            <>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <UserIcon className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 349-8812"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Select Role &amp; Workspace
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setRole("dispatcher")}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      role === "dispatcher"
                        ? "border-blue-500 bg-blue-50/80 text-blue-700 font-bold"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <ShieldCheck className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                    <span className="text-[10px] block">Dispatcher</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("driver")}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      role === "driver"
                        ? "border-emerald-500 bg-emerald-50/80 text-emerald-700 font-bold"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Truck className="h-4 w-4 mx-auto mb-1 text-emerald-600" />
                    <span className="text-[10px] block">Courier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("customer")}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      role === "customer"
                        ? "border-purple-500 bg-purple-50/80 text-purple-700 font-bold"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                    <span className="text-[10px] block">Client</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-700">
                Password
              </label>
              {activeTab === "login" && (
                <span className="text-[10px] text-slate-400 font-mono">Demo: password123</span>
              )}
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="supabase"
            disabled={isLoading}
            className="w-full mt-3 h-10 text-xs font-bold gap-2 shadow-md cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Processing...
              </span>
            ) : (
              <>
                <span>{activeTab === "login" ? "Sign In to Control Center" : "Create Account"}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

        </form>

        {/* MongoDB Cloud Storage Badge */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            MongoDB Atlas Connected
          </span>
          <span>SSL 256-bit Encrypted</span>
        </div>

      </div>
    </div>
  );
};


