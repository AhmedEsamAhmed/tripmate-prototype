/**
 * Supplier Professional Network (B2B) – Demo store
 * Only for verified suppliers; does not touch booking/payment.
 */

import type {
  SupplierNetworkPost,
  SupplierConnection,
  SupplierMessage,
  SupplierNetworkComment,
  SupplierNetworkPostType,
  ConnectionStatus,
} from "@/types/network";

const UNSPLASH = "https://images.unsplash.com";

// Demo suppliers for network
const DEMO_NETWORK_SUPPLIERS = [
  { id: "s1", name: "Budi Santoso", type: "tour_guide" as const, logo: `${UNSPLASH}/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop` },
  { id: "s2", name: "PT Wisata Nusantara", type: "tour_agency" as const, logo: `${UNSPLASH}/photo-1560159947-8a0a2d0c4a8b?w=100&h=100&fit=crop` },
  { id: "s3", name: "Ketut Driver", type: "driver" as const, logo: `${UNSPLASH}/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop` },
  { id: "s4", name: "Made Wijaya", type: "driver" as const, logo: `${UNSPLASH}/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop` },
  { id: "s5", name: "Dewi Tours", type: "tour_guide" as const, logo: `${UNSPLASH}/photo-1599566150163-29194dcabd44?w=100&h=100&fit=crop` },
  { id: "s6", name: "Lombok Adventures", type: "tour_agency" as const, logo: `${UNSPLASH}/photo-1600880292203-757bb62b4baf?w=100&h=100&fit=crop` },
  { id: "s7", name: "Bali Transport Co", type: "driver" as const, logo: `${UNSPLASH}/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop` },
];

let networkPosts: SupplierNetworkPost[] = [
  {
    id: "np1",
    supplierId: "s2",
    supplierName: "PT Wisata Nusantara",
    supplierLogo: DEMO_NETWORK_SUPPLIERS[1].logo,
    supplierType: "tour_agency",
    postType: "collaboration_request",
    content: "Looking for reliable driver partners in Bali for our high-season packages (Jun–Aug). Long-term collaboration preferred. DM if interested.",
    media: [],
    location: "Bali",
    likesCount: 5,
    commentsCount: 3,
    createdAt: "2025-02-05T09:00:00Z",
    updatedAt: "2025-02-05T09:00:00Z",
  },
  {
    id: "np2",
    supplierId: "s1",
    supplierName: "Budi Santoso",
    supplierLogo: DEMO_NETWORK_SUPPLIERS[0].logo,
    supplierType: "tour_guide",
    postType: "driver_needed",
    content: "Need a driver for a 2-day Ubud + Tanah Lot tour next week. Professional vehicle, English-friendly. Please comment or message.",
    media: [],
    location: "Bali",
    likesCount: 2,
    commentsCount: 4,
    createdAt: "2025-02-06T10:00:00Z",
    updatedAt: "2025-02-06T10:00:00Z",
  },
  {
    id: "np3",
    supplierId: "s6",
    supplierName: "Lombok Adventures",
    supplierLogo: DEMO_NETWORK_SUPPLIERS[5].logo,
    supplierType: "tour_agency",
    postType: "news",
    content: "New regulation update: Tourist boats to Gili Islands now require additional safety certification. Deadline March 2025. Link in comments.",
    media: [`${UNSPLASH}/photo-1559827260-dc66d52bef19?w=800`],
    location: "Lombok",
    likesCount: 8,
    commentsCount: 6,
    createdAt: "2025-02-04T14:00:00Z",
    updatedAt: "2025-02-04T14:00:00Z",
  },
  {
    id: "np4",
    supplierId: "s1",
    supplierName: "Budi Santoso",
    supplierLogo: DEMO_NETWORK_SUPPLIERS[0].logo,
    supplierType: "tour_guide",
    postType: "referral_opportunity",
    content: "I often get requests for Lombok and Komodo tours. Happy to refer to trusted guides in those regions. Connect if you’re based there.",
    media: [],
    location: "Bali",
    likesCount: 12,
    commentsCount: 5,
    createdAt: "2025-02-07T11:00:00Z",
    updatedAt: "2025-02-07T11:00:00Z",
  },
  {
    id: "np5",
    supplierId: "s2",
    supplierName: "PT Wisata Nusantara",
    supplierLogo: DEMO_NETWORK_SUPPLIERS[1].logo,
    supplierType: "tour_agency",
    postType: "update",
    content: "We’ve expanded our Yogyakarta temple tours. Looking for local guide partners for Borobudur & Prambanan. Collaboration model available.",
    media: [`${UNSPLASH}/photo-1588666309990-d68f08ff2adf?w=800`],
    location: "Yogyakarta",
    likesCount: 7,
    commentsCount: 2,
    createdAt: "2025-02-08T08:00:00Z",
    updatedAt: "2025-02-08T08:00:00Z",
  },
];

let connections: SupplierConnection[] = [
  { id: "c1", supplierOneId: "s1", supplierTwoId: "s3", status: "accepted", createdAt: "2025-01-15T10:00:00Z", updatedAt: "2025-01-15T10:00:00Z" },
  { id: "c2", supplierOneId: "s1", supplierTwoId: "s2", status: "accepted", createdAt: "2025-01-20T14:00:00Z", updatedAt: "2025-01-20T14:00:00Z" },
  { id: "c3", supplierOneId: "s2", supplierTwoId: "s3", status: "pending", createdAt: "2025-02-01T09:00:00Z", updatedAt: "2025-02-01T09:00:00Z" },
];

