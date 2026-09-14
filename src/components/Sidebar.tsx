import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Home, 
  Activity, 
  Route, 
  Users, 
  Cpu, 
  Calculator, 
  Zap, 
  X,
  Search,
  Sparkles,
  ExternalLink,
  LogIn,
  LogOut
} from "lucide-react";

export type PageId = "home" | "tracker" | "optimizer" | "portals" | "architecture" | "roi" | "features";

interface NavItem {
  id: PageId;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: "default" | "brand" | "secondary" | "warning";
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Overview & Introduction",
    shortLabel: "Overview",
    description: "Platform intro & 4-step system working",
    icon: Home,
    badge: "Intro",
    badgeVariant: "brand",
  },
  {
    id: "tracker",
    label: "Live GPS Telemetry",
    shortLabel: "Live Tracker",
    description: "Real-time vehicle map & dispatch simulator",
    icon: Activity,
    badge: "Live GPS",
    badgeVariant: "brand",
  },
  {
    id: "optimizer",
    label: "Route Optimizer",
    shortLabel: "Optimizer",
    description: "TSP 2-Opt & Dijkstra algorithm solver",
    icon: Route,
    badge: "2-Opt AI",
    badgeVariant: "default",
  },
  {
    id: "portals",
    label: "Multi-Role Portals",
    shortLabel: "Portals",
    description: "Admin Tower, Driver PWA & Customer OTP",
    icon: Users,
    badge: "3 Portals",
    badgeVariant: "secondary",
  },
  {
    id: "architecture",
    label: "System Architecture",
    shortLabel: "Architecture",
    description: "Full-stack WebSocket pipeline & TS code",
    icon: Cpu,
    badge: "Stack",
    badgeVariant: "default",
  },
  {
    id: "roi",
    label: "Fleet ROI Calculator",
    shortLabel: "ROI Engine",
    description: "Annual fuel & license operational savings",
    icon: Calculator,
    badge: "Savings",
    badgeVariant: "default",
  },
  {
    id: "features",
    label: "All Features & Bento",
    shortLabel: "Features",
    description: "Complete platform capabilities grid",
    icon: Zap,
    badge: "Bento",
    badgeVariant: "secondary",
  },
];

interface SidebarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
  // Deprecated backwards-compatible aliases
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  isOpen: propIsOpen,
  onClose,
  isMobileOpen = false,
  setIsMobileOpen,
}) => {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const isOpen = propIsOpen !== undefined ? propIsOpen : isMobileOpen;
  const [searchFilter, setSearchFilter] = useState<string>("");

  const handleClose = () => {
    if (onClose) onClose();
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (id: PageId) => {
    onSelectPage(id);
    handleClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredItems = NAV_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.shortLabel.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <>
      {/* Dimmed Backdrop Overlay with Smooth Fade */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Slide-over Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between border-r border-slate-200 bg-white/95 backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-80 sm:w-84 max-w-[85vw] ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
        aria-label="Main Navigation Sidebar"
      >
        {/* Top Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
          {/* Logo & Brand Name */}
          <div
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Logo Icon with Pulse Badge */}
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-blue-600 group-hover:border-blue-400 group-hover:bg-blue-100/60 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.25)] transition-all">
              <Truck className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-bold tracking-tight text-slate-900 text-base">
                  Fleet<span className="text-blue-600">Pulse</span>
                </span>
                <Badge variant="brand" className="text-[9px] px-1 py-0 h-4 shrink-0">
                  AI
                </Badge>
              </div>
              <span className="text-[10px] text-slate-500 whitespace-nowrap font-medium">
                Smart Logistics Engine
              </span>
            </div>
          </div>

          {/* Close (X) Button */}
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close sidebar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Filter Search Bar */}
        <div className="px-3.5 pt-3 pb-1">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter pages & tools..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/70 placeholder:text-slate-400 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter("")}
                className="absolute right-2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-2.5 sm:px-3 py-3 space-y-1 scrollbar-thin">
          <div className="px-2 mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Platform Modules
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {filteredItems.length} items
            </span>
          </div>

          {filteredItems.map((item) => {
            const isActive = currentPage === item.id;
            const IconComp = item.icon;

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center rounded-xl text-left transition-all text-sm font-medium group relative select-none px-2.5 sm:px-3 py-2.5 gap-3 cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold shadow-xs border border-blue-200/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/90 border border-transparent"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                  )}

                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs scale-105"
                      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900 group-hover:scale-105"
                  }`}>
                    <IconComp className="h-4 w-4" />
                  </div>

                  {/* Nav Item Title & Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 whitespace-nowrap">
                      <span className="truncate text-xs sm:text-sm font-semibold">{item.shortLabel}</span>
                      {item.badge && (
                        <Badge 
                          variant={isActive ? "brand" : item.badgeVariant || "default"}
                          className="text-[9px] px-1.5 py-0 h-4 font-mono shrink-0"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5 font-normal">
                      {item.description}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom User Auth & System Health Widget */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70 space-y-2">
          {/* Auth State Card */}
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white shadow-xs">
              <div className="flex items-center gap-2 min-w-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover border border-blue-200 shrink-0"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-800 truncate">{user.name}</span>
                  <span className="text-[10px] text-blue-600 capitalize font-mono font-medium">{user.role}</span>
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1.5">
              <button
                onClick={() => { handleClose(); openAuthModal("login"); }}
                className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                <LogIn className="h-3.5 w-3.5 text-blue-600" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => { handleClose(); openAuthModal("register"); }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Create Account</span>
              </button>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-xs">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold font-mono text-[11px]">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                Gateway #01
              </span>
              <span className="text-[9px] font-mono text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                Connected
              </span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              148 GPS Nodes &bull; Socket.io Sub-100ms
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
