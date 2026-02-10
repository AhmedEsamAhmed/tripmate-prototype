"use client";

import { Header } from "@/components/Header";
import { getBookingsFeed, getTripsFeed } from "@/lib/mock-data";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

export default function PaymentHistoryPage() {
  const history = getBookingsFeed().map((b) => {
    const trip = getTripsFeed().find((t) => t.id === b.tripId);
    return { ...b, trip };
  });

  return (
    <>
      <Header title="Payment history" backHref="/traveler/profile" />
      <main className="px-4 py-4">
        <p className="text-slate-600 text-sm mb-4">Your past payments.</p>
        {history.length === 0 ? (
          <div className="empty-state">
            <p>No payments yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((h) => (
              <div key={h.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="font-semibold text-slate-900">{h.trip?.title ?? "Trip"}</h3>
                <p className="text-sm text-slate-600 mt-1">{formatPrice(h.amount)} • {h.paymentStatus}</p>
                <p className="text-xs text-slate-500 mt-1">{new Date(h.bookedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
