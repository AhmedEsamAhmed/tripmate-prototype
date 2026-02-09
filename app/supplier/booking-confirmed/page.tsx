"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function BookingConfirmedPage() {
  return (
    <div className="mobile-container flex min-h-screen flex-col items-center justify-center px-8 bg-white">
      <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
        <svg className="h-8 w-8 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold text-slate-900 text-center">Booking confirmed</h1>
      <p className="mt-2 text-center text-slate-600">
        The traveler has paid. The trip is now in your upcoming list.
      </p>
      <Link href="/supplier" className="mt-8 w-full">
        <Button fullWidth>Back to dashboard</Button>
      </Link>
    </div>
  );
}
