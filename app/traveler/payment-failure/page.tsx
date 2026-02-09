"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PaymentFailurePage() {
  return (
    <div className="mobile-container flex min-h-screen flex-col items-center justify-center px-8 bg-white">
      <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <svg className="h-8 w-8 text-trust-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold text-slate-900 text-center">Payment failed</h1>
      <p className="mt-2 text-center text-slate-600">
        We couldn’t process your payment. Please check your payment method and try again.
      </p>
      <Link href="/traveler" className="mt-8 w-full">
        <Button fullWidth>Try again</Button>
      </Link>
      <Link href="/traveler/my-trips" className="mt-3 block text-center text-slate-600">
        View my trips
      </Link>
    </div>
  );
}
