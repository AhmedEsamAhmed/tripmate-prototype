"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
export default function RoleSelectPage() {
  const router = useRouter();

  return (
    <div className="mobile-container flex min-h-screen flex-col bg-white">
      <header className="px-4 py-4 border-b border-slate-200">
        <Link
          href="/welcome"
          className="inline-flex items-center gap-2 text-slate-600"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">
          I want to…
        </h1>
      </header>
      <div className="flex-1 px-6 py-8">
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => router.push("/login?role=traveler")}
            className="w-full rounded-2xl border-2 border-slate-200 bg-white p-6 text-left transition-colors hover:border-primary-500 hover:bg-primary-50/50"
          >
            <span className="text-lg font-semibold text-slate-900">
              Travel & book trips
            </span>
            <p className="mt-2 text-sm text-slate-600">
              Find drivers, guides, and pre-designed tours. Request custom trips or book directly.
            </p>
          </button>
          <button
            type="button"
            onClick={() => router.push("/onboarding/supplier-type")}
            className="w-full rounded-2xl border-2 border-slate-200 bg-white p-6 text-left transition-colors hover:border-primary-500 hover:bg-primary-50/50"
          >
            <span className="text-lg font-semibold text-slate-900">
              Offer my services
            </span>
            <p className="mt-2 text-sm text-slate-600">
              Register as a driver, tour guide, or tour agency. Get verified and receive trip requests.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
