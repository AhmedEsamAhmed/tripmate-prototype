/**
 * Social Feed (Traveler) – Demo store
 * Modular; does not touch booking/payment/negotiation.
 */

import type { SocialPost, SocialComment, SocialLike, SocialSave } from "@/types/network";

const UNSPLASH = "https://images.unsplash.com";

// Demo travelers (display names for feed)
const DEMO_TRAVELERS = [
  { id: "u1", name: "Alex Chen", avatar: `${UNSPLASH}/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop` },
  { id: "u2", name: "Sarah M.", avatar: `${UNSPLASH}/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop` },
  { id: "u3", name: "James K.", avatar: `${UNSPLASH}/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop` },
  { id: "u4", name: "Emma L.", avatar: `${UNSPLASH}/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop` },
  { id: "u5", name: "Omar H.", avatar: `${UNSPLASH}/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop` },
];

let posts: SocialPost[] = [
  {
    id: "sp1",
    userId: "u1",
    userDisplayName: "Alex Chen",
    userAvatar: DEMO_TRAVELERS[0].avatar,
    location: "Bali, Indonesia",
    caption: "Amazing 3-day tour with @Budi Santoso. Temples, rice terraces, and the best local food! #Bali #Travel",
    images: [`${UNSPLASH}/photo-1537996194471-e657df975ab4?w=800`, `${UNSPLASH}/photo-1555400038-63f5ba517a47?w=800`],
    supplierTaggedId: "s1",
    hashtags: ["Bali", "Travel"],
    likesCount: 24,
    commentsCount: 5,
    createdAt: "2025-02-01T10:00:00Z",
    updatedAt: "2025-02-01T10:00:00Z",
  },
  {
    id: "sp2",
    userId: "u1",
    userDisplayName: "Alex Chen",
    userAvatar: DEMO_TRAVELERS[0].avatar,
    location: "Ubud",
    caption: "Sunrise at Tegalalang. Worth the early wake-up! #Ubud #RiceTerraces",
    images: [`${UNSPLASH}/photo-1518548419970-58e3b4079ab2?w=800`],
    supplierTaggedId: null,
    hashtags: ["Ubud", "RiceTerraces"],
    likesCount: 18,
    commentsCount: 2,
    createdAt: "2025-02-03T07:00:00Z",
    updatedAt: "2025-02-03T07:00:00Z",
  },
  {
    id: "sp3",
    userId: "u1",
    userDisplayName: "Alex Chen",
    userAvatar: DEMO_TRAVELERS[0].avatar,
    location: "Tanah Lot",
    caption: "Iconic temple by the sea. Booked through TripuLike with PT Wisata Nusantara. #TanahLot",
    images: [`${UNSPLASH}/photo-1555400038-63f5ba517a47?w=800`, `${UNSPLASH}/photo-1537996194471-e657df975ab4?w=800`, `${UNSPLASH}/photo-1528181304800-259b08848526?w=800`],
    supplierTaggedId: "s2",
    hashtags: ["TanahLot"],
    likesCount: 31,
    commentsCount: 8,
    createdAt: "2025-02-05T14:00:00Z",
    updatedAt: "2025-02-05T14:00:00Z",
  },
  {
    id: "sp4",
    userId: "u2",
    userDisplayName: "Sarah M.",
    userAvatar: DEMO_TRAVELERS[1].avatar,
    location: "Yogyakarta",
    caption: "Borobudur at dawn. Unforgettable. Our guide made it so special. #Indonesia #Borobudur",
    images: [`${UNSPLASH}/photo-1588666309990-d68f08ff2adf?w=800`, `${UNSPLASH}/photo-1544551763-46a013bb70d5?w=800`],
    supplierTaggedId: "s1",
    hashtags: ["Indonesia", "Borobudur"],
    likesCount: 42,
    commentsCount: 12,
    createdAt: "2025-01-28T05:30:00Z",
    updatedAt: "2025-01-28T05:30:00Z",
  },
  {
    id: "sp5",
    userId: "u2",
    userDisplayName: "Sarah M.",
    userAvatar: DEMO_TRAVELERS[1].avatar,
    location: "Lombok",
    caption: "Gili Islands snorkeling. Crystal clear water! #Lombok #Gili",
    images: [`${UNSPLASH}/photo-1559827260-dc66d52bef19?w=800`],
    supplierTaggedId: null,
    hashtags: ["Lombok", "Gili"],
    likesCount: 19,
    commentsCount: 3,
    createdAt: "2025-02-02T12:00:00Z",
    updatedAt: "2025-02-02T12:00:00Z",
  },
  {
    id: "sp6",
    userId: "u2",
    userDisplayName: "Sarah M.",
    userAvatar: DEMO_TRAVELERS[1].avatar,
    location: "Seminyak",
    caption: "Beach club vibes. Perfect end to the trip. #Seminyak #Bali",
    images: [`${UNSPLASH}/photo-1507525428034-b723cf961d3e?w=800`, `${UNSPLASH}/photo-1519046904884-53103b34b206?w=800`],
    supplierTaggedId: "s3",
    hashtags: ["Seminyak", "Bali"],
    likesCount: 27,
    commentsCount: 6,
    createdAt: "2025-02-04T18:00:00Z",
    updatedAt: "2025-02-04T18:00:00Z",
  },
  {
    id: "sp7",
    userId: "u3",
    userDisplayName: "James K.",
    userAvatar: DEMO_TRAVELERS[2].avatar,
    location: "Bali",
    caption: "First time in Bali. Already planning the next trip! #FirstTimeBali",
    images: [`${UNSPLASH}/photo-1537996194471-e657df975ab4?w=800`],
    supplierTaggedId: null,
    hashtags: ["FirstTimeBali"],
    likesCount: 15,
    commentsCount: 1,
    createdAt: "2025-02-06T09:00:00Z",
    updatedAt: "2025-02-06T09:00:00Z",
  },
  {
    id: "sp8",
    userId: "u4",
    userDisplayName: "Emma L.",
    userAvatar: DEMO_TRAVELERS[3].avatar,
    location: "Uluwatu",
    caption: "Cliff views and the Kecak dance. Magical evening. #Uluwatu #Bali",
    images: [`${UNSPLASH}/photo-1528181304800-259b08848526?w=800`],
    supplierTaggedId: "s1",
    hashtags: ["Uluwatu", "Bali"],
    likesCount: 22,
    commentsCount: 4,
    createdAt: "2025-02-07T19:00:00Z",
    updatedAt: "2025-02-07T19:00:00Z",
  },
  {
    id: "sp9",
    userId: "u5",
    userDisplayName: "Omar H.",
    userAvatar: DEMO_TRAVELERS[4].avatar,
    location: "Nusa Dua",
    caption: "Family day at the beach. Kids loved it. Thanks Ketut for the smooth ride! #NusaDua",
    images: [`${UNSPLASH}/photo-1507525428034-b723cf961d3e?w=800`, `${UNSPLASH}/photo-1519046904884-53103b34b206?w=800`, `${UNSPLASH}/photo-1559827260-dc66d52bef19?w=800`],
    supplierTaggedId: "s3",
    hashtags: ["NusaDua"],
    likesCount: 11,
    commentsCount: 2,
    createdAt: "2025-02-08T11:00:00Z",
    updatedAt: "2025-02-08T11:00:00Z",
  },
];

