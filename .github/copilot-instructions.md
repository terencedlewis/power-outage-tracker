# Power Outage Tracker — Copilot Instructions

## Project Overview
A real-time community power outage tracking app. Users report outages with GPS coordinates, others confirm them, and a live map displays clusters.

## Tech Stack
- **Framework:** Next.js (App Router, v15+)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Firestore + realtime listeners)
- **Map:** react-map-gl + maplibre-gl (no API key required)
- **Clustering:** supercluster
- **Notifications:** react-hot-toast
- **Validation:** zod

## Data Model

```ts
interface OutageReport {
  id: string;
  lat: number;
  lng: number;
  createdAt: Timestamp;   // Firebase Timestamp
  confirmations: number;
  hasPowerNearby: boolean;
}
```

Firestore collection: `outages`

## Project Structure

```
src/
  app/
    layout.tsx           # Root layout with Toaster
    page.tsx             # Home — full-screen map
    report/
      page.tsx           # /report — submit new outage form
  components/
    map/
      MapView.tsx        # Dynamic-imported map (ssr: false)
    OutageMarker.tsx     # Individual outage pin
    ConfirmButton.tsx    # Increment confirmations
  hooks/
    useOutages.ts        # Realtime Firestore subscription
  lib/
    firebase.ts          # Firebase app + db init
    outages.ts           # Firestore read/write helpers
    geo.ts               # Haversine distance utility
  types/
    outage.ts            # OutageReport interface
```

## Coding Rules
- Use **functional React components only** — no class components
- Use **hooks** for all state and side effects
- Keep components **small and focused** — one responsibility per file
- Prefer **server actions** where possible (mutations in lib/outages.ts)
- **Strict TypeScript** — no `any`, always type props with interfaces
- `MapView` must be **dynamically imported** with `ssr: false` (maplibre requires browser APIs)
- All Firestore writes go through `lib/outages.ts`, not inline in components
- Use `zod` for validating user input before writing to Firestore

## Environment Variables
All Firebase config lives in `.env.local` as `NEXT_PUBLIC_FIREBASE_*` keys.
Never hardcode Firebase credentials.

## Style Conventions
- Tailwind only — no CSS modules or inline styles
- Red (`red-500`) for outage indicators
- Yellow (`yellow-500`) for confirm actions
