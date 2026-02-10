"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";

export default function SplashPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => {
      if (isLoggedIn && user) {
        if (user.role === "traveler") router.replace("/traveler");
        else router.replace("/supplier");
      } else {
        router.replace("/welcome");
      }
    }, 2000);
    return () => clearTimeout(t);
  }, [mounted, isLoggedIn, user, router]);

  return (
    <div className="mobile-container flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 px-6">
      <div className="flex flex-col items-center gap-8">
        <div className="h-24 w-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <svg
            className="h-14 w-14 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">TripuLike</h1>
          <p className="mt-2 text-center text-primary-100 text-sm max-w-[240px]">
            Your trusted tourism marketplace
          </p>
        </div>
      </div>
    </div>
  );
}
