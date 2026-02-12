/**
 * Networking & Social Ecosystem – Type definitions
 * Modular extension; does not modify core booking/payment types.
 */

// ─── Traveler Social Feed (Public) ─────────────────────────────────────────

export interface SocialPost {
  id: string;
  userId: string;
  userDisplayName: string;
  userAvatar?: string;
  location: string;
  caption: string;
  images: string[];
  supplierTaggedId: string | null;
  hashtags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SocialComment {
  id: string;
  postId: string;
  userId: string;
  userDisplayName: string;
  userAvatar?: string;
  comment: string;
  createdAt: string;
}

export interface SocialLike {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface SocialSave {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

// ─── Supplier Professional Network (Private B2B) ───────────────────────────

export type SupplierNetworkPostType =
  | "update"
  | "collaboration_request"
  | "driver_needed"
  | "guide_needed"
  | "referral_opportunity"
  | "news"
  | "question";

export interface SupplierNetworkPost {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierLogo?: string;
  supplierType: "driver" | "tour_guide" | "tour_agency";
  postType: SupplierNetworkPostType;
  content: string;
  media: string[];
  location: string | null;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export type ConnectionStatus = "pending" | "accepted" | "rejected";

export interface SupplierConnection {
  id: string;
  supplierOneId: string;
  supplierTwoId: string;
  status: ConnectionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}

export interface SupplierNetworkComment {
  id: string;
  postId: string;
  supplierId: string;
  supplierName: string;
  comment: string;
  createdAt: string;
}

// Pagination (future-ready)
export interface PaginatedParams {
  limit?: number;
  offset?: number;
}
