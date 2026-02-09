"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";
import { getTripsFeed } from "@/lib/mock-data";

export default function SupplierRequestsPage() {
  const requests = getTripsFeed().filter((t) => t.type === "request" && t.status === "published");

  return (
    <>
      <Header title="Trip requests" />
      <main className="px-4 py-4">
        <p className="text-slate-600 text-sm mb-4">
          Trip requests from travelers. Submit an offer to start negotiation.
        </p>
        {requests.length === 0 ? (
          <div className="empty-state">
            <p>No new requests.</p>
            <p className="text-sm mt-2">New trip requests will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((trip) => (
              <Link
                key={trip.id}
                href={`/supplier/request/${trip.id}`}
                className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900 line-clamp-1">{trip.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{trip.locations.map((l) => l.name).join(" → ")}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {trip.durationDays ? `${trip.durationDays} days` : trip.durationHours ? `${trip.durationHours} hr` : "—"} • {trip.serviceType ?? "—"}
                </p>
                <Badge variant="info" className="mt-2">New request</Badge>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
