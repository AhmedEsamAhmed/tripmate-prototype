"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getTripsFeed } from "@/lib/mock-data";

export default function SubmitOfferPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const trip = getTripsFeed().find((t) => t.id === id);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  if (!trip) {
    return (
      <>
        <Header title="Submit offer" backHref="/supplier/requests" />
        <div className="empty-state"><p>Trip not found.</p></div>
      </>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseInt(amount.replace(/\D/g, ""), 10) <= 0) return;
    router.push(`/supplier/negotiation/${trip.id}`);
  };

  return (
    <>
      <Header title="Submit offer" backHref={`/supplier/request/${id}`} />
      <main className="px-4 py-4 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-900">{trip.title}</h2>
          <p className="text-sm text-slate-600 mt-1">{trip.locations.map((l) => l.name).join(" → ")}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Your price (IDR)"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 1200000"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself or add details…"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base resize-none h-24"
              maxLength={500}
            />
          </div>
          <Button type="submit" fullWidth disabled={!amount || parseInt(amount.replace(/\D/g, ""), 10) <= 0}>
            Send offer
          </Button>
        </form>
      </main>
    </>
  );
}
