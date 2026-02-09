"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";

const MOCK_NOTIFICATIONS = [
  { id: "n1", type: "new_request", title: "New trip request", body: "Bali 3-day cultural tour matches your profile.", time: "2h ago", read: false },
  { id: "n2", type: "booking", title: "Booking confirmed", body: "Alex Chen paid for Bali 3-day tour. Trip on Mar 15.", time: "1d ago", read: true },
  { id: "n3", type: "reminder", title: "Trip tomorrow", body: "Bali 3-day cultural tour starts tomorrow. Confirm pickup time.", time: "1d ago", read: true },
];

export default function SupplierNotificationsPage() {
  return (
    <>
      <Header title="Notifications" backHref="/supplier" />
      <main className="px-4 py-4">
        <p className="text-slate-600 text-sm mb-4">
          New requests, negotiation updates, bookings, and reminders.
        </p>
        <div className="space-y-2">
          {MOCK_NOTIFICATIONS.map((n) => (
            <Link
              key={n.id}
              href={n.type === "new_request" ? "/supplier/requests" : "/supplier"}
              className={`block rounded-2xl border border-slate-200 bg-white p-4 ${!n.read ? "border-l-4 border-l-primary-500" : ""}`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-slate-900">{n.title}</h3>
                {!n.read && <Badge variant="info">New</Badge>}
              </div>
              <p className="text-sm text-slate-600 mt-1">{n.body}</p>
              <p className="text-xs text-slate-500 mt-2">{n.time}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
