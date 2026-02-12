"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { NetworkPostCard } from "@/components/network/NetworkPostCard";
import { getNetworkPosts, getNetworkComments, addNetworkComment } from "@/lib/network-store";
import { useApp } from "@/lib/context";
import type { SupplierNetworkPost, SupplierNetworkPostType } from "@/types/network";
import { Modal } from "@/components/ui/Modal";

const POST_TYPES: { value: SupplierNetworkPostType; label: string }[] = [
  { value: "update", label: "Update" },
  { value: "collaboration_request", label: "Collaboration Request" },
  { value: "driver_needed", label: "Driver Needed" },
  { value: "guide_needed", label: "Tour Guide Needed" },
  { value: "referral_opportunity", label: "Referral Opportunity" },
  { value: "news", label: "News" },
  { value: "question", label: "Question" },
];

export default function SupplierNetworkPage() {
  const { user } = useApp();
  const [posts, setPosts] = useState<SupplierNetworkPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [regionFilter, setRegionFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [postTypeFilter, setPostTypeFilter] = useState<SupplierNetworkPostType | "">("");
  const [commentPostId, setCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setLoading(true);
    const next = getNetworkPosts({
      region: regionFilter || undefined,
      role: roleFilter || undefined,
      postType: postTypeFilter || undefined,
      limit: 30,
    });
    setPosts(next);
    setLoading(false);
  }, [regionFilter, roleFilter, postTypeFilter]);

  const comments = commentPostId ? getNetworkComments(commentPostId) : [];

  const handleSubmitComment = () => {
    if (!commentPostId || !user || !commentText.trim()) return;
    const name = user.name || "Supplier";
    addNetworkComment(commentPostId, user.id, name, commentText.trim());
    setPosts((prev) =>
      prev.map((p) => (p.id === commentPostId ? { ...p, commentsCount: p.commentsCount + 1 } : p))
    );
    setCommentPostId(null);
    setCommentText("");
  };

  return (
    <>
      <Header title="Network" backHref="/supplier" />
      <main className="px-4 py-4 space-y-4">
        <Link
          href="/supplier/network/create"
          className="block rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center text-slate-600 font-medium hover:border-primary-300 hover:bg-primary-50/50"
        >
          Create a post
        </Link>

        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Region"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm w-24"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">All roles</option>
            <option value="driver">Driver</option>
            <option value="tour_guide">Guide</option>
            <option value="tour_agency">Agency</option>
          </select>
          <select
            value={postTypeFilter}
            onChange={(e) => setPostTypeFilter(e.target.value as SupplierNetworkPostType | "")}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">All types</option>
            {POST_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Link href="/supplier/network/connections" className="text-sm text-primary-600 font-medium">
            Connections
          </Link>
          <Link href="/supplier/network/messages" className="text-sm text-primary-600 font-medium">
            Messages
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 animate-pulse">
                <div className="h-12 w-12 rounded-xl bg-slate-200" />
                <div className="mt-3 h-4 bg-slate-200 rounded w-3/4" />
                <div className="mt-3 h-20 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts yet.</p>
            <p className="text-sm mt-1">Create a post or adjust filters.</p>
          </div>
        ) : (
          <div className="space-y-4 pb-6">
            {posts.map((post) => (
              <NetworkPostCard
                key={post.id}
                post={post}
                currentSupplierId={user?.id}
                onComment={() => setCommentPostId(post.id)}
                onConnect={() => {}}
                onMessage={() => {}}
              />
            ))}
          </div>
        )}
      </main>

      <Modal isOpen={!!commentPostId} onClose={() => { setCommentPostId(null); setCommentText(""); }} title="Comments">
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {comments.map((c) => (
            <div key={c.id}>
              <span className="font-medium text-slate-800">{c.supplierName}</span>
              <p className="text-slate-600 text-sm">{c.comment}</p>
            </div>
          ))}
        </div>
        {user && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              maxLength={500}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm"
            />
            <button
              type="button"
              onClick={handleSubmitComment}
              disabled={!commentText.trim()}
              className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Post
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
