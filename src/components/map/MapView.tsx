"use client";

import { useState, useCallback } from "react";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useI18n } from "@/components/LanguageProvider";
import { translateWeatherCondition } from "@/lib/i18n";
import { useOutages } from "@/hooks/useOutages";
import OutageMarker from "@/components/OutageMarker";
import type { OutageReport } from "@/types/outage";

const INITIAL_VIEW = { latitude: 18.2208, longitude: -66.5901, zoom: 8 };

export default function MapView() {
  const { language, t } = useI18n();
  const { outages, loading } = useOutages();
  const [selected, setSelected] = useState<OutageReport | null>(null);

  const handleMarkerClick = useCallback((report: OutageReport) => {
    setSelected(report);
  }, []);

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
          <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] shadow-sm">
            {t("loadingOutages")}
          </span>
        </div>
      )}
      <Map
        initialViewState={INITIAL_VIEW}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://demotiles.maplibre.org/style.json"
      >
        {outages.map((report) => (
          <OutageMarker
            key={report.id}
            report={report}
            onClick={handleMarkerClick}
          />
        ))}
      </Map>

      {selected && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[min(92vw,24rem)] rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 shadow-[0_18px_36px_rgba(18,42,60,0.12)] backdrop-blur">
          <div className="mb-3 h-1.5 rounded-full bg-[linear-gradient(90deg,var(--navy),var(--sea),var(--red),var(--gold))]" />
          <p className="text-sm font-semibold text-[color:var(--foreground)]">
            {selected.outageType === "water"
              ? t("waterOutageReported")
              : t("powerOutageReported")}
          </p>
          <p className="text-xs text-[color:var(--muted)]">
            {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
          </p>
          <p className="text-xs text-[color:var(--muted)]">
            {t("confirmations", { count: selected.confirmations })}
          </p>
          <p className="text-xs text-[color:var(--muted)]">
            {t("weather", {
              value: selected.weatherCondition
                ? translateWeatherCondition(language, selected.weatherCondition)
                : t("unknown"),
            })}
          </p>
          {(selected.reporterEmail || selected.reporterMobileNumber) && (
            <div className="mt-3 border-t border-[color:var(--border)] pt-2">
              <p className="text-xs font-medium text-[color:var(--foreground)]">{t("reporterContact")}</p>
              {selected.reporterEmail && (
                <p className="text-xs text-[color:var(--muted)]">📧 {selected.reporterEmail}</p>
              )}
              {selected.reporterMobileNumber && (
                <p className="text-xs text-[color:var(--muted)]">📱 {selected.reporterMobileNumber}</p>
              )}
            </div>
          )}
          <button
            onClick={() => setSelected(null)}
            className="mt-2 text-xs font-medium text-[color:var(--sea)] underline decoration-[color:var(--sea)] decoration-1 underline-offset-2"
          >
            {t("close")}
          </button>
        </div>
      )}
    </div>
  );
}
