"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const MOCK_LOCATIONS = ["Bali", "Yogyakarta", "Jakarta", "Lombok", "Bandung"];
const MOCK_LANGUAGES = ["Indonesian", "English", "Japanese", "Mandarin"];

function ServiceDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "driver";
  const [locations, setLocations] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");
  const [demoStatus, setDemoStatus] = useState<"pending" | "approved" | "rejected">("approved");

  const toggleLocation = (loc: string) => {
    setLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };
  const toggleLanguage = (lang: string) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/onboarding/verification-status?type=${type}&status=${demoStatus}`);
  };

  return (
    <div className="mobile-container flex min-h-screen flex-col bg-white">
      <header className="px-4 py-4 border-b border-slate-200">
        <Link href={`/onboarding/documents?type=${type}`} className="inline-flex items-center gap-2 text-slate-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Service details</h1>
        <p className="mt-1 text-slate-600 text-sm">Where you operate and what you offer.</p>
      </header>
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Locations</label>
            <div className="flex flex-wrap gap-2">
              {MOCK_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleLocation(loc)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    locations.includes(loc)
                      ? "bg-primary-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Languages</label>
            <div className="flex flex-wrap gap-2">
              {MOCK_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    languages.includes(lang)
                      ? "bg-primary-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          <Input
            label="Availability (e.g. Mon–Sat, 8AM–6PM)"
            placeholder="When are you available?"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Demo: Verification result</label>
            <p className="text-xs text-slate-500 mb-2">Choose the outcome for demo purposes.</p>
            <div className="flex gap-2">
              {(["approved", "pending", "rejected"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setDemoStatus(s)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
                    demoStatus === s
                      ? s === "approved"
                        ? "bg-emerald-600 text-white"
                        : s === "rejected"
                          ? "bg-red-600 text-white"
                          : "bg-amber-500 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" fullWidth>
            Submit for verification
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ServiceDetailsPage() {
  return (
    <Suspense fallback={<div className="mobile-container flex min-h-screen items-center justify-center bg-white"><p className="text-slate-500">Loading…</p></div>}>
      <ServiceDetailsContent />
    </Suspense>
  );
}
