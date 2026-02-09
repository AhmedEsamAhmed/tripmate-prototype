"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { TripCard } from "@/components/TripCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getTripsFeed } from "@/lib/mock-data";

export default function TravelerHomePage() {
  const [locationFilter, setLocationFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTrips = getTripsFeed().filter((trip) => {
    if (locationFilter && !trip.locations.some((l) => l.name.toLowerCase().includes(locationFilter.toLowerCase())))
      return false;
    if (durationFilter) {
      const d = trip.durationDays ?? trip.durationHours ?? 0;
      if (durationFilter === "1" && d > 1) return false;
      if (durationFilter === "2-3" && (d < 2 || d > 3)) return false;
      if (durationFilter === "4+" && d < 4) return false;
    }
    return true;
  });

  return (
    <>
      <Header
        title="ViaJalan"
        rightAction={
          <Link
            href="/traveler/create-trip"
            className="touch-target rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 transition-colors"
          >
            + Request trip
          </Link>
        }
      />
      <main className="px-4 py-5">
        <p className="text-slate-600 text-sm mb-5 leading-relaxed">
          Trip requests and pre-designed tours. Filter or create your own.
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
              showFilters ? "bg-primary-100 text-primary-700" : "bg-white text-slate-700 border border-slate-200 shadow-sm"
            }`}
          >
            {showFilters ? "▲ Filters" : "▼ Filters"}
          </button>
          {showFilters && (
            <div className="flex gap-2 w-full flex-wrap">
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="flex-1 min-w-[140px]"
              />
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
              >
                <option value="">Duration</option>
                <option value="1">1 day</option>
                <option value="2-3">2–3 days</option>
                <option value="4+">4+ days</option>
              </select>
            </div>
          )}
        </div>
        <div className="space-y-4">
          {filteredTrips.length === 0 ? (
            <div className="empty-state">
              <p>No trips match your filters.</p>
              <Link href="/traveler/create-trip" className="mt-4">
                <Button variant="outline">Create a trip request</Button>
              </Link>
            </div>
          ) : (
            filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                href={`/traveler/trip/${trip.id}`}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}
