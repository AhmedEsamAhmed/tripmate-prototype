"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context";
import { getTripsFeed, getWallet } from "@/lib/mock-data";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

export default function SupplierDashboardPage() {
  const { user } = useApp();
  const wallet = user?.id ? getWallet(user.id) : null;
  const earningsThisMonth = wallet?.totalEarnings ?? 3600000;
  const upcomingTrips = getTripsFeed().filter((t) => t.supplierId === user?.id && (t.status === "booked" || t.status === "ongoing")).length;
  const completedTrips = getTripsFeed().filter((t) => t.supplierId === user?.id && t.status === "completed").length;
  const cancelledTrips = getTripsFeed().filter((t) => t.supplierId === user?.id && t.status === "cancelled").length;
  const canCreateTrip = user?.supplierType && user.supplierType !== "driver";

  return (
    <>
      <Header title="Dashboard" />
      <main className="px-4 py-4 space-y-6 animate-fade-in">
        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/supplier/wallet" className="card card-interactive p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2h-2m-4-1V7a2 2 0 012-2h2a2 2 0 012 2v1" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Wallet</p>
              <p className="text-xs text-slate-500">Balance & payouts</p>
            </div>
          </Link>
          <Link href="/supplier/verification-status" className="card card-interactive p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent-100 flex items-center justify-center text-accent-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Verification</p>
              <p className="text-xs text-slate-500">Check status</p>
            </div>
          </Link>
          <Link href="/supplier/requests" className="card card-interactive p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Requests</p>
              <p className="text-xs text-slate-500">Trip requests</p>
            </div>
          </Link>
          <Link href="/supplier/my-trips" className="card card-interactive p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent-100 flex items-center justify-center text-accent-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Bookings</p>
              <p className="text-xs text-slate-500">My trips</p>
            </div>
          </Link>
        </div>

        {canCreateTrip && (
          <Link
            href="/supplier/create-trip"
            className="block rounded-2xl border-2 border-dashed border-primary-300 bg-primary-50/50 p-4 text-center text-primary-600 font-semibold hover:bg-primary-100/50 transition-colors"
          >
            + Create & post a package trip
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
            <Link href="/supplier/my-trips" className="block card card-interactive p-4">
              <h3 className="font-semibold text-slate-900">Bali 3-day cultural tour</h3>
              <p className="text-sm text-slate-600 mt-1">Mar 15–17 • Booked</p>
              <Badge variant="success" className="mt-2">Confirmed</Badge>
            </Link>
          )}
        </div>

        <Link href="/supplier/notifications" className="block text-center text-primary-600 font-medium">
          View all notifications
        </Link>
      </main>
    </>
  );
}
