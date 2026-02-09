"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function RefundStatusPage() {
  const status = "processing"; // mock: full | partial | processing | none

  return (
    <>
      <Header title="Refund status" backHref="/traveler/my-trips" />
      <main className="px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={status === "processing" ? "warning" : "success"}>
              {status === "processing" ? "Processing" : "Refunded"}
            </Badge>
          </div>
          <h2 className="font-semibold text-slate-900">Trip cancelled</h2>
          <p className="text-sm text-slate-600 mt-2">
            {status === "processing"
              ? "Your refund is being processed. It will appear in your original payment method within 5–10 business days."
              : "Your refund has been processed."}
          </p>
        </div>
        <Link href="/traveler/my-trips" className="block mt-6">
          <Button fullWidth>Back to my trips</Button>
        </Link>
      </main>
    </>
  );
}
