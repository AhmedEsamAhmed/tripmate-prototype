"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/context";
import { addNetworkPost } from "@/lib/network-store";
import type { SupplierNetworkPostType } from "@/types/network";
import { useToast } from "@/lib/toast";

const POST_TYPES: { value: SupplierNetworkPostType; label: string }[] = [
  { value: "update", label: "Update" },
  { value: "collaboration_request", label: "Collaboration Request" },
  { value: "driver_needed", label: "Driver Needed" },
  { value: "guide_needed", label: "Tour Guide Needed" },
  { value: "referral_opportunity", label: "Referral Opportunity" },
  { value: "news", label: "News" },
  { value: "question", label: "Question" },
];

export default function NetworkCreatePage() {
  const router = useRouter();
  const { user } = useApp();
  const toast = useToast();
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState<SupplierNetworkPostType>("update");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user || user.role !== "supplier") {
    return (
      <div className="px-4 py-6">
        <p className="text-slate-600">Access denied.</p>
        <Link href="/supplier/network" className="text-primary-600 mt-2 inline-block">Back</Link>
      </div>
    );
  }

  const supplierType = user.supplierType ?? "tour_guide";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.show("Please add content.", "error");
      return;
    }
    setSubmitting(true);
    addNetworkPost({
      supplierId: user.id,
      supplierName: user.name,
      supplierType,
      postType,
      content: content.slice(0, 2000).trim(),
      media: [],
      location: location.trim() || null,
    });
    toast.show("Post created!", "success");
    setSubmitting(false);
    router.push("/supplier/network");
  };

  return (
    <>
      <Header title="New post" backHref="/supplier/network" />
      <main className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Post type</label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value as SupplierNetworkPostType)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base"
            >
              {POST_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={2000}
              placeholder="Share an update, request collaboration..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base min-h-[140px] resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">{content.length}/2000</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location (optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bali"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base"
            />
          </div>
          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? "Posting…" : "Post"}
          </Button>
        </form>
      </main>
    </>
  );
}
