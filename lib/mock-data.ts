import type {
  Trip,
  User,
  Offer,
  Booking,
  SupplierProfile,
  ChatMessage,
} from "@/types";
import {
  getTrips,
  getOffers,
  getBookings,
  getNotifications,
  getWallet,
  getPayouts,
  getVerificationApplication,
  getReviews,
} from "./demo-store";

// Mock current user – switch role for demo
export const MOCK_USER_TRAVELER: User = {
  id: "u1",
  name: "Alex Chen",
  email: "alex@example.com",
  phone: "+62 812 3456 7890",
  role: "traveler",
  avatar: undefined,
};

export const MOCK_USER_SUPPLIER: User = {
  id: "s1",
  name: "Budi Santoso",
  email: "budi@example.com",
  phone: "+62 821 9876 5432",
  role: "supplier",
  supplierType: "tour_guide",
  verificationStatus: "approved",
  avatar: undefined,
};

export const MOCK_SUPPLIERS: SupplierProfile[] = [
  {
    id: "s1",
    name: "Budi Santoso",
    type: "tour_guide",
    verified: true,
    rating: 4.8,
    reviewCount: 124,
    languages: ["Indonesian", "English"],
    locations: ["Bali", "Yogyakarta"],
  },
  {
    id: "s2",
    name: "PT Wisata Nusantara",
    type: "tour_agency",
    verified: true,
    rating: 4.6,
    reviewCount: 89,
    locations: ["Jakarta", "Bali", "Lombok"],
  },
  {
    id: "s3",
    name: "Ketut Driver",
    type: "driver",
    verified: true,
    rating: 4.9,
    reviewCount: 56,
    locations: ["Bali"],
  },
];

// Unified feed: enrich trips with supplier profiles
function enrichTrips(trips: Trip[]): Trip[] {
  return trips.map((t) => {
    if (t.supplierId && !t.supplier) {
      const supplier = MOCK_SUPPLIERS.find((s) => s.id === t.supplierId);
      return { ...t, supplier: supplier ?? undefined };
    }
    return t;
  });
}

export function getTripsFeed(): Trip[] {
  return enrichTrips(getTrips());
}

// For backward compatibility
export const MOCK_TRIPS_FEED = getTripsFeed();

export function getOffersFeed(): Offer[] {
  return getOffers();
}

export const MOCK_OFFERS = getOffersFeed();

export function getBookingsFeed(): Booking[] {
  return getBookings();
}

export const MOCK_BOOKINGS = getBookingsFeed();

export { getNotifications, getWallet, getPayouts, getVerificationApplication, getReviews };

/** Number of offers and min/max amounts for a trip (for traveler request cards) */
export function getOfferCountForTrip(tripId: string): { count: number; minAmount?: number; maxAmount?: number } {
  const list = getOffers().filter((o) => o.tripId === tripId && o.status !== "rejected");
  if (list.length === 0) return { count: 0 };
  const amounts = list.map((o) => o.amount);
  return {
    count: list.length,
    minAmount: Math.min(...amounts),
    maxAmount: Math.max(...amounts),
  };
}

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    senderId: "s1",
    senderRole: "supplier",
    type: "user",
    content: "Hi! I can do your 3-day Bali tour. My offer is IDR 1,200,000.",
    timestamp: "2025-02-02T09:05:00Z",
  },
  {
    id: "m2",
    senderId: "system",
    senderRole: "supplier",
    type: "system",
    content: "Price locked at IDR 1,200,000. You can proceed to booking.",
    timestamp: "2025-02-02T10:00:00Z",
  },
  {
    id: "m3",
    senderId: "u1",
    senderRole: "traveler",
    type: "user",
    content: "Accepted. I'll book now. What time do we start on Day 1?",
    timestamp: "2025-02-03T11:00:00Z",
  },
];

// Locations for create-trip
export const MOCK_LOCATIONS = [
  "Ubud",
  "Tanah Lot",
  "Uluwatu",
  "Seminyak",
  "Nusa Dua",
  "Ngurah Rai Airport",
  "Tegalalang",
  "Kuta",
  "Sanur",
  "Yogyakarta",
  "Borobudur",
  "Prambanan",
  "Senggigi",
  "Gili Islands",
];
