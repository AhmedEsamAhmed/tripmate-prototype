/**
 * Demo store: mutable in-memory data for testing all app features.
 * Replaces static mock data when we need to add/update entities.
 */

import type {
  Trip,
  Offer,
  Booking,
  ChatMessage,
  Notification,
  WalletBalance,
  Payout,
  SupplierVerificationApplication,
  Review,
} from "@/types";

let trips: Trip[] = [
  {
    id: "t1",
    type: "request",
    title: "Bali 3-day cultural tour",
    locations: [
      { id: "l1", name: "Ubud", lat: -8.5069, lng: 115.2624 },
      { id: "l2", name: "Tanah Lot", lat: -8.6211, lng: 115.0868 },
      { id: "l3", name: "Uluwatu", lat: -8.8292, lng: 115.0841 },
    ],
    startDate: "2025-03-15",
    endDate: "2025-03-17",
    durationDays: 3,
    priceNegotiable: true,
    status: "booked",
    travelerId: "u1",
    serviceType: "tour_guide",
    notes: "Interested in temples and local crafts.",
    createdAt: "2025-02-01T10:00:00Z",
    updatedAt: "2025-02-01T10:00:00Z",
  },
  {
    id: "t2",
    type: "pre_designed",
    title: "Bali Highlights – 2 Days",
    locations: [
      { id: "l4", name: "Ubud Monkey Forest", lat: -8.5184, lng: 115.2593 },
      { id: "l5", name: "Tegalalang Rice Terraces", lat: -8.4258, lng: 115.2765 },
      { id: "l6", name: "Tanah Lot", lat: -8.6211, lng: 115.0868 },
    ],
    startDate: "2025-03-20",
    endDate: "2025-03-21",
    durationDays: 2,
    price: 850000,
    priceNegotiable: false,
    currency: "IDR",
    status: "published",
    supplierId: "s2",
    serviceType: "tour_agency",
    capacity: 6,
    itinerary: ["Day 1: Ubud & Rice Terraces", "Day 2: Tanah Lot & Beach"],
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z",
  },
  {
    id: "t3",
    type: "request",
    title: "Airport transfer + day tour",
    locations: [
      { id: "l7", name: "Ngurah Rai Airport", lat: -8.7482, lng: 115.1672 },
      { id: "l8", name: "Seminyak", lat: -8.6914, lng: 115.1686 },
      { id: "l9", name: "Nusa Dua", lat: -8.7797, lng: 115.2117 },
    ],
    startDate: "2025-03-10",
    durationHours: 10,
    priceNegotiable: true,
    status: "published",
    travelerId: "u1",
    serviceType: "driver",
    notes: "Need pickup at 9 AM.",
    createdAt: "2025-02-02T14:00:00Z",
    updatedAt: "2025-02-02T14:00:00Z",
  },
  {
    id: "t4",
    type: "request",
    title: "Ubud day trip",
    locations: [
      { id: "l10", name: "Ubud", lat: -8.5069, lng: 115.2624 },
      { id: "l11", name: "Tegalalang", lat: -8.4258, lng: 115.2765 },
    ],
    startDate: "2025-02-06",
    durationHours: 8,
    priceNegotiable: true,
    status: "ongoing",
    travelerId: "u1",
    supplierId: "s1",
    serviceType: "tour_guide",
    notes: "Want to see rice terraces.",
    createdAt: "2025-02-04T09:00:00Z",
    updatedAt: "2025-02-06T08:00:00Z",
  },
  {
    id: "t5",
    type: "request",
    title: "Yogyakarta temple tour",
    locations: [
      { id: "l12", name: "Borobudur", lat: -7.6079, lng: 110.2038 },
      { id: "l13", name: "Prambanan", lat: -7.7520, lng: 110.4915 },
    ],
    startDate: "2025-01-20",
    endDate: "2025-01-20",
    durationHours: 10,
    price: 750000,
    currency: "IDR",
    status: "completed",
    travelerId: "u1",
    supplierId: "s1",
    serviceType: "tour_guide",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-20T18:00:00Z",
  },
  {
    id: "t6",
    type: "pre_designed",
    title: "Airport Transfer – Bali",
    locations: [
      { id: "l14", name: "Ngurah Rai Airport", lat: -8.7482, lng: 115.1672 },
      { id: "l15", name: "Any hotel in Bali", lat: -8.5069, lng: 115.2624 },
    ],
    startDate: "2025-03-01",
    durationHours: 2,
    price: 250000,
    priceNegotiable: false,
    currency: "IDR",
    status: "published",
    supplierId: "s3",
    serviceType: "driver",
    capacity: 4,
    itinerary: ["Pickup at airport", "Drop-off at your hotel"],
    createdAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-01-10T08:00:00Z",
    isPackageTrip: true,
  },
  {
    id: "t7",
    type: "request",
    title: "Lombok 2-day adventure",
    locations: [
      { id: "l16", name: "Senggigi", lat: -8.4897, lng: 116.0465 },
      { id: "l17", name: "Gili Islands", lat: -8.3498, lng: 116.0645 },
    ],
    startDate: "2025-03-25",
    endDate: "2025-03-26",
    durationDays: 2,
    priceNegotiable: true,
    status: "pending_offer",
    travelerId: "u1",
    serviceType: "tour_guide",
    notes: "Snorkeling preferred.",
    createdAt: "2025-02-05T11:00:00Z",
    updatedAt: "2025-02-05T11:00:00Z",
  },
  {
    id: "t8",
    type: "request",
    title: "Cancelled beach trip",
    locations: [
      { id: "l18", name: "Kuta", lat: -8.7221, lng: 115.1727 },
      { id: "l19", name: "Sanur", lat: -8.6927, lng: 115.2630 },
    ],
    startDate: "2025-02-10",
    durationHours: 6,
    priceNegotiable: true,
    status: "cancelled",
    travelerId: "u1",
    serviceType: "driver",
    createdAt: "2025-02-01T09:00:00Z",
    updatedAt: "2025-02-08T14:00:00Z",
  },
];

