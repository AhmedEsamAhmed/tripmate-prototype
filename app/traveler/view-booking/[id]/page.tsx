"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { ProfileCard } from "@/components/ProfileCard";
import { PaymentStatusBadge, TripStatusBadge } from "@/components/StatusBadge";
import { getTripsFeed, getOffersFeed, getBookingsFeed } from "@/lib/mock-data";
import { MOCK_SUPPLIERS } from "@/lib/mock-data";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ViewBookingPage() {
  const params = useParams();
  const tripId = params.id as string;
  const trip = getTripsFeed().find((t) => t.id === tripId);
  const booking = getBookingsFeed().find((b) => b.tripId === tripId);
  const offer = getOffersFeed().find((o) => o.tripId === tripId);
  const supplier = trip?.supplier ?? (offer ? MOCK_SUPPLIERS.find((s) => s.id === offer.supplierId) : undefined);

  if (!trip) {
    return (
      <>
        <Header title="View booking" backHref="/traveler/my-trips" />
        <div className="empty-state">
          <p>Booking not found.</p>
          <Link href="/traveler/my-trips">Back to my trips</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Your booking" backHref="/traveler/my-trips" />
      <main className="px-4 py-4 space-y-6 animate-fade-in">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">{trip.title}</h2>
            {booking && <TripStatusBadge status="booked" />}
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {trip.locations.map((l) => l.name).join(" → ")}
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Start date</dt>
              <dd className="font-medium text-slate-800">{formatDate(trip.startDate)}</dd>
            </div>
            {trip.endDate && (
              <div className="flex justify-between">
                <dt className="text-slate-500">End date</dt>
                <dd className="font-medium text-slate-800">{formatDate(trip.endDate)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-slate-500">Duration</dt>
              <dd className="font-medium text-slate-800">
                {trip.durationDays ? `${trip.durationDays} day(s)` : trip.durationHours ? `${trip.durationHours} hr` : "—"}
              </dd>
            </div>
            {offer && (
              <div className="flex justify-between pt-2 border-t border-slate-100">
                <dt className="text-slate-500">Total amount</dt>
                <dd className="font-semibold text-primary-600">{formatPrice(offer.amount, offer.currency)}</dd>
              </div>
            )}
          </dl>
          {booking && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-600">Payment</span>
              <PaymentStatusBadge status={booking.paymentStatus} />
            </div>
          )}
        </div>

        {supplier && (
          <ProfileCard
            profile={supplier}
            href={`/traveler/chat/${tripId}`}
            subtitle="Chat with your supplier"
          />
        )}

        {trip.itinerary && trip.itinerary.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Itinerary</h3>
            <ul className="space-y-2">
              {trip.itinerary.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-primary-600 font-medium">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-3">
          <Link href={`/traveler/trip/${tripId}`} className="flex-1">
            <Button variant="outline" fullWidth>Trip details</Button>
          </Link>
          <Link href={`/traveler/chat/${tripId}`} className="flex-1">
            <Button fullWidth>Chat</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
