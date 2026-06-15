"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import LanguageToggle from "@/components/LanguageToggle";
import { useI18n } from "@/components/LanguageProvider";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-gray-400">
      Loading map...
    </div>
  ),
});

export default function Home() {
  const { t } = useI18n();

  return (
    <main className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b bg-white px-4 py-3">
        <h1 className="text-lg font-bold text-gray-800">{t("appTitle")}</h1>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Link
            href="/report"
            className="rounded bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600"
          >
            {t("reportOutage")}
          </Link>
        </div>
      </header>
      <div className="flex-1">
        <MapView />
      </div>
    </main>
  );
}
