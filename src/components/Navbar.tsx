import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Activity, 
  Navigation, 
  Layers, 
  Cpu, 
  Calculator, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from "lucide-react";

interface NavbarProps {
  onSelectRole: (role: "admin" | "driver" | "customer") => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectRole, onScrollTo }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onScrollTo("home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-blue-600 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all">
            <Truck className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-900 text-lg">
                Fleet<span className="text-blue-600">Pulse</span>
              </span>
              <Badge variant="brand" className="text-[10px] px-1.5 py-0 h-4">
                AI Logistics
              </Badge>
            </div>
            <span className="text-[10px] text-muted-foreground hidden sm:inline font-medium">
              Smart Fleet & Delivery Management
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <button 
            onClick={() => onScrollTo("how-it-works")}
            className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="h-4 w-4 text-blue-600" />
            How It Works
          </button>

          <button 
            onClick={() => onScrollTo("live-tracker")}
            className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <Activity className="h-4 w-4 text-blue-600" />
            Live Tracker
          </button>

          <button 
            onClick={() => onScrollTo("route-optimizer")}
            className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <Navigation className="h-4 w-4 text-blue-600" />
            Route Optimizer
          </button>

          <button 
            onClick={() => onScrollTo("dashboards")}
            className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <Layers className="h-4 w-4 text-blue-600" />
            Multi-Role Portals
          </button>

          <button 
            onClick={() => onScrollTo("architecture")}
            className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <Cpu className="h-4 w-4 text-blue-600" />
            Architecture
          </button>

          <button 
            onClick={() => onScrollTo("roi-calc")}
            className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <Calculator className="h-4 w-4 text-blue-600" />
            ROI Engine
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-medium">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Socket.io Live</span>
          </div>

          <Button 
            variant="supabase"
            size="sm"
            onClick={() => onScrollTo("live-tracker")}
            className="gap-1.5 shadow-[0_0_15px_rgba(37,99,235,0.25)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Launch Live Demo</span>
          </Button>
        </div>

      </div>
    </header>
  );
};
