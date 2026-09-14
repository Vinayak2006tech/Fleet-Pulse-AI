import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { renderCanvas, CanvasBackground } from "@/components/ui/canvas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LOGISTICS_HERO_IMAGES } from "@/data/mockData";
import { 
  Truck, 
  Navigation, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Radio, 
  Sparkles,
  TrendingDown,
  Clock,
  Gauge
} from "lucide-react";

import { PageId } from "@/components/Sidebar";

interface HeroSectionProps {
  onExploreTracker?: () => void;
  onExploreOptimizer?: () => void;
  onExploreRoles?: () => void;
  onExploreHowItWorks?: () => void;
  onSelectPage?: (page: PageId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTracker,
  onExploreOptimizer,
  onExploreRoles,
  onExploreHowItWorks,
  onSelectPage,
}) => {
  const { requireAuth } = useAuth();

  useEffect(() => {
    renderCanvas();
  }, []);

  const handleGoTracker = () => {
    requireAuth(() => {
      if (onSelectPage) onSelectPage("tracker");
      else if (onExploreTracker) onExploreTracker();
    });
  };

  const handleGoOptimizer = () => {
    requireAuth(() => {
      if (onSelectPage) onSelectPage("optimizer");
      else if (onExploreOptimizer) onExploreOptimizer();
    });
  };

  const handleGoRoles = () => {
    requireAuth(() => {
      if (onSelectPage) onSelectPage("portals");
      else if (onExploreRoles) onExploreRoles();
    });
  };

  const handleGoHowItWorks = () => {
    if (onExploreHowItWorks) onExploreHowItWorks();
  };


  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col items-center justify-between overflow-hidden pt-8 pb-16 bg-white/50 backdrop-blur-xs">
      
      {/* Interactive Ribbon Canvas Background */}
      <CanvasBackground />

      {/* Radial Gradient Glow Underlay */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/10 blur-[120px] -z-10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Top Announcement Pill */}
        <div 
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/95 px-4 py-1.5 text-xs text-blue-700 shadow-sm backdrop-blur-md mb-6 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
          onClick={handleGoHowItWorks}
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-semibold text-slate-900">FleetPulse AI Overview</span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 text-blue-600 font-medium">
            See How the Platform Works in Brief
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] max-w-5xl">
          Intelligent Fleet &amp; Last-Mile Delivery{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
            Powered by Real-Time Telemetry
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Replace disjointed phone calls and messy chat groups with an automated, purpose-built logistics stack.
          Real-time GPS tracking via WebSockets, AI route optimization, digital OTP proof-of-delivery, and instant dispatching for growing enterprises.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button 
            variant="supabase" 
            size="lg" 
            onClick={handleGoTracker}
            className="gap-2 text-base font-bold px-8 h-12 shadow-[0_0_25px_rgba(37,99,235,0.35)]"
          >
            <Radio className="h-5 w-5 animate-pulse text-white" />
            Live Dispatch Simulator
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleGoOptimizer}
            className="gap-2 h-12 border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50/50 text-slate-800 shadow-sm"
          >
            <Navigation className="h-4 w-4 text-blue-600" />
            Test Route Optimizer
          </Button>

          <Button 
            variant="ghost" 
            size="lg" 
            onClick={handleGoRoles}
            className="gap-2 h-12 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
          >
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Multi-Role Portals
          </Button>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          <div className="glass-card rounded-xl p-4 border border-slate-200 text-left hover:border-blue-400 hover:shadow-md transition-all group bg-white">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Fleet</span>
              <Truck className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">148 <span className="text-xs font-normal text-blue-600 font-sans">Units</span></div>
            <p className="text-[11px] text-slate-500 mt-0.5">Real-time GPS online</p>
          </div>

          <div className="glass-card rounded-xl p-4 border border-slate-200 text-left hover:border-blue-400 hover:shadow-md transition-all group bg-white">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Route Savings</span>
              <TrendingDown className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-blue-600 font-mono">-34.8%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Distance &amp; fuel reduction</p>
          </div>

          <div className="glass-card rounded-xl p-4 border border-slate-200 text-left hover:border-blue-400 hover:shadow-md transition-all group bg-white">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Average ETA</span>
              <Clock className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">16.4 <span className="text-xs font-normal text-blue-600 font-sans">min</span></div>
            <p className="text-[11px] text-slate-500 mt-0.5">Dynamic traffic recalculation</p>
          </div>

          <div className="glass-card rounded-xl p-4 border border-slate-200 text-left hover:border-blue-400 hover:shadow-md transition-all group bg-white">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">SLA Delivery</span>
              <Gauge className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">99.4%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">OTP verified handoffs</p>
          </div>
        </div>

      </div>

      {/* 3D Flying Corridor - ImageStreamHero Integration */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-4 shadow-xl shadow-slate-200/60">
          <div className="absolute -top-3 left-6 z-20">
            <Badge variant="brand" className="text-xs px-3 py-1 font-mono uppercase tracking-wider shadow-sm">
              3D Telemetry Rail &bull; Live Supply Chain Stream
            </Badge>
          </div>

          <ImageStreamHero
            images={LOGISTICS_HERO_IMAGES}
            speed={20}
            cards={10}
            className="h-[440px] sm:h-[500px] w-full rounded-xl border border-slate-200 bg-slate-950"
          >
            <div className="relative z-10 flex h-full flex-col items-center justify-between py-8 text-center pointer-events-none">
              <div className="px-6">
                <span className="inline-block rounded-full bg-black/60 px-3 py-1 text-xs font-mono text-blue-400 border border-blue-500/30 backdrop-blur-md mb-2">
                  Unified Hardware &amp; Vehicle Telematics
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md">
                  Autonomous Multi-Stop Corridor
                </h3>
              </div>
              
              <div className="pointer-events-auto flex items-center gap-3 bg-black/80 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                <p className="text-xs text-slate-200 font-medium">
                  Streaming GPS feeds from <span className="text-blue-400 font-bold font-mono">1,400+</span> delivery nodes
                </p>
              </div>
            </div>
          </ImageStreamHero>
        </div>
      </div>

    </section>
  );
};