let offers: Offer[] = [
  {
    id: "o1",
    tripId: "t1",
    supplierId: "s1",
    amount: 1200000,
    currency: "IDR",
    status: "accepted",
    message: "I can cover Ubud, Tanah Lot, and Uluwatu with English commentary.",
    createdAt: "2025-02-02T09:00:00Z",
    updatedAt: "2025-02-02T09:00:00Z",
  },
  {
    id: "o2",
    tripId: "t3",
    supplierId: "s3",
    amount: 850000,
    currency: "IDR",
    status: "pending",
    message: "Professional driver. Airport pickup included.",
    createdAt: "2025-02-03T10:00:00Z",
    updatedAt: "2025-02-03T10:00:00Z",
  },
  {
    id: "o3",
    tripId: "t7",
    supplierId: "s2",
    amount: 1500000,
    currency: "IDR",
    status: "pending",
    message: "We offer snorkeling gear. Boat to Gili included.",
    createdAt: "2025-02-05T14:00:00Z",
    updatedAt: "2025-02-05T14:00:00Z",
  },
  {
    id: "o4",
    tripId: "t5",
    supplierId: "s1",
    amount: 750000,
    currency: "IDR",
    status: "accepted",
    message: "Temple tour with English guide. Lunch included.",
    createdAt: "2025-01-16T10:00:00Z",
    updatedAt: "2025-01-16T10:00:00Z",
  },
];

let bookings: Booking[] = [
  {
    id: "b1",
    tripId: "t1",
    offerId: "o1",
    travelerId: "u1",
    supplierId: "s1",
    amount: 1200000,
    paidAmount: 1200000,
    paymentStatus: "paid",
    bookedAt: "2025-02-03T12:00:00Z",
  },
  {
    id: "b2",
    tripId: "t5",
    offerId: "o4",
    travelerId: "u1",
    supplierId: "s1",
    amount: 750000,
    paidAmount: 750000,
    paymentStatus: "paid",
    bookedAt: "2025-01-18T10:00:00Z",
  },
];

// Tracking points for active trip (t4) – simulated route
export const MOCK_TRACKING_POINTS = [
  { lat: -8.5069, lng: 115.2624, label: "Ubud (Start)", time: "08:00" },
  { lat: -8.4550, lng: 115.2700, label: "En route", time: "08:25" },
  { lat: -8.4258, lng: 115.2765, label: "Tegalalang Rice Terraces", time: "09:00" },
  { lat: -8.4350, lng: 115.2650, label: "En route back", time: "11:30" },
  { lat: -8.5069, lng: 115.2624, label: "Ubud (End)", time: "12:00" },
];

export function getTrips(): Trip[] {
  return trips;
}

export function getOffers(): Offer[] {
  return offers;
}

export function getBookings(): Booking[] {
  return bookings;
}