let messages: SupplierMessage[] = [
  { id: "sm1", senderId: "s3", receiverId: "s1", message: "Hi Budi, I can do the Ubud run next week. What dates?", createdAt: "2025-02-06T11:00:00Z" },
  { id: "sm2", senderId: "s1", receiverId: "s3", message: "Thanks Ketut! 18–19 Feb. I’ll send the itinerary.", createdAt: "2025-02-06T11:30:00Z" },
  { id: "sm3", senderId: "s2", receiverId: "s1", message: "We have a group of 8 for Borobudur in March. Can you guide?", createdAt: "2025-02-07T09:00:00Z" },
];

let networkComments: SupplierNetworkComment[] = [
  { id: "nc1", postId: "np1", supplierId: "s3", supplierName: "Ketut Driver", comment: "Interested. I have 5 years experience in Bali.", createdAt: "2025-02-05T10:00:00Z" },
  { id: "nc2", postId: "np2", supplierId: "s3", supplierName: "Ketut Driver", comment: "I’m available. DM sent.", createdAt: "2025-02-06T10:30:00Z" },
];

export function getNetworkPosts(params?: { region?: string; role?: string; postType?: SupplierNetworkPostType; limit?: number; offset?: number }): SupplierNetworkPost[] {
  let result = [...networkPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  if (params?.region) {
    const r = params.region.toLowerCase();
    result = result.filter((p) => p.location?.toLowerCase().includes(r));
  }
  if (params?.role) result = result.filter((p) => p.supplierType === params.role);
  if (params?.postType) result = result.filter((p) => p.postType === params.postType);
  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? 20;
  return result.slice(offset, offset + limit);
}

export function getNetworkPost(id: string): SupplierNetworkPost | null {
  return networkPosts.find((p) => p.id === id) ?? null;
}

export function getConnections(supplierId: string): SupplierConnection[] {
  return connections.filter((c) => c.supplierOneId === supplierId || c.supplierTwoId === supplierId);
}

export function getConnectionStatus(supplierOneId: string, supplierTwoId: string): ConnectionStatus | null {
  const c = connections.find(
    (x) =>
      (x.supplierOneId === supplierOneId && x.supplierTwoId === supplierTwoId) ||
      (x.supplierOneId === supplierTwoId && x.supplierTwoId === supplierOneId)
  );
  return c?.status ?? null;
}

export function requestConnection(fromSupplierId: string, toSupplierId: string): SupplierConnection | null {
  if (fromSupplierId === toSupplierId) return null;
  const existing = connections.find(
    (c) =>
      (c.supplierOneId === fromSupplierId && c.supplierTwoId === toSupplierId) ||
      (c.supplierOneId === toSupplierId && c.supplierTwoId === fromSupplierId)
  );
  if (existing) return null;
  const now = new Date().toISOString();
  const newConn: SupplierConnection = {
    id: `c${Date.now()}`,
    supplierOneId: fromSupplierId,
    supplierTwoId: toSupplierId,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  connections.push(newConn);
  return newConn;
}

export function acceptOrRejectConnection(connectionId: string, accept: boolean): SupplierConnection | null {
  const idx = connections.findIndex((c) => c.id === connectionId);
  if (idx < 0) return null;
  connections[idx].status = accept ? "accepted" : "rejected";
  connections[idx].updatedAt = new Date().toISOString();
  return connections[idx];
}

export function getMessages(supplierId: string, otherSupplierId: string): SupplierMessage[] {
  return messages
    .filter(
      (m) =>
        (m.senderId === supplierId && m.receiverId === otherSupplierId) ||
        (m.senderId === otherSupplierId && m.receiverId === supplierId)
    )
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function sendNetworkMessage(senderId: string, receiverId: string, message: string): SupplierMessage | null {
  const sanitized = message.slice(0, 1000).trim();
  if (!sanitized) return null;
  const newMsg: SupplierMessage = {
    id: `sm${Date.now()}`,
    senderId,
    receiverId,
    message: sanitized,
    createdAt: new Date().toISOString(),
  };
  messages.push(newMsg);
  return newMsg;
}

export function getNetworkComments(postId: string): SupplierNetworkComment[] {
  return networkComments.filter((c) => c.postId === postId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function addNetworkComment(postId: string, supplierId: string, supplierName: string, comment: string): SupplierNetworkComment | null {
  const post = networkPosts.find((p) => p.id === postId);
  if (!post) return null;
  const sanitized = comment.slice(0, 500).trim();
  if (!sanitized) return null;
  const newComment: SupplierNetworkComment = {
    id: `nc${Date.now()}`,
    postId,
    supplierId,
    supplierName,
    comment: sanitized,
    createdAt: new Date().toISOString(),
  };
  networkComments.push(newComment);
  post.commentsCount += 1;
  return newComment;
}

export function addNetworkPost(
  post: Omit<SupplierNetworkPost, "id" | "likesCount" | "commentsCount" | "createdAt" | "updatedAt">
): SupplierNetworkPost {
  const now = new Date().toISOString();
  const newPost: SupplierNetworkPost = {
    ...post,
    id: `np${Date.now()}`,
    likesCount: 0,
    commentsCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  networkPosts = [newPost, ...networkPosts];
  return newPost;
}

export function getSupplierById(id: string): (typeof DEMO_NETWORK_SUPPLIERS)[0] | undefined {
  return DEMO_NETWORK_SUPPLIERS.find((s) => s.id === id);
}

export function getSuppliersForDropdown(): { id: string; name: string; type: string }[] {
  return DEMO_NETWORK_SUPPLIERS.map((s) => ({ id: s.id, name: s.name, type: s.type }));
}
