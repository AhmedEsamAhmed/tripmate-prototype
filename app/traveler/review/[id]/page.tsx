"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { getTripsFeed } from "@/lib/mock-data";

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const trip = getTripsFeed().find((t) => t.id === id);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!trip) {
    return (
      <>
        <Header title="Leave a review" backHref="/traveler/my-trips" />
        <div className="empty-state"><p>Trip not found.</p></div>
      </>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) return;
    setSubmitted(true);
    setTimeout(() => router.push("/traveler/my-trips"), 1500);
  };

  if (submitted) {
    return (
      <div className="mobile-container flex min-h-screen flex-col items-center justify-center px-8 bg-white">
        <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <svg className="h-8 w-8 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-slate-900 text-center">Review submitted</h1>
        <p className="mt-2 text-center text-slate-600">Thank you for your feedback.</p>
      </div>
    );
  }

  return (
    <>
      <Header title="Leave a review" backHref={`/traveler/trip/${id}`} />
      <main className="px-4 py-6">
        <p className="text-slate-600 text-sm mb-4">How was your trip: {trip.title}?</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="touch-target text-2xl text-slate-300 hover:text-amber-400 focus:text-amber-400"
                >
                  {rating >= star ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience…"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base resize-none h-24"
              maxLength={500}
            />
          </div>
          <Button type="submit" fullWidth disabled={rating < 1}>
            Submit review
          </Button>
        </form>
      </main>
    </>
  );
}
