"use client";

import { useApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.replace("/welcome");
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || !user) {
    return (
      <div className="mobile-container flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mobile-container relative min-h-screen bg-white pb-20">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-900">Explore</h1>
          <div className="flex items-center gap-2">
            <Link
              href={user.role === "traveler" ? "/traveler" : "/supplier"}
              className="text-sm text-slate-600"
            >
              {user.role === "traveler" ? "Trips" : "Dashboard"}
            </Link>
            {user.role === "traveler" && (
              <Link
                href="/explore/create"
                className="rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white"
              >
                New post
              </Link>
            )}
          </div>
        </div>
      </header>
      {children}
      {user.role === "traveler" && <BottomNav role="traveler" />}
    </div>
  );
}
