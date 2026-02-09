"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getOffersFeed, getTripsFeed, MOCK_SUPPLIERS } from "@/lib/mock-data";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export default function NegotiationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const offer = getOffersFeed().find((o) => o.id === id);
  const trip = offer ? getTripsFeed().find((t) => t.id === offer.tripId) : null;
  const supplier = offer ? MOCK_SUPPLIERS.find((s) => s.id === offer.supplierId) : null;
  const [counterAmount, setCounterAmount] = useState(offer?.amount?.toString() ?? "");

  if (!offer || !trip || !supplier) {
    return (
      <>
        <Header title="Negotiation" backHref="/traveler/offers" />
        <div className="empty-state"><p>Offer not found.</p></div>
      </>
    );
  }

  const handleCounter = () => {
    const num = parseInt(counterAmount.replace(/\D/g, ""), 10);
    if (Number.isNaN(num)) return;
    router.push(`/traveler/offer/${offer.id}?countered=1`);
  };

  const handleAccept = () => {
    router.push(`/traveler/booking/${offer.tripId}`);
  };

  return (
    <>
      <Header title="Negotiate price" backHref={`/traveler/offer/${offer.id}`} />
      <main className="px-4 py-4 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-900">{trip.title}</h2>
          <p className="text-sm text-slate-600 mt-1">Supplier offer: {formatPrice(offer.amount, offer.currency)}</p>
        </div>
        <div>
          <Input
            label="Your counter offer (IDR)"
            type="text"
            inputMode="numeric"
            placeholder={offer.amount.toString()}
            value={counterAmount}
            onChange={(e) => setCounterAmount(e.target.value.replace(/\D/g, ""))}
          />
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => router.back()}>
            Cancel
          </Button>
          <Button variant="outline" fullWidth onClick={handleCounter}>
            Send counter
          </Button>
          <Button fullWidth onClick={handleAccept}>
            Accept original price
          </Button>
        </div>
      </main>
    </>
  );
}
