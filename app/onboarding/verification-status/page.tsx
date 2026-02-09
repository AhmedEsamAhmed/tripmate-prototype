"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/context";
import type { SupplierType, VerificationStatus } from "@/types";

function VerificationStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") || "tour_guide") as SupplierType;
  const status = (searchParams.get("status") || "pending") as VerificationStatus;
  const { loginAsSupplier } = useApp();

  const handleContinue = () => {
    loginAsSupplier(type, status);
    router.replace("/supplier");
  };

  if (status === "approved") {
    return (
      <div className="mobile-container flex min-h-screen flex-col bg-white">
        <div className="flex flex-1 flex-col items-center justify-center px-8">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-slate-900 text-center">You’re verified</h1>
          <p className="mt-2 text-center text-slate-600">
            Your account is active. You can now receive trip requests and create trips.
          </p>
          <Button fullWidth className="mt-8" onClick={handleContinue}>
            Go to dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="mobile-container flex min-h-screen flex-col bg-white">
        <div className="flex flex-1 flex-col items-center justify-center px-8">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-trust-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-slate-900 text-center">Verification declined</h1>
          <p className="mt-2 text-center text-slate-600">
            We couldn’t verify your documents. Please check your uploads or contact support.
          </p>
          <div className="mt-8 flex gap-3 w-full">
            <Link href="/onboarding/documents" className="flex-1">
              <Button variant="secondary" fullWidth>Re-upload</Button>
            </Link>
            <Button fullWidth onClick={handleContinue}>
              Go to dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // pending
  return (
    <div className="mobile-container flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mb-6">
          <svg className="h-8 w-8 text-trust-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-slate-900 text-center">Verification in progress</h1>
        <p className="mt-2 text-center text-slate-600">
          We’re reviewing your documents. This usually takes 1–3 business days. You’ll see limited features until approved.
        </p>
        <Button fullWidth className="mt-8" onClick={handleContinue}>
          Continue to dashboard
        </Button>
      </div>
    </div>
  );
}

export default function VerificationStatusPage() {
  return (
    <Suspense fallback={<div className="mobile-container flex min-h-screen items-center justify-center bg-white"><p className="text-slate-500">Loading…</p></div>}>
      <VerificationStatusContent />
    </Suspense>
  );
}
