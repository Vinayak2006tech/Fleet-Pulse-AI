import React from "react";
import { 
  Radio, 
  Route, 
  Smartphone, 
  ShieldCheck, 
  Camera, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Zap,
  Lock,
  Layers,
  BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const FeatureGrid: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full bg-blue-500/5 blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-2">
            <Zap className="h-4 w-4 text-blue-600" />
            Next-Generation Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered for Modern Logistics &amp; Last-Mile Scale
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Every layer is built for sub-second synchronization, robust offline capability, and measurable operational cost reduction.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Real-time Telemetry (Large) */}
          <div className="md:col-span-2 glass-card rounded-2xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group relative overflow-hidden bg-white shadow-xs">
            <div className="absolute top-0 right-0 h-48 w-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
            
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-xs">
                <Radio className="h-6 w-6" />
              </div>
              <Badge variant="brand" className="font-mono">Sub-100ms Latency</Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Full-Duplex Real-Time Telemetry via Socket.io
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Continuous bidirectional location broadcasting between driver smartphones and the central dispatch console. 
              Supports automatic reconnection, packet deduplication, and low-bandwidth fallback in patchy cellular zones.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-3 gap-3 font-mono text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">THROUGHPUT</span>
                <span className="text-slate-900 font-bold">50k msg/sec</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">BATTERY IMPACT</span>
                <span className="text-blue-600 font-bold">&lt; 3% per 8h shift</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">GEOCODING</span>
                <span className="text-cyan-600 font-bold">±1.5m High-Precision</span>
              </div>
            </div>
          </div>

          {/* Card 2: Route Optimization */}
          <div className="glass-card rounded-2xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group relative overflow-hidden bg-white shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform mb-4 shadow-xs">
              <Route className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Dijkstra &amp; 2-Opt TSP Engine
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Algorithmic multi-stop route sequencing calculates shortest Hamiltonian paths in real-time, reducing fuel consumption by up to 34%.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-blue-600 font-medium">
              <span>Greedy Nearest Neighbor</span>
              <span>2-Opt Refinement</span>
            </div>
          </div>

          {/* Card 3: Mobile PWA Driver View */}
          <div className="glass-card rounded-2xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group bg-white shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform mb-4 shadow-xs">
              <Smartphone className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Cross-Platform Driver PWA
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Zero install friction. Progressive Web App running smoothly on Android and iOS with background GPS geolocation service workers.
            </p>
          </div>

          {/* Card 4: Cryptographic Proof of Delivery */}
          <div className="glass-card rounded-2xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group bg-white shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform mb-4 shadow-xs">
              <Camera className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              OTP &amp; Doorstep Photo POD
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Eliminate delivery disputes with two-factor 4-digit customer OTP verification, camera doorstep capture, and GPS-anchored timestamps.
            </p>
          </div>

          {/* Card 5: Fleet Health & Intelligence */}
          <div className="glass-card rounded-2xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group bg-white shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform mb-4 shadow-xs">
              <BarChart3 className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Fleet Analytics &amp; Fuel ROI
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Real-time dashboards breaking down vehicle maintenance schedules, driver safety scores, delayed order hotspots, and fuel economy.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
