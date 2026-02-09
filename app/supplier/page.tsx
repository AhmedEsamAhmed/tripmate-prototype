"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context";
import { getTripsFeed } from "@/lib/mock-data";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

export default function SupplierDashboardPage() {
  const { user } = useApp();
  const earningsThisMonth = 3600000; // mock
  const upcomingTrips = getTripsFeed().filter((t) => t.supplierId === "s1" && t.status === "booked").length;
  const completedTrips = 12; // mock
  const cancelledTrips = 1; // mock
  const canCreateTrip = user?.supplierType && user.supplierType !== "driver";

  return (
    <>
      <Header title="Dashboard" />
      <main className="px-4 py-4 space-y-6">
        {canCreateTrip && (
          <Link
            href="/supplier/create-trip"
            className="block rounded-2xl border-2 border-dashed border-primary-300 bg-primary-50/50 p-4 text-center text-primary-600 font-semibold hover:bg-primary-100/50 transition-colors"
          >
            + Create pre-designed trip
          </Link>
        )}
        <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 p-6 text-white shadow-lg shadow-primary-600/20">
          <p className="text-sm text-primary-100 font-medium">Earnings this month</p>
          <p className="text-2xl font-bold mt-1 tracking-tight">{formatPrice(earningsThisMonth)}</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Link href="/supplier/requests" className="card card-interactive p-4 text-center">
            <p className="text-2xl font-semibold text-slate-900">{upcomingTrips}</p>
            <p className="text-sm text-slate-600 mt-1">Upcoming</p>
          </Link>
          <div className="card p-4 text-center">
            <p className="text-2xl font-semibold text-slate-900">{completedTrips}</p>
            <p className="text-sm text-slate-600 mt-1">Completed</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-semibold text-slate-900">{cancelledTrips}</p>
            <p className="text-sm text-slate-600 mt-1">Cancelled</p>
          </div>
        </div>
        <div>
          <h2 className="section-title mb-3">Upcoming trips</h2>
          {upcomingTrips === 0 ? (
            <div className="card p-8 text-center text-slate-500 text-sm">
              No upcoming trips. Check trip requests.
            </div>
          ) : (
            <Link href="/supplier/requests" className="block card card-interactive p-4">
              <h3 className="font-semibold text-slate-900">Bali 3-day cultural tour</h3>
              <p className="text-sm text-slate-600 mt-1">Mar 15–17 • Booked</p>
              <Badge variant="success" className="mt-2">Confirmed</Badge>
            </Link>
          )}
        </div>
        <Link href="/supplier/notifications" className="block text-center text-primary-600 font-medium">
          View notifications
        </Link>
      </main>
    </>
  );
}
