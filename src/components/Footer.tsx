import React from "react";
import { Truck, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageId } from "@/components/Sidebar";

interface FooterProps {
  onSelectPage?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage }) => {
  const navItems: { id: PageId; label: string }[] = [
    { id: "home", label: "Overview & Intro" },
    { id: "tracker", label: "Live GPS Tracker" },
    { id: "optimizer", label: "Route Optimizer" },
    { id: "portals", label: "Multi-Role Portals" },
    { id: "architecture", label: "Architecture & Stack" },
    { id: "roi", label: "ROI Calculator" },
    { id: "features", label: "All Features" },
  ];

  const handleNav = (id: PageId) => {
    if (onSelectPage) {
      onSelectPage(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50/90 py-12 text-xs text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Quick Page Jump Bar */}
        <div className="mb-10 pb-8 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono font-semibold uppercase text-slate-400">
            Quick Navigation:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-xs transition-all text-xs font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => handleNav("home")}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-blue-600 cursor-pointer hover:scale-105 transition-transform"
            >
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base tracking-tight">
                  Fleet<span className="text-blue-600">Pulse</span> AI
                </span>
                <Badge variant="brand" className="text-[10px] py-0">v2.4 Enterprise</Badge>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Intelligent Fleet &amp; Delivery Management Platform
              </p>
            </div>
          </div>

          {/* System Status Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-slate-700 font-mono text-[11px] font-medium">All Systems Operational &bull; 99.98% SLA</span>
          </div>

          {/* Stack summary */}
          <div className="text-center md:text-right text-[11px]">
            <p className="text-slate-700 font-medium">
              React 18 &bull; Tailwind CSS &bull; Socket.io &bull; TSP 2-Opt
            </p>
            <p className="text-slate-400 mt-1">
              Engineered with Enterprise Cloud Aesthetics
            </p>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} FleetPulse Logistics Systems Inc. All rights reserved.</span>
          <span className="font-mono text-blue-600 font-medium">Designed for Smart Supply Chain &amp; Last-Mile Excellence</span>
        </div>
      </div>
    </footer>
  );
};
