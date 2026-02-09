"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn, user } = useApp();

  useEffect(() => {
    if (isLoggedIn && user) {
      if (user.role === "traveler") router.replace("/traveler");
      else router.replace("/supplier");
    } else {
      router.replace("/splash");
    }
  }, [isLoggedIn, user, router]);

  return (
    <div className="mobile-container flex items-center justify-center bg-slate-100">
      <div className="animate-pulse text-slate-500">Loading…</div>
    </div>
  );
}
