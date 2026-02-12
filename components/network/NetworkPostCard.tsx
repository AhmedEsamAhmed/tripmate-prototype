"use client";

import Link from "next/link";
import type { SupplierNetworkPost, SupplierNetworkPostType } from "@/types/network";

const POST_TYPE_LABEL: Record<SupplierNetworkPostType, string> = {
  update: "Update",
  collaboration_request: "Collaboration Request",
  driver_needed: "Driver Needed",
  guide_needed: "Tour Guide Needed",
  referral_opportunity: "Referral Opportunity",
  news: "News",
  question: "Question",
};

const ROLE_COLOR: Record<string, string> = {
  driver: "bg-blue-100 text-blue-800",
  tour_guide: "bg-emerald-100 text-emerald-800",
  tour_agency: "bg-purple-100 text-purple-800",
};

interface NetworkPostCardProps {
  post: SupplierNetworkPost;
  currentSupplierId: string | undefined;
  onComment: () => void;
  onConnect: () => void;
  onMessage: () => void;
}

export function NetworkPostCard({ post, onComment, onConnect, onMessage }: NetworkPostCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
          {post.supplierLogo ? (
            <img src={post.supplierLogo} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="h-full w-full flex items-center justify-center text-slate-600 font-semibold text-lg">
              {post.supplierName.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900">{post.supplierName}</p>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLOR[post.supplierType] ?? "bg-slate-100 text-slate-700"}`}>
              {post.supplierType === "driver" ? "Driver" : post.supplierType === "tour_guide" ? "Guide" : "Agency"}
            </span>
            <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700">
              {POST_TYPE_LABEL[post.postType]}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-700 whitespace-pre-wrap">{post.content}</p>
      {post.media?.length > 0 && (
        <div className="mt-3 rounded-xl overflow-hidden aspect-video bg-slate-100">
          <img src={post.media[0]} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      {post.location && (
        <p className="mt-2 text-xs text-slate-500">📍 {post.location}</p>
      )}
      <div className="mt-4 flex items-center gap-4 text-sm">
        <button type="button" onClick={onComment} className="flex items-center gap-1 text-slate-600 font-medium">
          💬 {post.commentsCount}
        </button>
        <button type="button" onClick={onConnect} className="flex items-center gap-1 text-primary-600 font-medium">
          Connect
        </button>
        <button type="button" onClick={onMessage} className="flex items-center gap-1 text-slate-600 font-medium">
          Message
        </button>
      </div>
    </article>
  );
}
