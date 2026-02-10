"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { SupplierType } from "@/types";

const types: { value: SupplierType; label: string; description: string }[] = [
  { value: "driver", label: "Driver", description: "Transport only. Airport transfers, day trips, private car." },
  { value: "tour_guide", label: "Tour Guide", description: "Guided tours. Cultural, nature, or custom itineraries." },
  { value: "tour_agency", label: "Tour Agency", description: "Pre-designed trips and packages. Create and publish tours." },
];

export default function SupplierTypePage() {
  const router = useRouter();

  const handleSelect = (type: SupplierType) => {
    router.push(`/onboarding/documents?type=${type}`);
  };

  return (
    <div className="mobile-container flex min-h-screen flex-col bg-white">
      <header className="px-4 py-4 border-b border-slate-200">
        <Link href="/role-select" className="inline-flex items-center gap-2 text-slate-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Supplier type</h1>
        <p className="mt-1 text-slate-600 text-sm">Choose how you’ll offer services.</p>
      </header>
      <div className="flex-1 px-6 py-6 space-y-3">
        {types.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => handleSelect(t.value)}
            className="w-full rounded-2xl border-2 border-slate-200 bg-white p-5 text-left transition-colors hover:border-primary-500 hover:bg-primary-50/50"
          >
            <span className="font-semibold text-slate-900">{t.label}</span>
            <p className="mt-1 text-sm text-slate-600">{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
