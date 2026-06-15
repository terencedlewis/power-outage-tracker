"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { z } from "zod";
import { addOutageReport } from "@/lib/outages";
import LanguageToggle from "@/components/LanguageToggle";
import { useI18n } from "@/components/LanguageProvider";
import { translateWeatherCondition } from "@/lib/i18n";
import { WEATHER_CONDITIONS, OUTAGE_TYPES } from "@/types/outage";
import toast from "react-hot-toast";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
  ssr: false,
  loading: () => <div className="text-sm text-gray-400">Loading map...</div>,
});

const schema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  outageType: z.enum(OUTAGE_TYPES),
  hasServiceNearby: z.boolean(),
  weatherCondition: z.enum(WEATHER_CONDITIONS),
  reporterEmail: z.string().email().optional().or(z.literal("")),
  reporterMobileNumber: z.string().regex(/^[\d+\-\s()]*$/).optional().or(z.literal("")),
});

export default function ReportForm() {
  const { language, t } = useI18n();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [outageType, setOutageType] = useState<(typeof OUTAGE_TYPES)[number]>("power");
  const [hasServiceNearby, setHasServiceNearby] = useState(false);
  const [weatherCondition, setWeatherCondition] =
    useState<(typeof WEATHER_CONDITIONS)[number]>("clear");
  const [reporterEmail, setReporterEmail] = useState("");
  const [reporterMobileNumber, setReporterMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  function handleUseMyLocation() {
    setGeoLoading(true);
    if (!navigator.geolocation) {
      toast.error(t("geolocationNotSupported"));
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude.toFixed(6));
        setLng(longitude.toFixed(6));
        toast.success(
          t("locationSet", {
            lat: latitude.toFixed(4),
            lng: longitude.toFixed(4),
          })
        );
        setGeoLoading(false);
      },
      (error) => {
        let message = t("failedToGetLocation");
        if (error.code === error.PERMISSION_DENIED) {
          message = t("locationPermissionDenied");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = t("locationUnavailable");
        } else if (error.code === error.TIMEOUT) {
          message = t("locationRequestTimedOut");
        }
        toast.error(message);
        setGeoLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = schema.safeParse({
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      outageType,
      hasServiceNearby,
      weatherCondition,
      reporterEmail: reporterEmail || undefined,
      reporterMobileNumber: reporterMobileNumber || undefined,
    });

    if (!parsed.success) {
      toast.error(t("invalidCoordinates"));
      return;
    }

    setLoading(true);
    try {
      await addOutageReport(parsed.data);
      toast.success(t("outageReportedSuccess"));
      setLat("");
      setLng("");
      setOutageType("power");
      setHasServiceNearby(false);
      setWeatherCondition("clear");
      setReporterEmail("");
      setReporterMobileNumber("");
    } catch {
      toast.error(t("submitFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t("reportAnOutage")}</h2>
        <LanguageToggle />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={geoLoading}
          className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50"
        >
          {geoLoading ? t("gettingLocation") : t("useMyLocation")}
        </button>
        <p className="text-xs text-gray-500">{t("orClickMapBelow")}</p>
      </div>

      <LocationPicker lat={lat} lng={lng} onLocationChange={(newLat, newLng) => {
        setLat(newLat);
        setLng(newLng);
        toast.success(t("locationUpdated"));
      }} />

      <p className="text-xs text-gray-500">{t("orEnterCoordinates")}</p>

      <label className="flex flex-col gap-1 text-sm">
        {t("latitude")}
        <input
          type="number"
          step="any"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
          placeholder={t("latitudePlaceholder")}
          className="rounded border px-2 py-1"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        {t("longitude")}
        <input
          type="number"
          step="any"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
          placeholder={t("longitudePlaceholder")}
          className="rounded border px-2 py-1"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        {t("outageType")}
        <select
          value={outageType}
          onChange={(e) => setOutageType(e.target.value as (typeof OUTAGE_TYPES)[number])}
          className="rounded border px-2 py-1"
        >
          {OUTAGE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type === "power" ? `⚡ ${t("power")}` : `💧 ${t("water")}`}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={hasServiceNearby}
          onChange={(e) => setHasServiceNearby(e.target.checked)}
        />
        {t("serviceAvailableNearby")}
      </label>

      <label className="flex flex-col gap-1 text-sm">
        {t("weatherCondition")}
        <select
          value={weatherCondition}
          onChange={(e) =>
            setWeatherCondition(e.target.value as (typeof WEATHER_CONDITIONS)[number])
          }
          className="rounded border px-2 py-1"
        >
          {WEATHER_CONDITIONS.map((condition) => (
            <option key={condition} value={condition}>
              {translateWeatherCondition(language, condition)}
            </option>
          ))}
        </select>
      </label>

      <p className="text-xs text-gray-500 font-medium">{t("contactInfoOptional")}</p>

      <label className="flex flex-col gap-1 text-sm">
        {t("email")}
        <input
          type="email"
          value={reporterEmail}
          onChange={(e) => setReporterEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          className="rounded border px-2 py-1"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        {t("mobileNumber")}
        <input
          type="tel"
          value={reporterMobileNumber}
          onChange={(e) => setReporterMobileNumber(e.target.value)}
          placeholder={t("mobilePlaceholder")}
          className="rounded border px-2 py-1"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? t("submitting") : t("submitReport")}
      </button>
    </form>
  );
}
