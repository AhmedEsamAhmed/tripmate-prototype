"use client";

import { useApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SupplierNetworkLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.replace("/welcome");
      return;
    }
    if (user.role !== "supplier") {
      router.replace("/traveler");
      return;
    }
    if (user.verificationStatus !== "approved") {
      router.replace("/supplier");
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || !user || user.role !== "supplier") {
    return (
      <div className="mobile-container flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading…</p>
      </div>
    );
  }

  if (user.verificationStatus !== "approved") {
    return (
      <div className="mobile-container flex min-h-screen flex-col items-center justify-center px-6 bg-slate-50">
        <p className="text-center text-slate-600">Only verified suppliers can access the professional network.</p>
        <button type="button" onClick={() => router.push("/supplier")} className="mt-4 text-primary-600 font-medium">
          Back to dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
