"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { getOffersFeed, getTripsFeed, MOCK_SUPPLIERS } from "@/lib/mock-data";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export default function BookingSummaryPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;
  const trip = getTripsFeed().find((t) => t.id === tripId);
  const offer = getOffersFeed().find((o) => o.tripId === tripId);
  const supplier = offer ? MOCK_SUPPLIERS.find((s) => s.id === offer.supplierId) : null;

  if (!trip || !offer || !supplier) {
    return (
      <>
        <Header title="Booking" backHref="/traveler/offers" />
        <div className="empty-state"><p>Booking not found.</p></div>
      </>
    );
  }

  return (
    <>
      <Header title="Booking summary" backHref={`/traveler/offer/${offer.id}`} />
      <main className="px-4 py-4 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-900">{trip.title}</h2>
          <p className="text-sm text-slate-600 mt-1">{trip.locations.map((l) => l.name).join(" → ")}</p>
          <p className="text-sm text-slate-600 mt-1">With {supplier.name}</p>
          <p className="mt-3 text-lg font-semibold text-slate-900">{formatPrice(offer.amount, offer.currency)}</p>
          <p className="text-xs text-slate-500 mt-1">Price locked. Proceed to payment.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => router.back()}>
            Back
          </Button>
          <Button fullWidth onClick={() => router.push(`/traveler/payment/${tripId}`)}>
            Proceed to payment
          </Button>
        </div>
      </main>
    </>
  );
}
