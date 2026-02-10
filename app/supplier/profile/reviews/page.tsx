"use client";

import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context";
import { getReviews } from "@/lib/mock-data";

export default function SupplierReviewsPage() {
  const { user } = useApp();
  const reviews = user?.id ? getReviews(user.id) : [];
  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <>
      <Header title="Reviews & ratings" backHref="/supplier/profile" />
      <main className="px-4 py-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-bold text-slate-900">{avgRating.toFixed(1)}</span>
          <div>
            <p className="text-sm text-slate-600">★ ★ ★ ★ ★</p>
            <p className="text-sm text-slate-500">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        {reviews.length === 0 ? (
          <div className="empty-state">
            <p>No reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex justify-between items-start">
                  <Badge variant="success">{r.rating} ★</Badge>
                  <p className="text-xs text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
                {r.comment && <p className="text-sm text-slate-800 mt-2">{r.comment}</p>}
                <p className="text-xs text-slate-500 mt-2">— Traveler</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
