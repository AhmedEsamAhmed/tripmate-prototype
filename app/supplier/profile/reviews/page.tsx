"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";

const MOCK_REVIEWS = [
  { id: "r1", rating: 5, comment: "Great guide! Very knowledgeable and friendly.", author: "Alex C.", date: "2025-02-01" },
  { id: "r2", rating: 4, comment: "Smooth trip. Would book again.", author: "Sarah M.", date: "2025-01-15" },
];

export default function SupplierReviewsPage() {
  return (
    <>
      <Header title="Reviews & ratings" backHref="/supplier/profile" />
      <main className="px-4 py-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-bold text-slate-900">4.8</span>
          <div>
            <p className="text-sm text-slate-600">★ ★ ★ ★ ★</p>
            <p className="text-sm text-slate-500">124 reviews</p>
          </div>
        </div>
        <div className="space-y-4">
          {MOCK_REVIEWS.map((r) => (
            <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex justify-between items-start">
                <Badge variant="success">{r.rating} ★</Badge>
                <p className="text-xs text-slate-500">{r.date}</p>
              </div>
              <p className="text-sm text-slate-800 mt-2">{r.comment}</p>
              <p className="text-xs text-slate-500 mt-2">— {r.author}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
