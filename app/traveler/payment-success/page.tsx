"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PaymentSuccessPage() {
  return (
    <div className="mobile-container flex min-h-screen flex-col items-center justify-center px-8 bg-white">
      <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
        <svg className="h-8 w-8 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold text-slate-900 text-center">Payment successful</h1>
      <p className="mt-2 text-center text-slate-600">
        Your booking is confirmed. You can view the trip in My Trips and chat with your supplier.
      </p>
      <Link href="/traveler/my-trips" className="mt-8 w-full">
        <Button fullWidth>View my trips</Button>
      </Link>
      <Link href="/traveler" className="mt-3 block text-center text-primary-600 font-medium">
        Back to explore
      </Link>
    </div>
  );
}
