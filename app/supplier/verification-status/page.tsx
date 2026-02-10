"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context";
import { getVerificationApplication } from "@/lib/mock-data";
import type { SupplierType } from "@/types";

function typeLabel(t: SupplierType) {
  return t === "driver" ? "Driver" : t === "tour_guide" ? "Tour Guide" : "Tour Agency";
}

export default function SupplierVerificationStatusPage() {
  const { user } = useApp();
  const app = user?.id ? getVerificationApplication(user.id) : null;

  if (!user || user.role !== "supplier") {
    return (
      <>
        <Header title="Verification" backHref="/supplier" />
        <div className="empty-state"><p>Not found.</p></div>
      </>
    );
  }

  if (!app) {
    return (
      <>
        <Header title="Verification status" backHref="/supplier" />
        <main className="px-4 py-6">
          <div className="card p-6 text-center">
            <p className="text-slate-600">You haven’t submitted a verification application yet.</p>
            <Link href="/onboarding/supplier-type" className="mt-4 inline-block">
              <Button>Start verification</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title="Verification status" backHref="/supplier" />
      <main className="px-4 py-6 space-y-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-slate-900">{typeLabel(app.supplierType)}</span>
            <Badge
              variant={
                app.status === "approved"
                  ? "success"
                  : app.status === "rejected"
                  ? "danger"
                  : "warning"
              }
            >
              {app.status}
            </Badge>
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Documents</dt>
              <dd>{app.documentsUploaded ? "Uploaded" : "Pending"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Service details</dt>
              <dd>{app.serviceDetailsCompleted ? "Completed" : "Pending"}</dd>
            </div>
            {app.submittedAt && (
              <div className="flex justify-between">
                <dt className="text-slate-500">Submitted</dt>
                <dd>{new Date(app.submittedAt).toLocaleDateString()}</dd>
              </div>
            )}
            {app.reviewedAt && (
              <div className="flex justify-between">
                <dt className="text-slate-500">Reviewed</dt>
                <dd>{new Date(app.reviewedAt).toLocaleDateString()}</dd>
              </div>
            )}
          </dl>
          {app.status === "rejected" && app.rejectionReason && (
            <p className="mt-4 text-sm text-trust-red border-t border-slate-100 pt-4">
              Reason: {app.rejectionReason}
            </p>
          )}
        </div>
        {app.status === "pending" && (
          <p className="text-sm text-slate-600 text-center">
            We usually review within 1–3 business days. You’ll get a notification when your application is updated.
          </p>
        )}
        {app.status === "rejected" && (
          <Link href="/onboarding/documents" className="block">
            <Button variant="outline" fullWidth>Re-submit documents</Button>
          </Link>
        )}
      </main>
    </>
  );
}
