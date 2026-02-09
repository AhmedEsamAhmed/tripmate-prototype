"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
import { Button } from "@/components/ui/Button";
import { TripStatusBadge, PaymentStatusBadge } from "@/components/StatusBadge";
import { getTripsFeed, getOffersFeed, getBookingsFeed, MOCK_SUPPLIERS } from "@/lib/mock-data";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const trip = getTripsFeed().find((t) => t.id === id);
  const offer = getOffersFeed().find((o) => o.tripId === id);
  const booking = getBookingsFeed().find((b) => b.tripId === id);
  const supplier = trip?.supplier ?? (offer ? MOCK_SUPPLIERS.find((s) => s.id === offer.supplierId) : null);

  if (!trip) {
    return (
      <>
        <Header title="Trip" backHref="/traveler/my-trips" />
        <div className="empty-state"><p>Trip not found.</p></div>
      </>
    );
  }

  const status = booking ? "booked" : trip.status;
  const paymentStatus = booking?.paymentStatus;
  const canCancel = status === "booked" && !booking?.cancelledAt;

  return (
    <>
      <Header title="Trip detail" backHref="/traveler/my-trips" />
      <main className="px-4 py-4 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex justify-between items-start">
            <h2 className="font-semibold text-slate-900">{trip.title}</h2>
            <TripStatusBadge status={status} />
          </div>
          <p className="text-sm text-slate-600 mt-1">{trip.locations.map((l) => l.name).join(" → ")}</p>
          <p className="text-sm text-slate-600 mt-1">Start: {trip.startDate}</p>
          {offer && (
            <p className="mt-2 font-medium text-slate-800">{formatPrice(offer.amount, offer.currency)}</p>
          )}
          {paymentStatus && (
            <div className="mt-2">
              <PaymentStatusBadge status={paymentStatus} />
            </div>
          )}
        </div>
        {supplier && <ProfileCard profile={supplier} href={`/traveler/chat/${trip.id}`} subtitle="Tap to chat" />}
        <div className="flex gap-3">
          {status === "booked" && (
            <>
              <Link href={`/traveler/active-trip/${trip.id}`} className="flex-1">
                <Button variant="outline" fullWidth>View trip</Button>
              </Link>
              {canCancel && (
                <Link href={`/traveler/cancel/${trip.id}`} className="flex-1">
                  <Button variant="danger" fullWidth>Cancel trip</Button>
                </Link>
              )}
            </>
          )}
          {status === "completed" && (
            <Link href={`/traveler/review/${trip.id}`} className="w-full">
              <Button fullWidth>Leave a review</Button>
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
