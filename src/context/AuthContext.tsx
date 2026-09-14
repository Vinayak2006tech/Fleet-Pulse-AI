import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "dispatcher" | "driver" | "customer";
  avatar?: string;
  driverId?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: "login" | "register";
  authRedirectAction: (() => void) | null;
  openAuthModal: (mode?: "login" | "register", onAuthenticated?: () => void) => void;
  closeAuthModal: () => void;
  requireAuth: (action: () => void) => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password?: string, role?: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = "http://localhost:5050/api/auth";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("fleetpulse_user");
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fleetpulse_token") || null;
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");
  const [authRedirectAction, setAuthRedirectAction] = useState<(() => void) | null>(null);

  const isAuthenticated = !!user && !!token;

  const saveAuth = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    try {
      localStorage.setItem("fleetpulse_user", JSON.stringify(userData));
      localStorage.setItem("fleetpulse_token", userToken);
    } catch (e) {
      console.error("Storage error:", e);
    }
  };

  const openAuthModal = (mode: "login" | "register" = "login", onAuthenticated?: () => void) => {
    setAuthModalMode(mode);
    if (onAuthenticated) {
      setAuthRedirectAction(() => onAuthenticated);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthRedirectAction(null);
  };

  /**
   * Execute action if authenticated, or prompt login and execute action upon success
   */
  const requireAuth = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      openAuthModal("login", action);
    }
  };

  const executePendingAction = () => {
    if (authRedirectAction) {
      const act = authRedirectAction;
      setAuthRedirectAction(null);
      setTimeout(() => act(), 100);
    }
  };

  const login = async (email: string, password = "password123") => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.token && data.user) {
        saveAuth(data.user, data.token);
        setIsAuthModalOpen(false);
        executePendingAction();
        return { success: true };
      }
      return { success: false, error: data.message || "Login failed" };
    } catch (err) {
      // Offline fallback
      const fallbackUser: User = {
        id: "USR-DEMO-1",
        name: email.split("@")[0].replace(".", " "),
        email,
        role: "dispatcher",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      };
      saveAuth(fallbackUser, "demo_jwt_token_" + Date.now());
      setIsAuthModalOpen(false);
      executePendingAction();
      return { success: true };
    }
  };

  const register = async (name: string, email: string, password = "password123", role = "dispatcher", phone = "") => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, phone }),
      });
      const data = await res.json();
      if (data.success && data.token && data.user) {
        saveAuth(data.user, data.token);
        setIsAuthModalOpen(false);
        executePendingAction();
        return { success: true };
      }
      return { success: false, error: data.message || "Registration failed" };
    } catch (err) {
      const fallbackUser: User = {
        id: "USR-NEW-" + Math.floor(Math.random() * 1000),
        name,
        email,
        role: role as any,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      };
      saveAuth(fallbackUser, "demo_jwt_token_" + Date.now());
      setIsAuthModalOpen(false);
      executePendingAction();
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem("fleetpulse_user");
      localStorage.removeItem("fleetpulse_token");
    } catch (e) {
      console.error("Storage error:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAuthModalOpen,
        authModalMode,
        authRedirectAction,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
