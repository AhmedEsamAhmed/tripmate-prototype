"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { User, UserRole, SupplierType, VerificationStatus } from "@/types";

interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  loginAsTraveler: () => void;
  loginAsSupplier: (type: SupplierType, verification?: VerificationStatus) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  const loginAsTraveler = useCallback(() => {
    setUserState({
      id: "u1",
      name: "Alex Chen",
      email: "alex@example.com",
      phone: "+62 812 3456 7890",
      role: "traveler",
    });
  }, []);

  const loginAsSupplier = useCallback(
    (type: SupplierType, verification: VerificationStatus = "approved") => {
      setUserState({
        id: "s1",
        name: "Budi Santoso",
        email: "budi@example.com",
        phone: "+62 821 9876 5432",
        role: "supplier",
        supplierType: type,
        verificationStatus: verification,
      });
    },
    []
  );

  const logout = useCallback(() => {
    setUserState(null);
  }, []);

  const setUser = useCallback((u: User | null) => {
    setUserState(u);
  }, []);

  const value: AppContextType = {
    user,
    isLoggedIn: !!user,
    loginAsTraveler,
    loginAsSupplier,
    logout,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (ctx === undefined) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
