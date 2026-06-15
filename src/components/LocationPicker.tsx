"use client";

import { useState, useCallback } from "react";
import Map from "react-map-gl/maplibre";
import { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useI18n } from "@/components/LanguageProvider";

interface LocationPickerProps {
  lat: string;
  lng: string;
  onLocationChange: (lat: string, lng: string) => void;
}

const INITIAL_VIEW = { latitude: 18.2208, longitude: -66.5901, zoom: 8 };

export default function LocationPicker({
  lat,
  lng,
  onLocationChange,
}: LocationPickerProps) {
  const { t } = useI18n();
  const [viewState, setViewState] = useState(INITIAL_VIEW);

  const handleMapClick = useCallback(
    (e: any) => {
      const { lng: clickLng, lat: clickLat } = e.lngLat;
      onLocationChange(clickLat.toFixed(6), clickLng.toFixed(6));
    },
    [onLocationChange]
  );

  const currentLat = lat ? parseFloat(lat) : INITIAL_VIEW.latitude;
  const currentLng = lng ? parseFloat(lng) : INITIAL_VIEW.longitude;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold">{t("clickMapToSetLocation")}</p>
      <div className="h-64 w-full overflow-hidden rounded border">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://demotiles.maplibre.org/style.json"
          onClick={handleMapClick}
        >
          {lat && lng && (
            <Marker latitude={currentLat} longitude={currentLng} anchor="center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white shadow-md">
                📍
              </div>
            </Marker>
          )}
        </Map>
      </div>
      {lat && lng && (
        <p className="text-xs text-gray-600">
          {t("selected", {
            lat: parseFloat(lat).toFixed(4),
            lng: parseFloat(lng).toFixed(4),
          })}
        </p>
      )}
    </div>
  );
}
