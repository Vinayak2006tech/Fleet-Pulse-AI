import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Route, 
  Radio, 
  Smartphone, 
  PackageCheck, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  CheckCircle2, 
  Users, 
  PlayCircle,
  FileText,
  MousePointerClick,
  TrendingDown,
  Lock
} from "lucide-react";

import { PageId } from "@/components/Sidebar";

interface StepDetail {
  step: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  metrics: { label: string; value: string }[];
  keyHighlights: string[];
  interactiveDemoTarget: PageId;
  interactiveDemoLabel: string;
  previewData: {
    title: string;
    items: { label: string; val: string; status?: "success" | "active" | "neutral" }[];
  };
}

const WORKFLOW_STEPS: StepDetail[] = [
  {
    step: "01",
    title: "Order Ingestion & Smart Clustering",
    badge: "Input Layer",
    tagline: "Orders ingested via API, Customer Portal, or Enterprise ERP",
    description:
      "Every delivery order is parsed for delivery SLA time windows, cargo category (pharma cold-chain, grocery, heavy parts), and exact geocoded coordinates. The platform automatically clusters pending stops by geographical density.",
    icon: FileText,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-200",
    metrics: [
      { label: "Geocoding Latency", value: "< 24ms" },
      { label: "Batch Ingestion", value: "10,000/sec" },
      { label: "Accuracy", value: "±1.5m GPS" },
    ],
    keyHighlights: [
      "Auto-detects cold chain requirements (2°C - 8°C)",
      "Validates addresses with automated fuzzy matching",
      "Assigns priority weighting based on promised customer SLA",
    ],
    interactiveDemoTarget: "portals",
    interactiveDemoLabel: "Try Customer Order Creation",
    previewData: {
      title: "Payload Ingest Sample",
      items: [
        { label: "Order ID", val: "ORD-9482", status: "neutral" },
        { label: "Cargo Type", val: "Pharma / Cold Chain (2°C)", status: "active" },
        { label: "SLA Window", val: "Under 45 mins (Express)", status: "active" },
        { label: "Cluster Zone", val: "San Francisco - Mission Bay", status: "success" },
      ],
    },
  },
  {
    step: "02",
    title: "Algorithmic Route Optimization",
    badge: "AI Compute",
    tagline: "NP-hard Traveling Salesperson Problem solved in milliseconds",
    description:
      "Our dual-stage optimization engine combines Greedy Nearest-Neighbor heuristics with 2-Opt local search refinement. It unknots crossing delivery paths into a smooth Hamiltonian circuit, cutting fleet distance by up to 34.8%.",
    icon: Route,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50 border-cyan-200",
    metrics: [
      { label: "Mileage Cut", value: "-34.8%" },
      { label: "Solve Time", value: "< 12ms" },
      { label: "Fuel Saved", value: "~420 L/mo" },
    ],
    keyHighlights: [
      "Eliminates wasteful criss-cross backtracking across city traffic",
      "Dynamic real-time rerouting when traffic or weather delays occur",
      "Reduces engine idle time and carbon footprint per stop",
    ],
    interactiveDemoTarget: "optimizer",
    interactiveDemoLabel: "Test 2-Opt Optimizer",
    previewData: {
      title: "Routing Engine Output",
      items: [
        { label: "Circuit Mode", val: "Closed Depot Return Loop", status: "neutral" },
        { label: "Optimized Legs", val: "7 Delivery Waypoints", status: "active" },
        { label: "Total Distance", val: "14.2 km (Saved 7.8 km)", status: "success" },
        { label: "Est. Fuel Burn", val: "1.7 L (-35% reduction)", status: "success" },
      ],
    },
  },
  {
    step: "03",
    title: "Real-Time Telemetry & Live Dispatch",
    badge: "Socket.io Engine",
    tagline: "Sub-second GPS vehicle broadcasting and driver navigation",
    description:
      "Orders are dispatched instantly to the nearest available driver's smartphone. Real-time GPS telemetry streams over WebSocket channels at 60 FPS, providing dispatchers with active fleet visibility and estimated arrival times.",
    icon: Radio,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-200",
    metrics: [
      { label: "WebSocket Sync", value: "Sub-100ms" },
      { label: "Telemetry Stream", value: "60 FPS" },
      { label: "Battery Usage", value: "< 3% / 8h" },
    ],
    keyHighlights: [
      "Full-duplex WebSocket communication between vans and central tower",
      "Driver PWA with turn-by-turn routing and offline queue fallback",
      "Dynamic speed, battery/fuel, and temperature sensor telemetry",
    ],
    interactiveDemoTarget: "tracker",
    interactiveDemoLabel: "Launch Live Tracker Simulator",
    previewData: {
      title: "Live Courier Telemetry",
      items: [
        { label: "Active Courier", val: "Marcus Vance (Ford E-Transit)", status: "neutral" },
        { label: "GPS Coordinates", val: "37.7749° N, 122.4194° W", status: "active" },
        { label: "Vehicle Speed", val: "42 km/h (Smooth Traffic)", status: "active" },
        { label: "Remaining ETA", val: "8 mins to St. Jude Hospital", status: "success" },
      ],
    },
  },
  {
    step: "04",
    title: "Cryptographic OTP Proof-of-Delivery",
    badge: "Security Layer",
    tagline: "Two-factor verification and dispute-proof handover",
    description:
      "When the driver arrives at the customer's doorstep, delivery completion requires entering the customer's secret 4-digit PIN code and capturing a geotagged photo. The ledger and customer portal reconcile instantly.",
    icon: PackageCheck,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50 border-indigo-200",
    metrics: [
      { label: "Dispute Rate", value: "0.02%" },
      { label: "Reconciliation", value: "Instant" },
      { label: "Customer SLA", value: "99.4%" },
    ],
    keyHighlights: [
      "4-digit OTP verified in real time before handover is marked complete",
      "Camera photo capture with embedded GPS metadata and timestamp",
      "Instant push notifications and rating submission for customer feedback",
    ],
    interactiveDemoTarget: "portals",
    interactiveDemoLabel: "Try OTP Verification Demo",
    previewData: {
      title: "Proof-of-Delivery Record",
      items: [
        { label: "Verification PIN", val: "OTP 4829 (Verified)", status: "success" },
        { label: "Photo Geotag", val: "Doorstep Photo Saved", status: "success" },
        { label: "Timestamp", val: "14:45:02 UTC", status: "neutral" },
        { label: "Driver Credit", val: "$38.50 Paid Instantly", status: "success" },
      ],
    },
  },
];

