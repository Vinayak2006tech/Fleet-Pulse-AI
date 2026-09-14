import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, TrendingUp, Sparkles, Check, ArrowRight, Shield } from "lucide-react";

export const RoiCalculator: React.FC = () => {
  const [fleetSize, setFleetSize] = useState<number>(20);
  const [deliveriesPerDay, setDeliveriesPerDay] = useState<number>(18);
  const [fuelPricePerLitre, setFuelPricePerLitre] = useState<number>(1.45);

  // Calculations
  const monthlyDeliveries = fleetSize * deliveriesPerDay * 26;
  const legacyEnterpriseToolCost = fleetSize * 85; // $85/driver/mo on enterprise tools
  const estimatedFuelSavedLiters = Math.round(monthlyDeliveries * 0.42); // liters saved via 2-opt
  const monthlyFuelSavings = Math.round(estimatedFuelSavedLiters * fuelPricePerLitre);
  const totalMonthlySavings = legacyEnterpriseToolCost + monthlyFuelSavings;
  const annualSavings = totalMonthlySavings * 12;

  return (
    <section id="roi-calc" className="py-20 bg-white relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/5 blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-2">
            <Calculator className="h-4 w-4 text-blue-600" />
            Fleet Economics &amp; ROI Simulator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Fleet&apos;s Monthly Savings
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            See how much your logistics business saves by eliminating enterprise license lock-in and running automated route optimization.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Slider Controls (7 Cols) */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 bg-white shadow-md space-y-6">
            
            {/* Control 1: Fleet Size */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-900">Active Delivery Fleet Size</label>
                <span className="text-lg font-bold font-mono text-blue-600">{fleetSize} Vehicles</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>5 Vans / E-Bikes</span>
                <span>50 Fleet</span>
                <span>100+ Enterprise</span>
              </div>
            </div>

            {/* Control 2: Deliveries per driver */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-900">Avg Deliveries per Driver / Day</label>
                <span className="text-lg font-bold font-mono text-blue-600">{deliveriesPerDay} Drops</span>
              </div>
              <input
                type="range"
                min="8"
                max="40"
                step="2"
                value={deliveriesPerDay}
                onChange={(e) => setDeliveriesPerDay(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>8 Drops (Pharma)</span>
                <span>20 Drops (Standard)</span>
                <span>40 Drops (Hyperlocal)</span>
              </div>
            </div>

            {/* Control 3: Fuel Price */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-900">Fuel / Energy Cost ($ / Litre or kWh)</label>
                <span className="text-lg font-bold font-mono text-blue-600">${fuelPricePerLitre.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.80"
                max="2.50"
                step="0.05"
                value={fuelPricePerLitre}
                onChange={(e) => setFuelPricePerLitre(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Feature Checkmarks */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span>Unlimited GPS tracking pings</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span>Instant 2-Opt TSP Optimizer</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span>Mobile PWA driver app</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span>Zero per-driver seat markup</span>
              </div>
            </div>

          </div>

          {/* Results Display Card (5 Cols) */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-8 border border-blue-200 bg-blue-50/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-700 text-xs font-mono font-medium mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Projected Operational ROI</span>
            </div>

            <span className="text-xs text-slate-500 uppercase font-mono block">Estimated Annual Savings</span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-blue-600 mt-1 drop-shadow-sm">
              ${annualSavings.toLocaleString()}
            </div>
            <span className="text-xs text-slate-600 mt-1 block">
              ~${totalMonthlySavings.toLocaleString()} saved each month
            </span>

            <div className="mt-6 pt-4 border-t border-blue-200/80 space-y-3 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Monthly Fuel Conserved:</span>
                <span className="text-slate-900 font-bold">{estimatedFuelSavedLiters.toLocaleString()} Liters</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Legacy Enterprise Tool Cost:</span>
                <span className="text-rose-600 line-through font-bold">${legacyEnterpriseToolCost.toLocaleString()} / mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Deliveries Processed:</span>
                <span className="text-blue-700 font-bold">{monthlyDeliveries.toLocaleString()} orders / mo</span>
              </div>
            </div>

            <Button
              variant="supabase"
              size="lg"
              onClick={() => {
                const el = document.getElementById("live-tracker");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full mt-6 gap-2 font-bold text-sm shadow-md shadow-blue-500/25"
            >
              <span>Test Live Dispatcher Console</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

          </div>

        </div>

      </div>
    </section>
  );
};
