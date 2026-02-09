"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (method === "email" && !email.trim()) {
      setError("Enter your email address.");
      return;
    }
    if (method === "phone" && !phone.trim()) {
      setError("Enter your phone number.");
      return;
    }
    router.push("/otp?method=" + method + (roleParam ? "&role=" + roleParam : ""));
  };

  return (
    <div className="mobile-container flex min-h-screen flex-col bg-white">
      <header className="px-4 py-4 border-b border-slate-200">
        <Link href={roleParam ? "/role-select" : "/welcome"} className="inline-flex items-center gap-2 text-slate-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Log in</h1>
      </header>
      <div className="flex-1 px-6 py-8">
        <div className="flex rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMethod("email")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium ${
              method === "email" ? "bg-white text-slate-900 shadow" : "text-slate-600"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setMethod("phone")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium ${
              method === "phone" ? "bg-white text-slate-900 shadow" : "text-slate-600"
            }`}
          >
            Phone
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {method === "email" ? (
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          ) : (
            <Input
              label="Phone number"
              type="tel"
              placeholder="+62 812 3456 7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}
          {error && <p className="text-sm text-trust-red">{error}</p>}
          <Button type="submit" fullWidth>
            Continue
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          We’ll send you a one-time code to verify.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mobile-container flex min-h-screen items-center justify-center bg-white"><p className="text-slate-500">Loading…</p></div>}>
      <LoginContent />
    </Suspense>
  );
}
