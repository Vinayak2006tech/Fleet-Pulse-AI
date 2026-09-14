import React, { useState } from "react";
import { 
  Cpu, 
  Layers, 
  Database, 
  Radio, 
  Server, 
  Layout, 
  Terminal, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Code2,
  GitBranch
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"diagram" | "code">("diagram");

  return (
    <section id="architecture" className="py-20 bg-slate-50/70 relative overflow-hidden border-t border-b border-slate-200">
      
      {/* Background accents */}
      <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-2">
            <Cpu className="h-4 w-4 text-blue-600" />
            Full-Stack Technical Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How the Real-Time &amp; Optimization Stack Operates
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Designed for high throughput, sub-second WebSocket synchronization, and scalable geospatial indexing.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex rounded-lg bg-white p-1 border border-slate-200 shadow-sm">
              <button
                onClick={() => setActiveTab("diagram")}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "diagram"
                    ? "bg-blue-600 text-white shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                System Architecture Flow
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "code"
                    ? "bg-blue-600 text-white shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                TSP Optimization Code Sample
              </button>
            </div>
          </div>
        </div>

        {activeTab === "diagram" ? (
          /* Architecture Diagram Grid */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch">
            
            {/* Layer 1: Client Frontends */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Layout className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] text-blue-700 border-blue-200 bg-blue-50">Client Layer</Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">React 18 + Tailwind</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dynamic single-page application with separate role-based routers:
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-700 font-mono">
                  <li className="flex items-center gap-1.5">
                    <span className="text-blue-600">▸</span> Dispatcher Dashboard (Admin)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-blue-600">▸</span> Mobile Driver PWA (GPS)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-blue-600">▸</span> Customer Live Map &amp; OTP
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
                shadcn UI &bull; TypeScript &bull; SVG Vectors
              </div>
            </div>

            {/* Layer 2: Real-time Gateway */}
            <div className="glass-card rounded-2xl p-6 border border-blue-300 bg-blue-50/40 flex flex-col justify-between shadow-md relative overflow-hidden">
              <div className="absolute -top-12 -right-12 h-28 w-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <Radio className="h-5 w-5" />
                  </div>
                  <Badge variant="brand" className="text-[10px]">Real-Time Bus</Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Socket.io Gateway</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-frequency WebSocket broker managing live coordinates:
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-800 font-mono">
                  <li className="flex items-center gap-1.5">
                    <span className="text-blue-600">▸</span> Sub-second GPS broadcasting
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-blue-600">▸</span> Rooms per active route ID
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-blue-600">▸</span> Instant order status events
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-blue-200 text-[11px] text-blue-700 font-mono font-semibold">
                JWT Authenticated &bull; Auto Reconnect
              </div>
            </div>

            {/* Layer 3: REST & Optimization Engine */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                    <Server className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] text-cyan-700 border-cyan-200 bg-cyan-50">Backend &amp; ML</Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Node.js + TSP Engine</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Express API server &amp; algorithmic routing compute:
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-700 font-mono">
                  <li className="flex items-center gap-1.5">
                    <span className="text-cyan-600">▸</span> Nearest-Neighbor Heuristic
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-cyan-600">▸</span> 2-Opt local search refinement
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-cyan-600">▸</span> Automated driver matching
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
                REST APIs &bull; Twilio &bull; Nodemailer
              </div>
            </div>

            {/* Layer 4: Database Layer */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <Database className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] text-indigo-700 border-indigo-200 bg-indigo-50">Persistence</Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">MongoDB Atlas</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Document store with spatial indexing and telemetry logs:
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-700 font-mono">
                  <li className="flex items-center gap-1.5">
                    <span className="text-indigo-600">▸</span> 2dsphere Geospatial indexes
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-indigo-600">▸</span> Orders, Drivers &amp; Vehicles
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-indigo-600">▸</span> Audit logs &amp; POD photos
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
                MongoDB Atlas &bull; Encrypted Storage
              </div>
            </div>

          </div>
        ) : (
          /* Code Snippet Tab */
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2 text-white">
                <Code2 className="h-4 w-4 text-blue-400" />
                algorithms/tspRouteOptimizer.ts
              </span>
              <span className="text-blue-400 font-semibold">TypeScript / Node.js</span>
            </div>

            <pre className="text-xs text-slate-200 font-mono overflow-x-auto leading-relaxed p-2">
{`/**
 * Traveling Salesperson Multi-Stop Route Optimizer
 * Combines Greedy Nearest-Neighbor with 2-Opt local search refinement.
 */
export function optimizeDeliveryRoute(depot: Waypoint, stops: Waypoint[]): Waypoint[] {
  if (stops.length <= 1) return [depot, ...stops, depot];

  // Step 1: Initial Greedy Nearest-Neighbor Tour
  const unvisited = [...stops];
  let current = depot;
  const tour: Waypoint[] = [depot];

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minDistance = calculateEuclidean(current, unvisited[0]);

    for (let i = 1; i < unvisited.length; i++) {
      const d = calculateEuclidean(current, unvisited[i]);
      if (d < minDistance) {
        minDistance = d;
        nearestIdx = i;
      }
    }
    current = unvisited.splice(nearestIdx, 1)[0];
    tour.push(current);
  }
  tour.push(depot); // Closed delivery circuit

  // Step 2: 2-Opt Heuristic to untangle crossing paths
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < tour.length - 2; i++) {
      for (let k = i + 1; k < tour.length - 1; k++) {
        const delta = calculate2OptGain(tour, i, k);
        if (delta < -1e-6) {
          reverseSegment(tour, i, k);
          improved = true;
        }
      }
    }
  }

  return tour;
}`}
            </pre>
          </div>
        )}

      </div>
    </section>
  );
};
