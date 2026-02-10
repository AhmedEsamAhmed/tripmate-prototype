"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function WelcomePage() {
  return (
    <div className="mobile-container flex min-h-screen flex-col bg-slate-50">
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="mb-8 h-20 w-20 rounded-2xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
          <svg
            className="h-11 w-11 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 text-center tracking-tight">
          Welcome to TripuLike
        </h1>
        <p className="mt-3 text-center text-slate-600 text-[15px] leading-relaxed max-w-[280px]">
          Book drivers, guides, and tours—or offer your services. One app for travel.
        </p>
        <div className="mt-12 w-full space-y-3 max-w-[320px]">
          <Link href="/login" className="block">
            <Button fullWidth>Log in</Button>
          </Link>
          <Link href="/role-select" className="block">
            <Button variant="outline" fullWidth>
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
