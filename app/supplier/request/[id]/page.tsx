"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { getTripsFeed } from "@/lib/mock-data";

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const trip = getTripsFeed().find((t) => t.id === id);

  if (!trip) {
    return (
      <>
        <Header title="Request" backHref="/supplier/requests" />
        <div className="empty-state"><p>Request not found.</p></div>
      </>
    );
  }

  return (
    <>
      <Header title="Trip request" backHref="/supplier/requests" />
      <main className="px-4 py-4 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-900">{trip.title}</h2>
          <p className="text-sm text-slate-600 mt-1">{trip.locations.map((l) => l.name).join(" → ")}</p>
          <p className="text-sm text-slate-600 mt-1">Start: {trip.startDate}</p>
          <p className="text-sm text-slate-600 mt-1">
            Duration: {trip.durationDays ? `${trip.durationDays} days` : trip.durationHours ? `${trip.durationHours} hr` : "—"}
          </p>
          <p className="text-sm text-slate-600 mt-1">Service: {trip.serviceType ?? "—"}</p>
          {trip.notes && (
            <p className="text-sm text-slate-600 mt-2 border-t border-slate-100 pt-2">Notes: {trip.notes}</p>
          )}
        </div>
        <Button fullWidth onClick={() => router.push(`/supplier/offer/${trip.id}`)}>
          Submit offer
        </Button>
      </main>
    </>
  );
}
