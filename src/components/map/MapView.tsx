"use client";

import { useState, useCallback } from "react";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useOutages } from "@/hooks/useOutages";
import OutageMarker from "@/components/OutageMarker";
import type { OutageReport } from "@/types/outage";

const INITIAL_VIEW = { latitude: 18.2208, longitude: -66.5901, zoom: 8 };

export default function MapView() {
  const { outages, loading } = useOutages();
  const [selected, setSelected] = useState<OutageReport | null>(null);

  const handleMarkerClick = useCallback((report: OutageReport) => {
    setSelected(report);
  }, []);

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
          <span className="text-sm text-gray-500">Loading outages…</span>
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
          <p className="text-sm font-semibold">Outage reported</p>
          <p className="text-xs text-gray-500">
            {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
          </p>
          <p className="text-xs text-gray-500">
            Confirmations: {selected.confirmations}
          </p>
          <p className="text-xs text-gray-500">
            Weather: {selected.weatherCondition ?? "Unknown"}
          </p>
          <button
            onClick={() => setSelected(null)}
            className="mt-1 text-xs text-blue-500 underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
