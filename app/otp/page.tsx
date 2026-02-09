"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function OTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get("method") || "email";
  const role = searchParams.get("role");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (code.length < 4) {
      setError("Enter the 4-digit code we sent you.");
      return;
    }
    router.push("/password-create" + (role ? "?role=" + role : ""));
  };

  return (
    <div className="mobile-container flex min-h-screen flex-col bg-white">
      <header className="px-4 py-4 border-b border-slate-200">
        <Link href="/login" className="inline-flex items-center gap-2 text-slate-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Verify code</h1>
      </header>
      <div className="flex-1 px-6 py-8">
        <p className="text-slate-600">
          We sent a 4-digit code to your {method === "email" ? "email" : "phone"}. Enter it below.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Verification code"
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="0000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          />
          {error && <p className="text-sm text-trust-red">{error}</p>}
          <Button type="submit" fullWidth>
            Verify
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Didn’t receive the code?{" "}
          <button type="button" className="text-primary-600 font-medium">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}

export default function OTPPage() {
  return (
    <Suspense fallback={<div className="mobile-container flex min-h-screen items-center justify-center bg-white"><p className="text-slate-500">Loading…</p></div>}>
      <OTPContent />
    </Suspense>
  );
}
