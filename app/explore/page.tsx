"use client";

import { useState, useEffect } from "react";
import { SocialPostCard } from "@/components/social/SocialPostCard";
import { TrendingDestinations } from "@/components/social/TrendingDestinations";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { getSocialPosts, getSocialComments, hasLiked, hasSaved, toggleSocialLike, toggleSocialSave, addSocialComment } from "@/lib/social-store";
import { useApp } from "@/lib/context";
import type { SocialPost } from "@/types/network";

export default function ExplorePage() {
  const { user } = useApp();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [selectedTrending, setSelectedTrending] = useState<string | undefined>();
  const [commentPostId, setCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commenting, setCommenting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loc = locationFilter || undefined;
    const tag = tagFilter || selectedTrending || undefined;
    const next = getSocialPosts({ location: loc, tag, limit: 30 });
    setPosts(next);
    setLoading(false);
  }, [locationFilter, tagFilter, selectedTrending]);

  const handleLike = (postId: string) => {
    if (!user?.id) return;
    const res = toggleSocialLike(postId, user.id);
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likesCount: res.likesCount } : p)));
  };

  const handleSave = (postId: string) => {
    if (!user?.id) return;
    toggleSocialSave(postId, user.id);
  };

  const handleSubmitComment = () => {
    if (!commentPostId || !user || !commentText.trim()) return;
    setCommenting(true);
    const displayName = user.name || "User";
    const c = addSocialComment(commentPostId, user.id, displayName, commentText.trim());
    if (c) {
      setPosts((prev) =>
        prev.map((p) => (p.id === commentPostId ? { ...p, commentsCount: p.commentsCount + 1 } : p))
      );
      setCommentPostId(null);
      setCommentText("");
    }
    setCommenting(false);
  };

  const comments = commentPostId ? getSocialComments(commentPostId) : [];

  return (
    <>
      <div className="px-4 py-3 space-y-3">
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="flex-1 min-w-[100px] rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Tag"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="flex-1 min-w-[100px] rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 mb-2">Trending destinations</p>
          <TrendingDestinations selected={selectedTrending} onSelect={setSelectedTrending} />
        </div>
      </div>

      {loading ? (
        <div className="px-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="mt-3 h-48 bg-slate-200 rounded-xl" />
              <div className="mt-3 h-4 bg-slate-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts match your filters.</p>
          <p className="text-sm mt-1">Try a different location or tag.</p>
        </div>
      ) : (
        <div className="px-4 space-y-4 pb-6">
          {posts.map((post) => (
            <SocialPostCard
              key={post.id}
              post={post}
              currentUserId={user?.id}
              isLiked={user ? hasLiked(post.id, user.id) : false}
              isSaved={user ? hasSaved(post.id, user.id) : false}
              onLike={() => {
                if (user) {
                  const res = toggleSocialLike(post.id, user.id);
                  setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, likesCount: res.likesCount } : p)));
                }
              }}
              onSave={() => {
                if (user) toggleSocialSave(post.id, user.id);
              }}
              onCommentClick={() => setCommentPostId(post.id)}
              supplierProfileHref={post.supplierTaggedId ? `/traveler/trip/t1` : undefined}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={!!commentPostId}
        onClose={() => { setCommentPostId(null); setCommentText(""); }}
        title="Comments"
      >
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-2">
              <span className="font-medium text-slate-800">{c.userDisplayName}</span>
              <span className="text-slate-600">{c.comment}</span>
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
              disabled={!commentText.trim() || commenting}
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
