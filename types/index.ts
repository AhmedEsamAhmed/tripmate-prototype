// User & Auth
export type UserRole = "traveler" | "supplier";
export type SupplierType = "driver" | "tour_guide" | "tour_agency";
export type VerificationStatus = "pending" | "approved" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  supplierType?: SupplierType;
  verificationStatus?: VerificationStatus;
  avatar?: string;
}

// Trip types
export type TripType = "request" | "pre_designed";
export type TripStatus =
  | "draft"
  | "published"
  | "pending_offer"
  | "negotiating"
  | "price_locked"
  | "booked"
  | "ongoing"
  | "completed"
  | "cancelled";

export interface Location {
  id: string;
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
}

export interface Trip {
  id: string;
  type: TripType;
  title: string;
  locations: Location[];
  startDate: string;
  endDate?: string;
  durationHours?: number;
  durationDays?: number;
  price?: number;
  priceNegotiable?: boolean;
  currency?: string;
  status: TripStatus;
  supplierId?: string;
  supplier?: SupplierProfile;
  travelerId?: string;
  serviceType?: SupplierType;
  notes?: string;
  capacity?: number;
  itinerary?: string[];
  createdAt: string;
  updatedAt: string;
  isPackageTrip?: boolean;
  attachments?: TripAttachment[];
}

export interface TripAttachment {
  id: string;
  tripId: string;
  type: "photo" | "document";
  name: string;
  url: string;
  uploadedAt: string;
}

export interface TrackingPoint {
  lat: number;
  lng: number;
  label?: string;
  time?: string;
}

export interface SupplierProfile {
  id: string;
  name: string;
  type: SupplierType;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  avatar?: string;
  languages?: string[];
  locations?: string[];
}

// Offer & Negotiation
export type OfferStatus = "pending" | "accepted" | "rejected" | "countered";

export interface Offer {
  id: string;
  tripId: string;
  supplierId: string;
  amount: number;
  currency: string;
  status: OfferStatus;
  message?: string;
  counterAmount?: number;
  createdAt: string;
  updatedAt: string;
}

// Booking & Payment
export type PaymentStatus = "pending" | "partial" | "paid" | "failed" | "refunded";
export type RefundStatus = "none" | "full" | "partial" | "processing";

export interface Booking {
  id: string;
  tripId: string;
  offerId: string;
  travelerId: string;
  supplierId: string;
  amount: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  refundStatus?: RefundStatus;
  bookedAt: string;
  cancelledAt?: string;
}

// Chat
export type MessageType = "user" | "system";

export interface ChatMessage {
  id: string;
  senderId: string;
  senderRole: UserRole;
  type: MessageType;
  content: string;
  timestamp: string;
}

// Refund policy (hours before trip)
export const REFUND_POLICY = {
  fullRefundHours: 24,
  halfRefundHours: 10,
} as const;