interface HowItWorksSectionProps {
  onSelectPage?: (page: PageId) => void;
  onScrollTo?: (id: string) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onSelectPage, onScrollTo }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = WORKFLOW_STEPS[activeStepIndex];

  const handleNavigate = (target: PageId, fallbackAnchor?: string) => {
    if (onSelectPage) {
      onSelectPage(target);
    } else if (onScrollTo && fallbackAnchor) {
      onScrollTo(fallbackAnchor);
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-slate-50/60 relative overflow-hidden border-b border-slate-200">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/5 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-2">
            <Zap className="h-4 w-4 text-blue-600" />
            Website Overview &bull; Platform Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How FleetPulse AI Works
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            FleetPulse AI replaces disorganized phone calls and spreadsheets with an automated, full-stack logistics engine. 
            Here is a brief step-by-step breakdown of how data travels from order placement to verified delivery handoff.
          </p>
        </div>

        {/* 4-Step Interactive Workflow Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Step Navigation List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                Workflow Sequence (Click to Inspect)
              </span>
              <span className="text-xs text-blue-600 font-medium">Step {activeStepIndex + 1} of 4</span>
            </div>

            {WORKFLOW_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const IconComp = step.icon;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white border-blue-500 shadow-md ring-1 ring-blue-500/30"
                      : "bg-white/80 border-slate-200 hover:bg-white hover:border-blue-300 shadow-xs"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                      isSelected 
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm" 
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}>
                      <IconComp className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold text-blue-600">
                          STEP {step.step} &bull; {step.badge}
                        </span>
                        {isSelected && (
                          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 truncate mt-0.5">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {step.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Step Interactive Deep-Dive (7 Cols) */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 bg-white shadow-xl">
            
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="brand" className="font-mono text-xs">
                    Phase {currentStep.step}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    {currentStep.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {currentStep.title}
                </h3>
              </div>

              <Button
                variant="supabase"
                size="sm"
                onClick={() => handleNavigate(currentStep.interactiveDemoTarget)}
                className="gap-1.5 font-bold shadow-md shadow-blue-500/20 text-xs shrink-0"
              >
                <span>{currentStep.interactiveDemoLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentStep.description}
            </p>

            {/* Key Technical Highlights */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-semibold text-slate-900 block font-mono">
                Key Platform Capabilities:
              </span>
              {currentStep.keyHighlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Metrics Row */}
            <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-3 gap-3">
              {currentStep.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">{metric.label}</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-blue-600 mt-0.5 block">{metric.value}</span>
                </div>
              ))}
            </div>

            {/* Live Data / Payload Box */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-3">
                <span className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-blue-600" />
                  {currentStep.previewData.title}
                </span>
                <span className="text-[10px] text-blue-600">Simulated State</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {currentStep.previewData.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-500 text-[11px]">{item.label}:</span>
                    <span className={`font-semibold text-[11px] ${
                      item.status === "success" ? "text-blue-600" :
                      item.status === "active" ? "text-cyan-700" : "text-slate-800"
                    }`}>
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Quick Demo Guide for Visitors */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6 sm:p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-700 mb-1">
                <MousePointerClick className="h-4 w-4 text-blue-600" />
                Interactive Site Guide
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                What Can You Test on This Demo Site?
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Zero Signup Required &bull; Fully Interactive
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div 
              onClick={() => handleNavigate("tracker", "live-tracker")}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                  1
                </div>
                <h4 className="font-bold text-sm text-slate-900">Live GPS Simulator</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click couriers, watch sub-second vector map movements, or trigger simulated auto-dispatching.
              </p>
              <div className="mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1">
                <span>Open Live Tracker Page</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

            <div 
              onClick={() => handleNavigate("optimizer", "route-optimizer")}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                  2
                </div>
                <h4 className="font-bold text-sm text-slate-900">2-Opt TSP Engine</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Toggle between &quot;Optimized Mode&quot; and &quot;Naive Sequence&quot; to see algorithms calculate 34% mileage savings.
              </p>
              <div className="mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1">
                <span>Open Optimizer Page</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

            <div 
              onClick={() => handleNavigate("portals", "dashboards")}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                  3
                </div>
                <h4 className="font-bold text-sm text-slate-900">3-Role Portals &amp; OTP</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Switch between Dispatch Tower, Driver Mobile PWA (enter PIN <span className="font-mono text-blue-700 font-bold">4829</span>), and Customer live tracking.
              </p>
              <div className="mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1">
                <span>Open Portals Page</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

            <div 
              onClick={() => handleNavigate("roi", "roi-calc")}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                  4
                </div>
                <h4 className="font-bold text-sm text-slate-900">Fleet ROI Simulator</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adjust fleet size and fuel price sliders to calculate projected monthly and annual operational savings.
              </p>
              <div className="mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1">
                <span>Open ROI Engine Page</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
