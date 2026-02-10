"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context";
import { getWallet, getPayouts } from "@/lib/mock-data";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export default function SupplierWalletPage() {
  const { user } = useApp();
  const supplierId = user?.role === "supplier" ? user.id : null;
  const wallet = supplierId ? getWallet(supplierId) : null;
  const payoutList = supplierId ? getPayouts(supplierId) : [];

  if (!wallet) {
    return (
      <>
        <Header title="Wallet" backHref="/supplier" />
        <div className="empty-state">
          <p>Wallet not available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Wallet" backHref="/supplier" />
      <main className="px-4 py-4 space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 p-6 text-white shadow-lg">
          <p className="text-sm text-primary-100 font-medium">Available balance</p>
          <p className="text-2xl font-bold mt-1">{formatPrice(wallet.available, wallet.currency)}</p>
          <p className="text-xs text-primary-200 mt-2">Pending: {formatPrice(wallet.pending, wallet.currency)}</p>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold text-slate-900 mb-2">Total earnings</h3>
          <p className="text-lg font-semibold text-primary-600">{formatPrice(wallet.totalEarnings, wallet.currency)}</p>
        </div>
        <div>
          <h3 className="section-title mb-3">Payout history</h3>
          {payoutList.length === 0 ? (
            <div className="card p-6 text-center text-slate-500 text-sm">No payouts yet.</div>
          ) : (
            <ul className="space-y-2">
              {payoutList.map((p) => (
                <li key={p.id} className="card p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{formatPrice(p.amount, p.currency)}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(p.requestedAt).toLocaleDateString()} • {p.status}
                    </p>
                  </div>
                  <Badge variant={p.status === "completed" ? "success" : p.status === "failed" ? "danger" : "warning"}>
                    {p.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-xs text-slate-500 text-center">
          Payouts are processed weekly. Request from your dashboard when balance is available.
        </p>
      </main>
    </>
  );
}
