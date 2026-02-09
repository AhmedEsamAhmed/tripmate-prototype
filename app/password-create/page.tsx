"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/lib/context";

function PasswordCreateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const { loginAsTraveler, loginAsSupplier } = useApp();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (role === "traveler") {
      loginAsTraveler();
      router.replace("/traveler");
    } else if (role === "supplier") {
      loginAsSupplier("tour_guide", "approved");
      router.replace("/supplier");
    } else {
      loginAsTraveler();
      router.replace("/traveler");
    }
  };

  return (
    <div className="mobile-container flex min-h-screen flex-col bg-white">
      <header className="px-4 py-4 border-b border-slate-200">
        <Link href="/otp" className="inline-flex items-center gap-2 text-slate-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Create password</h1>
      </header>
      <div className="flex-1 px-6 py-8">
        <p className="text-slate-600">
          Choose a secure password (at least 8 characters).
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
          />
          <Input
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {error && <p className="text-sm text-trust-red">{error}</p>}
          <Button type="submit" fullWidth>
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function PasswordCreatePage() {
  return (
    <Suspense fallback={<div className="mobile-container flex min-h-screen items-center justify-center bg-white"><p className="text-slate-500">Loading…</p></div>}>
      <PasswordCreateContent />
    </Suspense>
  );
}
