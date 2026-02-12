"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/lib/context";
import { addSocialPost } from "@/lib/social-store";
import { getBookingsFeed } from "@/lib/mock-data";
import { MOCK_SUPPLIERS } from "@/lib/mock-data";
import { useToast } from "@/lib/toast";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
  "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
  "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
];

export default function ExploreCreatePage() {
  const router = useRouter();
  const { user } = useApp();
  const toast = useToast();
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [supplierTaggedId, setSupplierTaggedId] = useState<string | null>(null);
  const [hashtagInput, setHashtagInput] = useState("");
  const [imageCount, setImageCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const bookings = getBookingsFeed();
  const taggedSupplier = supplierTaggedId ? MOCK_SUPPLIERS.find((s) => s.id === supplierTaggedId) : null;

  if (!user || user.role !== "traveler") {
    return (
      <div className="mobile-container px-4 py-6">
        <p className="text-slate-600">Only customers can create posts.</p>
        <Link href="/explore" className="text-primary-600 mt-2 inline-block">Back to feed</Link>
      </div>
    );
  }

  const hashtags = hashtagInput.trim() ? hashtagInput.split(/\s+/).map((h) => h.replace(/^#/, "")) : [];
  const images = PLACEHOLDER_IMAGES.slice(0, Math.min(imageCount, 5));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) {
      toast.show("Please add a caption.", "error");
      return;
    }
    setSubmitting(true);
    addSocialPost({
      userId: user.id,
      userDisplayName: user.name,
      userAvatar: user.avatar,
      location: location.trim() || "Unknown",
      caption: caption.slice(0, 2000).trim(),
      images,
      supplierTaggedId,
      hashtags,
    });
    toast.show("Post created!", "success");
    setSubmitting(false);
    router.push("/explore");
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/explore" className="text-slate-600">← Back</Link>
        <h1 className="text-lg font-semibold text-slate-900">New post</h1>
        <span />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={2000}
            placeholder="Share your experience..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base min-h-[120px] resize-none"
          />
          <p className="text-xs text-slate-500 mt-1">{caption.length}/2000</p>
        </div>
        <Input label="Location" placeholder="e.g. Bali, Indonesia" value={location} onChange={(e) => setLocation(e.target.value)} />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tag a supplier (from your bookings)</label>
          <select
            value={supplierTaggedId ?? ""}
            onChange={(e) => setSupplierTaggedId(e.target.value || null)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base"
          >
            <option value="">None</option>
            {bookings.map((b) => {
              const s = MOCK_SUPPLIERS.find((x) => x.id === b.supplierId);
              return s ? <option key={b.id} value={s.id}>{s.name}</option> : null;
            })}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Hashtags (space separated)</label>
          <input
            type="text"
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            placeholder="#Bali #Travel"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Number of images (1–5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={imageCount}
            onChange={(e) => setImageCount(parseInt(e.target.value, 10) || 1)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base"
          />
        </div>
        <Button type="submit" fullWidth disabled={submitting}>
          {submitting ? "Posting…" : "Post"}
        </Button>
      </form>
    </div>
  );
}
