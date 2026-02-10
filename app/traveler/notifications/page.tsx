"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context";
import { getNotifications } from "@/lib/mock-data";

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffM = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffMs / 86400000);
  if (diffM < 60) return `${diffM}m ago`;
  if (diffH < 24) return `${diffH}h ago`;
  if (diffD < 7) return `${diffD}d ago`;
  return d.toLocaleDateString();
}

export default function TravelerNotificationsPage() {
  const { user } = useApp();
  const notifications = user?.id ? getNotifications(user.id) : [];

  return (
    <>
      <Header title="Notifications" backHref="/traveler" />
      <main className="px-4 py-4">
        <p className="text-slate-600 text-sm mb-4">
          Booking confirmations, new offers, and trip reminders.
        </p>
        {notifications.length === 0 ? (
          <div className="empty-state">
            <p>No notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <Link
                key={n.id}
                href={n.link ?? "/traveler"}
                className={`block rounded-2xl border border-slate-200 bg-white p-4 ${!n.read ? "border-l-4 border-l-primary-500" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-900">{n.title}</h3>
                  {!n.read && <Badge variant="info">New</Badge>}
                </div>
                <p className="text-sm text-slate-600 mt-1">{n.body}</p>
                <p className="text-xs text-slate-500 mt-2">{timeAgo(n.createdAt)}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
