"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { getOffersFeed, getTripsFeed } from "@/lib/mock-data";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;
  const trip = getTripsFeed().find((t) => t.id === tripId);
  const offer = getOffersFeed().find((o) => o.tripId === tripId);
  const [paymentType, setPaymentType] = useState<"full" | "partial">("full");
  const [processing, setProcessing] = useState(false);

  if (!trip || !offer) {
    return (
      <>
        <Header title="Payment" backHref={`/traveler/booking/${tripId}`} />
        <div className="empty-state"><p>Booking not found.</p></div>
      </>
    );
  }

  const handlePay = (simulateFailure = false) => {
    setProcessing(true);
    setTimeout(() => {
      if (simulateFailure) {
        router.push("/traveler/payment-failure");
      } else {
        router.push(`/traveler/payment-success?tripId=${tripId}`);
      }
    }, 1500);
  };

  return (
    <>
      <Header title="Payment" backHref={`/traveler/booking/${tripId}`} />
      <main className="px-4 py-4 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-900">{trip.title}</h2>
          <p className="mt-2 text-lg font-semibold text-slate-900">{formatPrice(offer.amount, offer.currency)}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Payment option</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                name="paymentType"
                checked={paymentType === "full"}
                onChange={() => setPaymentType("full")}
                className="h-4 w-4 text-primary-600"
              />
              <span>Full payment now</span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                name="paymentType"
                checked={paymentType === "partial"}
                onChange={() => setPaymentType("partial")}
                className="h-4 w-4 text-primary-600"
              />
              <span>Partial payment (50% now, rest later)</span>
            </label>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          This is a prototype. No real payment is processed.
        </p>
        <Button fullWidth onClick={() => handlePay(false)} disabled={processing}>
          {processing ? "Processing…" : "Pay now"}
        </Button>
        <button
          type="button"
          onClick={() => handlePay(true)}
          disabled={processing}
          className="mt-2 w-full text-center text-sm text-slate-500 underline hover:text-slate-700"
        >
          Simulate payment failure
        </button>
      </main>
    </>
  );
}