let comments: SocialComment[] = [
  { id: "sc1", postId: "sp1", userId: "s1", userDisplayName: "Budi Santoso", comment: "Thank you Alex! So glad you enjoyed it.", createdAt: "2025-02-01T11:00:00Z" },
  { id: "sc2", postId: "sp1", userId: "u2", userDisplayName: "Sarah M.", comment: "Looks amazing! Who was your guide?", createdAt: "2025-02-01T12:00:00Z" },
  { id: "sc3", postId: "sp4", userId: "u1", userDisplayName: "Alex Chen", comment: "Borobudur is on my list too!", createdAt: "2025-01-28T14:00:00Z" },
];

let likes: SocialLike[] = [
  { id: "sl1", postId: "sp1", userId: "u2", createdAt: "2025-02-01T11:30:00Z" },
  { id: "sl2", postId: "sp1", userId: "s1", createdAt: "2025-02-01T12:00:00Z" },
];

let saves: SocialSave[] = [
  { id: "ss1", postId: "sp1", userId: "u2", createdAt: "2025-02-01T13:00:00Z" },
];

// Trending destinations (derived from posts)
export const TRENDING_DESTINATIONS = ["Bali", "Ubud", "Yogyakarta", "Lombok", "Seminyak", "Nusa Dua", "Tanah Lot", "Gili Islands"];

