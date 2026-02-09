"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { TripStatusBadge } from "@/components/StatusBadge";
import { getTripsFeed, getBookingsFeed } from "@/lib/mock-data";
import type { TripStatus } from "@/types";

const TABS: { key: TripStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "booked", label: "Upcoming" },
  { key: "ongoing", label: "Ongoing" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function MyTripsPage() {
  const [tab, setTab] = useState<TripStatus | "all">("all");

  const bookedTripIds = getBookingsFeed().map((b) => b.tripId);
  const myTrips = getTripsFeed().filter(
    (t) => t.travelerId === "u1" || bookedTripIds.includes(t.id)
  ).map((t) => ({
    ...t,
    status: (t.id === "t1" ? "booked" : t.status) as TripStatus,
  }));

  const filtered = tab === "all" ? myTrips : myTrips.filter((t) => t.status === tab);

  return (
    <>
      <Header title="My Trips" />
      <main className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                tab === key ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-4">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <p>{tab === "all" ? "No trips yet." : `No ${tab} trips.`}</p>
              {tab === "all" && (
                <Link href="/traveler/create-trip" className="mt-4">
                  <span className="text-primary-600 font-medium">Create a trip request</span>
                </Link>
              )}
            </div>
          ) : (
            filtered.map((trip) => (
              <Link
                key={trip.id}
                href={`/traveler/trip/${trip.id}`}
                className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-900 line-clamp-1">{trip.title}</h3>
                  <TripStatusBadge status={trip.status} />
                </div>
                <p className="text-sm text-slate-600 mt-1">{trip.locations.map((l) => l.name).join(" → ")}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {trip.startDate} {trip.supplier ? `• ${trip.supplier.name}` : ""}
                </p>
              </Link>
            ))
          )}
        </div>
      </main>
    </>
  );
}
