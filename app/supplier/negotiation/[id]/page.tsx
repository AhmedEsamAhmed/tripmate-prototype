"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { getTripsFeed, getOffersFeed } from "@/lib/mock-data";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export default function SupplierNegotiationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const trip = getTripsFeed().find((t) => t.id === id);
  const offer = getOffersFeed().find((o) => o.tripId === id);

  if (!trip || !offer) {
    return (
      <>
        <Header title="Negotiation" backHref="/supplier/requests" />
        <div className="empty-state"><p>Not found.</p></div>
      </>
    );
  }

  return (
    <>
      <Header title="Negotiation" backHref={`/supplier/request/${id}`} />
      <main className="px-4 py-4 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-900">{trip.title}</h2>
          <p className="text-sm text-slate-600 mt-1">Your offer: {formatPrice(offer.amount, offer.currency)}</p>
          <p className="text-sm text-slate-500 mt-1">Status: {offer.status}. Traveler can accept, counter, or reject.</p>
        </div>
        <Button fullWidth onClick={() => router.push("/supplier/booking-confirmed")}>
          Simulate: Booking confirmed
        </Button>
      </main>
    </>
  );
}
