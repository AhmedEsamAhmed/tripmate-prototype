# ViaJalan – Tourism Marketplace Prototype

A mobile-first, interactive UI prototype for a two-sided tourism marketplace. **Travelers** can discover trip requests and pre-designed trips, create custom trips, receive offers, negotiate, book, and manage trips. **Suppliers** (drivers, tour guides, tour agencies) can respond to requests, submit offers, create pre-designed trips (guides/agencies only), and manage active trips.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**

No backend or real payment integration. All data is mocked; auth and role are managed in React context for demo flows.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to the splash screen, then welcome. Use **Sign up** → **Travel & book trips** or **Offer my services** to walk through onboarding and land in the Traveler or Supplier app.

## Demo Flows

### As Traveler

1. **Sign up**: Welcome → Sign up → Role: "Travel & book trips" → Login (email/phone) → OTP → Password → Traveler home.
2. **Explore**: Home shows a unified feed (trip requests + pre-designed trips). Use filters.
3. **Create trip**: "Request trip" → multi-stop locations, date/time, duration, service type, notes → Review → Submit (no price).
4. **Offers**: Offers tab lists offers; open one → Accept / Counter / Reject. Counter goes to negotiation; Accept goes to booking.
5. **Booking**: Booking summary → Payment (full/partial) → Payment success.
6. **My Trips**: Tabs: Upcoming, Ongoing, Completed, Cancelled. Open a trip → schedule, supplier, payment status, cancel, chat.
7. **Cancel**: Cancel trip → refund policy explanation → confirm → Refund status.
8. **Active trip**: Live map (mocked), supplier info, chat, Emergency modal (call support, escalation).
9. **Review**: After completed trip, leave rating and comment.
10. **Profile**: Edit profile, payment history, language, help, logout.
11. **Chat**: Opens from offer/trip; timestamped messages; system messages for price lock/booking; no phone/email shown.

### As Supplier

1. **Sign up**: Welcome → Sign up → "Offer my services" → Supplier type (Driver / Tour Guide / Tour Agency) → Documents → Service details (locations, languages, availability) → Verification status (pending/approved/rejected).
2. **Dashboard**: Earnings summary, upcoming/completed/cancelled counts, upcoming trips list.
3. **Requests**: New trip requests → open request → Submit offer (price + message) → Negotiation → Booking confirmed (simulated).
4. **Create trip** (Guides & Agencies only): Itinerary, duration, fixed/negotiable price, capacity, publish. **Drivers** see restricted message.
5. **My trips**: List of trips; link to create trip for non-drivers.
6. **Active trip**: Trip detail → Start trip → Map (mocked) → End trip (with confirmation).
7. **Profile**: Public profile view, verification badge, edit profile, availability schedule, reviews & ratings, logout.
8. **Notifications**: New requests, negotiation updates, booking confirmations, reminders, cancellations.

## Project Structure

```
app/
  page.tsx              # Root redirect (splash or role-based home)
  layout.tsx             # Root layout + AppProvider
  globals.css
  splash/
  welcome/
  role-select/
  login/
  otp/
  password-create/
  onboarding/
    supplier-type/
    documents/
    service-details/
    verification-status/
  traveler/              # Traveler app (layout + bottom nav)
    page.tsx             # Home / marketplace
    create-trip/
    offers/
    offer/[id]/
    negotiation/[id]/
    booking/[id]/
    payment/[id]/
    payment-success/
    payment-failure/
    my-trips/
    trip/[id]/
    cancel/[id]/
    refund-status/
    active-trip/[id]/
    review/[id]/
    profile/
    chat/[id]/
  supplier/              # Supplier app (layout + bottom nav)
    page.tsx             # Dashboard
    requests/
    request/[id]/
    offer/[id]/
    negotiation/[id]/
    booking-confirmed/
    create-trip/         # Restricted for drivers
    my-trips/
    active-trip/[id]/
    profile/
    notifications/
components/
  ui/                    # Button, Input, Badge, Modal
  Header.tsx
  BottomNav.tsx
  TripCard.tsx
  ProfileCard.tsx
  StatusBadge.tsx
  chat/Chat.tsx
lib/
  context.tsx            # Auth + role (loginAsTraveler, loginAsSupplier, logout)
  mock-data.ts
types/
  index.ts               # User, Trip, Offer, Booking, ChatMessage, REFUND_POLICY
```

## Design & UX

- **Mobile-first**: Max width 428px container, touch-friendly targets (min 44px).
- **Trust & safety**: Verification badges, refund policy (≥24h full, 10–24h 50%, <10h none), in-app chat only (no phone/email), emergency/support modal.
- **Empty & error states**: Clear copy; no lorem ipsum.
- **Role-based UI**: Traveler vs Supplier layouts and nav; supplier type (driver/guide/agency) gates "Create trip"; unverified supplier can see restricted UI (handled in verification-status and dashboard).

## Refund Policy (UI)

- **≥24h** before trip: Full refund  
- **10–24h**: 50% refund  
- **<10h**: No refund  

Shown on cancellation and refund-status screens.

## Exclusions (per spec)

- No admin dashboard  
- No backend services  
- No real payment integration  
- No desktop-specific UI  

## Extending

- Replace `lib/context.tsx` with real auth (e.g. NextAuth, Supabase).
- Replace `lib/mock-data.ts` with API calls or server actions.
- Add API routes under `app/api/` for trips, offers, bookings, chat, payments.
- Connect Chat to a real messaging service; keep "no phone/email" rule in UI.

---

**ViaJalan** – Tourism marketplace prototype. Ready for investor demo, UX testing, and developer handoff.
