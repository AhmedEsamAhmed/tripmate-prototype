"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { ConfirmModal } from "@/components/ui/Modal";
import { Modal } from "@/components/ui/Modal";
import { TripTracking } from "@/components/TripTracking";
import { getTripsFeed } from "@/lib/mock-data";
import { MOCK_TRACKING_POINTS } from "@/lib/demo-store";

export default function SupplierActiveTripPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const trip = getTripsFeed().find((t) => t.id === id);
  const [started, setStarted] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  if (!trip) {
    return (
      <>
        <Header title="Active trip" backHref="/supplier" />
        <div className="empty-state"><p>Trip not found.</p></div>
      </>
    );
  }

  const handleStart = () => setStarted(true);
  const handleEnd = () => {
    setShowEndConfirm(false);
    router.push("/supplier");
  };

  const trackingPoints = trip.locations.some((l) => l.lat != null)
    ? trip.locations.map((l, i) => ({
        lat: l.lat ?? 0,
        lng: l.lng ?? 0,
        label: l.name,
        time: `${8 + i}:00`,
      }))
    : MOCK_TRACKING_POINTS;

  return (
    <>
      <Header title="Active trip" backHref="/supplier" />
      <main className="px-4 py-4 space-y-6">
        <div className="card">
          <h2 className="font-semibold text-slate-900">{trip.title}</h2>
          <p className="text-sm text-slate-600 mt-1">{trip.locations.map((l) => l.name).join(" → ")}</p>
          <p className="text-sm text-slate-600 mt-1">Start: {trip.startDate}</p>
          <p className="text-sm text-slate-500 mt-2">{started ? "Trip in progress" : "Not started"}</p>
        </div>
        {started && (
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">LIVE TRACKING</p>
            <TripTracking points={trackingPoints} height={200} />
          </div>
        )}
        {!started && (
          <div className="rounded-2xl border border-slate-200 bg-slate-100 h-40 flex items-center justify-center text-slate-500 text-sm">
            Start the trip to see live tracking.
          </div>
        )}
        <div className="flex flex-col gap-3">
          {!started ? (
            <Button fullWidth onClick={handleStart}>
              Start trip
            </Button>
          ) : (
            <>
              <Button
                fullWidth
                onClick={() => setShowSupport(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                Support
              </Button>
              <Button variant="danger" fullWidth onClick={() => setShowEndConfirm(true)}>
                End trip
              </Button>
            </>
          )}
        </div>
      </main>
      <Modal isOpen={showSupport} onClose={() => setShowSupport(false)} title="Support">
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">Need help during the trip?</p>
          <a href="tel:+62123456789">
            <Button fullWidth>Call TripuLike support</Button>
          </a>
          <Button variant="secondary" fullWidth onClick={() => setShowSupport(false)}>
            Close
          </Button>
        </div>
      </Modal>
      <ConfirmModal
        isOpen={showEndConfirm}
        onClose={() => setShowEndConfirm(false)}
        onConfirm={handleEnd}
        title="End trip?"
        message="Confirm that this trip has ended. The traveler will be notified."
        confirmLabel="End trip"
        variant="primary"
      />
    </>
  );
}
