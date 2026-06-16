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
    <main className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_30px_70px_rgba(18,42,60,0.12)] backdrop-blur">
        <header className="flex items-center justify-between gap-4 border-b border-[color:var(--border)] bg-[linear-gradient(90deg,rgba(21,58,99,0.97)_0%,rgba(21,58,99,0.94)_58%,rgba(37,120,168,0.9)_100%)] px-4 py-4 text-white sm:px-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.24em] text-white/70">Puerto Rico</p>
            <h1 className="truncate text-lg font-semibold sm:text-xl">{t("appTitle")}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Link
              href="/report"
              className="rounded-full border border-white/10 bg-white/12 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-white/18"
            >
              {t("reportOutage")}
            </Link>
          </div>
        </header>
        <div className="min-h-0 flex-1 bg-[linear-gradient(180deg,rgba(142,208,234,0.06),rgba(255,255,255,0)_45%)]">
          <MapView />
        </div>
      </div>
    </main>
  );
}
