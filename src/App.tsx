import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { Sidebar, PageId } from "@/components/Sidebar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { LiveTrackerDemo } from "@/components/LiveTrackerDemo";
import { RouteOptimizerVisualizer } from "@/components/RouteOptimizerVisualizer";
import { MultiRoleDashboard } from "@/components/MultiRoleDashboard";
import { FeatureGrid } from "@/components/FeatureGrid";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { RoiCalculator } from "@/components/RoiCalculator";
import { Footer } from "@/components/Footer";
import { Aurora } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  ChevronRight, 
  Home, 
  Activity, 
  Route, 
  Users, 
  Cpu, 
  Calculator, 
  Zap, 
  Radio,
  SlidersHorizontal,
  Layers,
  ArrowUp,
  LogIn,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Truck,
  ShoppingBag
} from "lucide-react";

const PAGE_META: Record<PageId, { title: string; subtitle: string; icon: React.ElementType }> = {
  home: {
    title: "Overview & Introduction",
    subtitle: "Platform introduction, 3D telemetry corridor, and 4-phase system working",
    icon: Home,
  },
  tracker: {
    title: "Live GPS Telemetry",
    subtitle: "Sub-second vehicle tracking, vector map radar, and live dispatch simulator",
    icon: Activity,
  },
  optimizer: {
    title: "AI Route Optimizer",
    subtitle: "NP-Hard TSP 2-Opt algorithm solver & interactive waypoint untangler",
    icon: Route,
  },
  portals: {
    title: "Multi-Role Portals",
    subtitle: "Unified interfaces for Dispatcher Tower, Driver Mobile PWA (PIN 4829), and Customer",
    icon: Users,
  },
  architecture: {
    title: "System Architecture",
    subtitle: "Full-stack WebSocket pipeline, geospatial quadtrees, and TypeScript code",
    icon: Cpu,
  },
  roi: {
    title: "Fleet ROI Engine",
    subtitle: "Interactive financial calculator for mileage reduction and operational savings",
    icon: Calculator,
  },
  features: {
    title: "All Platform Features",
    subtitle: "Comprehensive bento grid of capabilities, security, and hardware integrations",
    icon: Zap,
  },
};

