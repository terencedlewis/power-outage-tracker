"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-gray-400">
      Loading map…
    </div>
  ),
});

export default function Home() {
  return (
    <main className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b bg-white px-4 py-3">
        <h1 className="text-lg font-bold text-red-600">Power Outage Tracker</h1>
        <Link
          href="/report"
          className="rounded bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
        >
          Report Outage
        </Link>
      </header>
      <div className="flex-1">
        <MapView />
      </div>
    </main>
  );
}
