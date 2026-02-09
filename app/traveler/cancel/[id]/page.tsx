"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { ConfirmModal } from "@/components/ui/Modal";
import { REFUND_POLICY } from "@/types";

export default function CancelTripPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [showConfirm, setShowConfirm] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const handleConfirm = () => {
    setCancelled(true);
    setShowConfirm(false);
    setTimeout(() => router.push("/traveler/refund-status"), 500);
  };

  if (cancelled) {
    return (
      <div className="mobile-container flex min-h-screen flex-col items-center justify-center px-8 bg-white">
        <p className="text-slate-600 text-center">Cancellation requested. Redirecting to refund status…</p>
      </div>
    );
  }

  return (
    <>
      <Header title="Cancel trip" backHref={`/traveler/trip/${id}`} />
      <main className="px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 mb-6">
          <h2 className="font-semibold text-slate-900">Refund policy</h2>
          <ul className="mt-3 text-sm text-slate-600 space-y-2">
            <li>• Cancel <strong>≥{REFUND_POLICY.fullRefundHours} hours</strong> before: <strong>Full refund</strong></li>
            <li>• Cancel <strong>10–{REFUND_POLICY.fullRefundHours} hours</strong> before: <strong>50% refund</strong></li>
            <li>• Cancel <strong>&lt;10 hours</strong> before: <strong>No refund</strong></li>
          </ul>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          Your cancellation will be processed immediately. Refund (if applicable) will appear within 5–10 business days.
        </p>
        <Button variant="danger" fullWidth onClick={() => setShowConfirm(true)}>
          Confirm cancellation
        </Button>
        <Link href={`/traveler/trip/${id}`} className="block mt-4 text-center text-slate-600">
          Keep trip
        </Link>
      </main>
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title="Cancel this trip?"
        message="Your booking will be cancelled. Refund will follow our policy above."
        confirmLabel="Yes, cancel"
        cancelLabel="No, keep trip"
        variant="danger"
      />
    </>
  );
}
