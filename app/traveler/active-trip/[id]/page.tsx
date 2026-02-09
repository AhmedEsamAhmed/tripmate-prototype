"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TripTracking } from "@/components/TripTracking";
import { getTripsFeed, MOCK_SUPPLIERS } from "@/lib/mock-data";
import { MOCK_TRACKING_POINTS } from "@/lib/demo-store";

export default function ActiveTripPage() {
  const params = useParams();
  const id = params.id as string;
  const trip = getTripsFeed().find((t) => t.id === id);
  const supplier = trip?.supplier ?? MOCK_SUPPLIERS[0];
  const [showSupport, setShowSupport] = useState(false);

  if (!trip) {
    return (
      <>
        <Header title="Active trip" backHref="/traveler/my-trips" />
        <div className="empty-state"><p>Trip not found.</p></div>
      </>
    );
  }

  return (
    <>
      <Header title="Active trip" backHref={`/traveler/trip/${id}`} />
      <main className="px-4 py-4 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-900">{trip.title}</h2>
          <p className="text-sm text-slate-600 mt-1">{trip.locations.map((l) => l.name).join(" → ")}</p>
          <p className="text-sm text-slate-600 mt-1">Today • In progress</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 mb-2">LIVE TRACKING</p>
          <TripTracking
            points={
              trip.locations.some((l) => l.lat != null)
                ? trip.locations.map((l, i) => ({
                    lat: l.lat ?? 0,
                    lng: l.lng ?? 0,
                    label: l.name,
                    time: `${8 + i}:00`,
                  }))
                : MOCK_TRACKING_POINTS
            }
            height={220}
          />
        </div>
        {supplier && <ProfileCard profile={supplier} href={`/traveler/chat/${id}`} subtitle="Chat with supplier" />}
        <div className="flex flex-col gap-3">
          <Link href={`/traveler/chat/${id}`}>
            <Button variant="outline" fullWidth>Open chat</Button>
          </Link>
          <Button
            fullWidth
            onClick={() => setShowSupport(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Support during trip
          </Button>
        </div>
      </main>
      <Modal
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
        title="Support during trip"
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            Need help? Use these options to get support from ViaJalan.
          </p>
          <a href="tel:+62123456789">
            <Button fullWidth>Call ViaJalan support</Button>
          </a>
          <Button variant="secondary" fullWidth onClick={() => setShowSupport(false)}>
            Report an issue (we will follow up)
          </Button>
          <Link href={`/traveler/chat/${id}`} onClick={() => setShowSupport(false)}>
            <Button variant="outline" fullWidth>Message supplier in chat</Button>
          </Link>
          <p className="text-xs text-slate-500">
            We’ll follow up within 24 hours. For immediate danger, contact local services: 112 (Indonesia).
          </p>
        </div>
      </Modal>
    </>
  );
}
