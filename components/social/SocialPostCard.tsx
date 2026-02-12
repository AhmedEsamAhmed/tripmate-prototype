"use client";

import { useState } from "react";
import Link from "next/link";
import type { SocialPost } from "@/types/network";
import { Button } from "@/components/ui/Button";

interface SocialPostCardProps {
  post: SocialPost;
  currentUserId: string | undefined;
  isLiked: boolean;
  isSaved: boolean;
  onLike: () => void;
  onSave: () => void;
  onCommentClick: () => void;
  supplierProfileHref?: string;
}

export function SocialPostCard({
  post,
  currentUserId,
  isLiked,
  isSaved,
  onLike,
  onSave,
  onCommentClick,
  supplierProfileHref,
}: SocialPostCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = post.images?.length ? post.images : ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800"];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="p-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary-100 overflow-hidden flex-shrink-0">
          {post.userAvatar ? (
            <img src={post.userAvatar} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="h-full w-full flex items-center justify-center text-primary-600 font-semibold text-sm">
              {post.userDisplayName.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900 truncate">{post.userDisplayName}</p>
          <p className="text-xs text-slate-500 truncate">{post.location}</p>
        </div>
        <time className="text-xs text-slate-400">
          {new Date(post.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </time>
      </div>

      {/* Carousel */}
      <div className="relative aspect-square bg-slate-100">
        <img
          src={images[imageIndex]}
          alt=""
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center"
              aria-label="Next"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i === imageIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-3">
        <p className="text-sm text-slate-800 whitespace-pre-wrap break-words">
          {post.caption}
          {post.hashtags.length > 0 && (
            <span className="text-primary-600"> {post.hashtags.map((h) => `#${h}`).join(" ")}</span>
          )}
        </p>
        {post.supplierTaggedId && supplierProfileHref && (
          <Link
            href={supplierProfileHref}
            className="inline-block mt-2 text-sm font-medium text-primary-600"
          >
            View tagged supplier →
          </Link>
        )}
      </div>

      <div className="px-3 pb-3 flex items-center gap-4">
        <button
          type="button"
          onClick={onLike}
          className={`flex items-center gap-1.5 text-sm font-medium ${isLiked ? "text-red-500" : "text-slate-600"}`}
        >
          <span>{isLiked ? "♥" : "♡"}</span>
          <span>{post.likesCount}</span>
        </button>
        <button type="button" onClick={onCommentClick} className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
          <span>💬</span>
          <span>{post.commentsCount}</span>
        </button>
        <button
          type="button"
          onClick={onSave}
          className={`ml-auto text-sm ${isSaved ? "text-primary-600" : "text-slate-500"}`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}
