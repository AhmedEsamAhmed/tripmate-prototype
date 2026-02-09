"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
import { Button } from "@/components/ui/Button";
import { getOffersFeed, getTripsFeed, MOCK_SUPPLIERS } from "@/lib/mock-data";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const offer = getOffersFeed().find((o) => o.id === id);
  const trip = offer ? getTripsFeed().find((t) => t.id === offer.tripId) : null;
  const supplier = offer ? MOCK_SUPPLIERS.find((s) => s.id === offer.supplierId) : null;

  if (!offer || !trip || !supplier) {
    return (
      <>
        <Header title="Offer" backHref="/traveler/offers" />
        <div className="empty-state">
          <p>Offer not found.</p>
          <Link href="/traveler/offers">Back to offers</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Offer detail" backHref="/traveler/offers" />
      <main className="px-4 py-4 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-900">{trip.title}</h2>
          <p className="text-sm text-slate-600 mt-1">{trip.locations.map((l) => l.name).join(" → ")}</p>
          <p className="mt-3 text-lg font-semibold text-primary-600">{formatPrice(offer.amount, offer.currency)}</p>
          {offer.message && (
            <p className="mt-2 text-sm text-slate-600 border-t border-slate-100 pt-2">{offer.message}</p>
          )}
        </div>
        <ProfileCard profile={supplier} />
        <div className="flex gap-3">
          <Button variant="danger" fullWidth onClick={() => router.push(`/traveler/offers`)}>
            Reject
          </Button>
          <Button variant="secondary" fullWidth onClick={() => router.push(`/traveler/negotiation/${offer.id}`)}>
            Counter
          </Button>
          <Button fullWidth onClick={() => router.push(`/traveler/booking/${offer.tripId}`)}>
            Accept
          </Button>
        </div>
        <Link href={`/traveler/chat/${offer.tripId}`} className="block text-center text-primary-600 font-medium">
          Open chat
        </Link>
      </main>
    </>
  );
}
