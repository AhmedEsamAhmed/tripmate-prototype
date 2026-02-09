"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";
import { getTripsFeed } from "@/lib/mock-data";
import { useApp } from "@/lib/context";

export default function SupplierMyTripsPage() {
  const { user } = useApp();
  const isDriver = user?.supplierType === "driver";
  const myTrips = getTripsFeed().filter((t) => t.supplierId === "s1" || (t.type === "pre_designed" && t.supplierId === user?.id));

  return (
    <>
      <Header title="My trips" />
      <main className="px-4 py-4">
        {!isDriver && (
          <Link
            href="/supplier/create-trip"
            className="block mb-4 rounded-xl border-2 border-dashed border-primary-300 bg-primary-50/50 p-4 text-center text-primary-600 font-medium"
          >
            + Create pre-designed trip
          </Link>
        )}
        <p className="text-slate-600 text-sm mb-4">
          Trips you’re leading and trips you’ve published.
        </p>
        {myTrips.length === 0 ? (
          <div className="empty-state">
            <p>No trips yet.</p>
            {!isDriver && (
              <Link href="/supplier/create-trip" className="mt-4">
                <span className="text-primary-600 font-medium">Create a trip</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {myTrips.map((trip) => (
              <Link
                key={trip.id}
                href={`/supplier/active-trip/${trip.id}`}
                className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900 line-clamp-1">{trip.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{trip.locations.map((l) => l.name).join(" → ")}</p>
                <Badge variant="info" className="mt-2">{trip.status}</Badge>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