export function getSocialPosts(params?: { location?: string; tag?: string; limit?: number; offset?: number }): SocialPost[] {
  let result = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  if (params?.location) {
    const loc = params.location.toLowerCase();
    result = result.filter((p) => p.location.toLowerCase().includes(loc));
  }
  if (params?.tag) {
    const tag = params.tag.toLowerCase();
    result = result.filter((p) => p.hashtags.some((h) => h.toLowerCase().includes(tag)) || p.caption.toLowerCase().includes(`#${tag}`));
  }
  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? 20;
  return result.slice(offset, offset + limit);
}

export function getSocialPost(id: string): SocialPost | null {
  return posts.find((p) => p.id === id) ?? null;
}

export function getSocialComments(postId: string): SocialComment[] {
  return comments.filter((c) => c.postId === postId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function hasLiked(postId: string, userId: string): boolean {
  return likes.some((l) => l.postId === postId && l.userId === userId);
}

export function hasSaved(postId: string, userId: string): boolean {
  return saves.some((s) => s.postId === postId && s.userId === userId);
}

export function addSocialPost(post: Omit<SocialPost, "id" | "likesCount" | "commentsCount" | "createdAt" | "updatedAt">): SocialPost {
  const now = new Date().toISOString();
  const newPost: SocialPost = {
    ...post,
    id: `sp${Date.now()}`,
    likesCount: 0,
    commentsCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  posts = [newPost, ...posts];
  return newPost;
}

export function updateSocialPost(id: string, updates: Partial<Pick<SocialPost, "caption" | "location" | "images" | "hashtags" | "supplierTaggedId">>): SocialPost | null {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  posts[idx] = { ...posts[idx], ...updates, updatedAt: new Date().toISOString() };
  return posts[idx];
}

export function deleteSocialPost(id: string): boolean {
  const prev = posts.length;
  posts = posts.filter((p) => p.id !== id);
  comments = comments.filter((c) => c.postId !== id);
  likes = likes.filter((l) => l.postId !== id);
  saves = saves.filter((s) => s.postId !== id);
  return posts.length < prev;
}

export function toggleSocialLike(postId: string, userId: string): { liked: boolean; likesCount: number } {
  const post = posts.find((p) => p.id === postId);
  if (!post) return { liked: false, likesCount: 0 };
  const existing = likes.find((l) => l.postId === postId && l.userId === userId);
  if (existing) {
    likes = likes.filter((l) => l.id !== existing.id);
    post.likesCount = Math.max(0, post.likesCount - 1);
    return { liked: false, likesCount: post.likesCount };
  }
  likes.push({ id: `sl${Date.now()}`, postId, userId, createdAt: new Date().toISOString() });
  post.likesCount += 1;
  return { liked: true, likesCount: post.likesCount };
}

export function addSocialComment(postId: string, userId: string, userDisplayName: string, comment: string): SocialComment | null {
  const post = posts.find((p) => p.id === postId);
  if (!post) return null;
  const sanitized = comment.slice(0, 500).trim();
  if (!sanitized) return null;
  const newComment: SocialComment = {
    id: `sc${Date.now()}`,
    postId,
    userId,
    userDisplayName,
    comment: sanitized,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  post.commentsCount += 1;
  return newComment;
}

export function toggleSocialSave(postId: string, userId: string): boolean {
  const existing = saves.find((s) => s.postId === postId && s.userId === userId);
  if (existing) {
    saves = saves.filter((s) => s.id !== existing.id);
    return false;
  }
  saves.push({ id: `ss${Date.now()}`, postId, userId, createdAt: new Date().toISOString() });
  return true;
}