export function App() {
  const { user, isAuthenticated, openAuthModal, logout, requireAuth } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Keyboard shortcut (Cmd/Ctrl + B) to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as PageId;
      if (hash && PAGE_META[hash]) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectPage = (page: PageId) => {
    // If not home, prompt login if visiting unauthenticated
    if (page !== "home") {
      requireAuth(() => {
        setCurrentPage(page);
        window.location.hash = page;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else {
      setCurrentPage(page);
      window.location.hash = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const CurrentPageIcon = PAGE_META[currentPage].icon;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500/20 selection:text-blue-900 relative overflow-x-hidden">
      
      {/* Global Auth Modal (Email / Password, Register, Roles) */}
      <AuthModal />

      {/* Ambient WebGL Aurora Page Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35">
        <Aurora
          colorStops={["#2563eb", "#06b6d4", "#7c3aed"]}
          blend={0.5}
          amplitude={1.1}
          speed={0.6}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white/95" />
      </div>

      {/* Slide-out Sidebar Navigation (Closed by default, opens on tap) */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area (Full width) */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 pb-20 sm:pb-0">
        
        {/* Top Utility Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/85 px-3 sm:px-6 backdrop-blur-md shadow-xs">
          
          {/* Left: Tap Menu Button & Breadcrumbs */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 border border-slate-200 bg-white shadow-2xs transition-all cursor-pointer group shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">Menu</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
                ⌘B
              </kbd>
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium truncate">
              <button
                onClick={() => handleSelectPage("home")}
                className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors shrink-0 cursor-pointer"
              >
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">FleetPulse AI</span>
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <div className="flex items-center gap-1.5 font-bold text-slate-900 truncate">
                <CurrentPageIcon className="h-4 w-4 text-blue-600 shrink-0" />
                <span className="truncate">{PAGE_META[currentPage].title}</span>
              </div>
            </div>
          </div>

          {/* Right: Auth Profile / Google Sign-In & Live Jump Buttons */}
          {/* Right: Auth Profile / Sign In & Live Jump Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* GPS Nodes Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600 font-medium">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-mono text-[11px]">148 GPS Nodes</span>
            </div>

            {/* User Profile Widget or Sign In */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl border border-slate-200 bg-white shadow-2xs animate-fadeIn">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[10px] font-bold overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
                
                <div className="hidden md:flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-bold text-slate-800 truncate max-w-[100px]">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 capitalize flex items-center gap-1">
                    {user.role === "dispatcher" && <ShieldCheck className="h-2.5 w-2.5 text-blue-600 inline" />}
                    {user.role === "driver" && <Truck className="h-2.5 w-2.5 text-emerald-600 inline" />}
                    {user.role === "customer" && <ShoppingBag className="h-2.5 w-2.5 text-purple-600 inline" />}
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  aria-label="Sign out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openAuthModal("login")}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                >
                  <LogIn className="h-3.5 w-3.5 text-blue-600" />
                  <span>Sign In</span>
                </button>

                <Button
                  variant="supabase"
                  size="sm"
                  onClick={() => openAuthModal("register")}
                  className="gap-1 text-xs font-semibold shadow-xs h-8 px-2.5 sm:px-3"
                >
                  <UserIcon className="h-3.5 w-3.5" />
                  <span>Register</span>
                </Button>
              </div>
            )}

            {/* Quick Page Jump Action */}
            {currentPage !== "tracker" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSelectPage("tracker")}
                className="gap-1.5 text-xs font-semibold border-slate-300 bg-white hover:border-blue-400 h-8 sm:h-9 px-2.5 sm:px-4"
              >
                <Radio className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                <span className="hidden xs:inline">Live Tracker</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSelectPage("optimizer")}
                className="gap-1.5 text-xs font-semibold border-slate-300 bg-white hover:border-blue-400 h-8 sm:h-9 px-2.5 sm:px-4"
              >
                <Route className="h-3.5 w-3.5 text-blue-600" />
                <span>2-Opt AI</span>
              </Button>
            )}

          </div>

        </header>

        {/* Page Content Container */}
        <main className="flex-1">
          {currentPage === "home" && (
            <div className="animate-fadeIn">
              {/* Landing Page Hero with 3D ImageStream Corridor */}
              <HeroSection
                onSelectPage={handleSelectPage}
                onExploreHowItWorks={() => {
                  const el = document.getElementById("how-it-works");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />

              {/* Step-by-Step Workflow & Introduction to Platform */}
              <HowItWorksSection onSelectPage={handleSelectPage} />
            </div>
          )}

          {currentPage === "tracker" && (
            <div className="animate-fadeIn">
              <LiveTrackerDemo />
            </div>
          )}

          {currentPage === "optimizer" && (
            <div className="animate-fadeIn">
              <RouteOptimizerVisualizer />
            </div>
          )}

          {currentPage === "portals" && (
            <div className="animate-fadeIn">
              <MultiRoleDashboard />
            </div>
          )}

          {currentPage === "architecture" && (
            <div className="animate-fadeIn">
              <ArchitectureSection />
            </div>
          )}

          {currentPage === "roi" && (
            <div className="animate-fadeIn">
              <RoiCalculator />
            </div>
          )}

          {currentPage === "features" && (
            <div className="animate-fadeIn">
              <FeatureGrid />
            </div>
          )}
        </main>

        {/* Global Footer with Quick Navigation */}
        <Footer onSelectPage={handleSelectPage} />

      </div>

      {/* Mobile Floating Bottom Bar for Ultra-Fast Phone Navigation (< 640px) */}
      <nav 
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200/90 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around shadow-lg"
        aria-label="Mobile Bottom Navigation"
      >
        <button
          onClick={() => handleSelectPage("home")}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
            currentPage === "home" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleSelectPage("tracker")}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
            currentPage === "tracker" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Activity className="h-4 w-4" />
          <span>Tracker</span>
        </button>

        <button
          onClick={() => handleSelectPage("optimizer")}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
            currentPage === "optimizer" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Route className="h-4 w-4" />
          <span>2-Opt</span>
        </button>

        <button
          onClick={() => handleSelectPage("portals")}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
            currentPage === "portals" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Portals</span>
        </button>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <Menu className="h-4 w-4" />
          <span>Menu</span>
        </button>
      </nav>

    </div>
  );
}

export default App;