export function addTrip(trip: Trip): void {
  trips = [...trips, { ...trip, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
}

export function addOffer(offer: Offer): void {
  offers = [...offers, { ...offer, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
}

export function addBooking(booking: Booking): void {
  bookings = [...bookings, booking];
}

export function updateTrip(id: string, updates: Partial<Trip>): void {
  trips = trips.map((t) =>
    t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
  );
}

export function updateOffer(id: string, updates: Partial<Offer>): void {
  offers = offers.map((o) =>
    o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o
  );
}

// Notifications (for both traveler and supplier)
let notifications: Notification[] = [
  {
    id: "n1",
    userId: "u1",
    type: "booking_confirmed",
    title: "Booking confirmed",
    body: "Your Bali 3-day cultural tour is confirmed. Trip starts Mar 15.",
    link: "/traveler/view-booking/t1",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "n2",
    userId: "u1",
    type: "new_offer",
    title: "New offer on your trip",
    body: "You received an offer of IDR 850,000 for Airport transfer + day tour.",
    link: "/traveler/offers",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "n3",
    userId: "s1",
    type: "new_request",
    title: "New trip request",
    body: "Lombok 2-day adventure matches your profile. Submit an offer.",
    link: "/supplier/request/t7",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "n4",
    userId: "s1",
    type: "payment_received",
    title: "Payment received",
    body: "IDR 1,200,000 received for Bali 3-day cultural tour.",
    link: "/supplier",
    read: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "n5",
    userId: "s1",
    type: "trip_reminder",
    title: "Trip tomorrow",
    body: "Bali 3-day cultural tour starts tomorrow. Confirm pickup time.",
    link: "/supplier/active-trip/t1",
    read: false,
    createdAt: new Date().toISOString(),
  },
];

// Wallet & payouts (supplier s1)
const walletBalance: WalletBalance = {
  supplierId: "s1",
  available: 2850000,
  pending: 750000,
  totalEarnings: 4800000,
  currency: "IDR",
};

let payouts: Payout[] = [
  {
    id: "p1",
    supplierId: "s1",
    amount: 2000000,
    currency: "IDR",
    status: "completed",
    requestedAt: "2025-01-28T10:00:00Z",
    completedAt: "2025-01-30T14:00:00Z",
  },
  {
    id: "p2",
    supplierId: "s1",
    amount: 850000,
    currency: "IDR",
    status: "pending",
    requestedAt: new Date().toISOString(),
  },
];

// Supplier verification application (s1 = approved)
let verificationApplications: SupplierVerificationApplication[] = [
  {
    id: "v1",
    userId: "s1",
    supplierType: "tour_guide",
    status: "approved",
    step: "submitted",
    documentsUploaded: true,
    serviceDetailsCompleted: true,
    submittedAt: "2025-01-05T10:00:00Z",
    reviewedAt: "2025-01-07T14:00:00Z",
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2025-01-07T14:00:00Z",
  },
];

// Reviews (for supplier profile)
let reviews: Review[] = [
  {
    id: "r1",
    tripId: "t5",
    bookingId: "b2",
    reviewerId: "u1",
    revieweeId: "s1",
    reviewerRole: "traveler",
    rating: 5,
    comment: "Excellent guide! Very knowledgeable about the temples. Would book again.",
    createdAt: "2025-01-21T10:00:00Z",
  },
  {
    id: "r2",
    tripId: "t1",
    bookingId: "b1",
    reviewerId: "u1",
    revieweeId: "s1",
    reviewerRole: "traveler",
    rating: 5,
    comment: "Great 3-day tour. Budi was professional and flexible.",
    createdAt: "2025-02-04T09:00:00Z",
  },
];

export function getNotifications(userId: string): Notification[] {
  return notifications.filter((n) => n.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function markNotificationRead(id: string): void {
  notifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
}

export function getWallet(supplierId: string): WalletBalance | null {
  return walletBalance.supplierId === supplierId ? walletBalance : null;
}

export function getPayouts(supplierId: string): Payout[] {
  return payouts.filter((p) => p.supplierId === supplierId);
}

export function getVerificationApplication(userId: string): SupplierVerificationApplication | null {
  return verificationApplications.find((v) => v.userId === userId) ?? null;
}

export function setVerificationApplication(app: SupplierVerificationApplication): void {
  const existing = verificationApplications.findIndex((v) => v.userId === app.userId);
  if (existing >= 0) verificationApplications[existing] = app;
  else verificationApplications.push(app);
}

export function getReviews(revieweeId: string): Review[] {
  return reviews.filter((r) => r.revieweeId === revieweeId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
