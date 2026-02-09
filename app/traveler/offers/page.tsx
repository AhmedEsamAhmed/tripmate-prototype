"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";
import { getOffersFeed, getTripsFeed, MOCK_SUPPLIERS } from "@/lib/mock-data";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export default function OffersPage() {
  const offersWithTrip = getOffersFeed().map((offer) => {
    const trip = getTripsFeed().find((t) => t.id === offer.tripId);
    const supplier = MOCK_SUPPLIERS.find((s) => s.id === offer.supplierId);
    return { offer, trip, supplier };
  });

  return (
    <>
      <Header title="Offers" />
      <main className="px-4 py-4">
        <p className="text-slate-600 text-sm mb-4">
          Offers from suppliers on your trip requests. Accept, counter, or reject.
        </p>
        {offersWithTrip.length === 0 ? (
          <div className="empty-state">
            <p>No offers yet.</p>
            <p className="text-sm mt-2">Create a trip request to receive offers.</p>
            <Link href="/traveler/create-trip" className="mt-4">
              <span className="text-primary-600 font-medium">Create trip request</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {offersWithTrip.map(({ offer, trip, supplier }) => (
              <Link
                key={offer.id}
                href={`/traveler/offer/${offer.id}`}
                className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-900 line-clamp-1">{trip?.title}</h3>
                  <Badge variant={offer.status === "pending" ? "warning" : "success"}>
                    {offer.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">{supplier?.name} • {formatPrice(offer.amount, offer.currency)}</p>
                {offer.message && (
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">{offer.message}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
