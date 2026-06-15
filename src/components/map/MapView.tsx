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
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
          <span className="text-sm text-gray-500">{t("loadingOutages")}</span>
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-white px-4 py-3 shadow-lg">
          <p className="text-sm font-semibold">
            {selected.outageType === "water"
              ? t("waterOutageReported")
              : t("powerOutageReported")}
          </p>
          <p className="text-xs text-gray-500">
            {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
          </p>
          <p className="text-xs text-gray-500">
            {t("confirmations", { count: selected.confirmations })}
          </p>
          <p className="text-xs text-gray-500">
            {t("weather", {
              value: selected.weatherCondition
                ? translateWeatherCondition(language, selected.weatherCondition)
                : t("unknown"),
            })}
          </p>
          {(selected.reporterEmail || selected.reporterMobileNumber) && (
            <div className="mt-2 border-t pt-2">
              <p className="text-xs font-medium text-gray-600">{t("reporterContact")}</p>
              {selected.reporterEmail && (
                <p className="text-xs text-gray-600">📧 {selected.reporterEmail}</p>
              )}
              {selected.reporterMobileNumber && (
                <p className="text-xs text-gray-600">📱 {selected.reporterMobileNumber}</p>
              )}
            </div>
          )}
          <button
            onClick={() => setSelected(null)}
            className="mt-1 text-xs text-blue-500 underline"
          >
            {t("close")}
          </button>
        </div>
      )}
    </div>
  );
}
