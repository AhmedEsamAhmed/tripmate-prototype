"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

function DocumentsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "driver";
  const [license, setLicense] = useState(false);
  const [idDoc, setIdDoc] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!license || !idDoc) return;
    router.push(`/onboarding/service-details?type=${type}`);
  };

  return (
    <div className="mobile-container flex min-h-screen flex-col bg-white">
      <header className="px-4 py-4 border-b border-slate-200">
        <Link href={`/onboarding/supplier-type`} className="inline-flex items-center gap-2 text-slate-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Document upload</h1>
        <p className="mt-1 text-slate-600 text-sm">We need these to verify your identity.</p>
      </header>
      <div className="flex-1 px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Driving license (if driver)
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={license}
                onChange={(e) => setLicense(e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-primary-600"
              />
              <span className="text-sm text-slate-600">I have uploaded my license</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              ID or business registration
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={idDoc}
                onChange={(e) => setIdDoc(e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-primary-600"
              />
              <span className="text-sm text-slate-600">I have uploaded my ID / business doc</span>
            </label>
          </div>
          <p className="text-xs text-slate-500">
            Documents are stored securely and used only for verification. We’ll review within 1–3 business days.
          </p>
          <Button type="submit" fullWidth disabled={!license || !idDoc}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="mobile-container flex min-h-screen items-center justify-center bg-white"><p className="text-slate-500">Loading…</p></div>}>
      <DocumentsContent />
    </Suspense>
  );
}
