"use client";

import { useApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BottomNav } from "@/components/BottomNav";

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoggedIn } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.replace("/welcome");
      return;
    }
    if (user.role !== "supplier") {
      router.replace("/traveler");
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || !user || user.role !== "supplier") {
    return (
      <div className="mobile-container flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mobile-container relative bg-slate-50 pb-20">
      {children}
      <BottomNav role="supplier" />
    </div>
  );
}
