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
    <main className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_30px_70px_rgba(18,42,60,0.12)] backdrop-blur">
        <header className="flex items-center justify-between gap-4 border-b border-[color:var(--border)] bg-[linear-gradient(90deg,rgba(21,58,99,0.97)_0%,rgba(21,58,99,0.94)_58%,rgba(37,120,168,0.9)_100%)] px-4 py-4 text-white sm:px-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.24em] text-white/70">Puerto Rico</p>
            <h1 className="truncate text-lg font-semibold sm:text-xl">{t("reportAnOutage")}</h1>
          </div>
          <LanguageToggle />
        </header>

        <form onSubmit={handleSubmit} className="grid gap-4 p-4 sm:p-6">
          <div className="grid gap-3 rounded-2xl border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(21,58,99,0.06),rgba(37,120,168,0.05)_65%,rgba(235,184,75,0.08))] p-4">
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={geoLoading}
              className="rounded-full bg-[color:var(--navy)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--sea)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {geoLoading ? t("gettingLocation") : t("useMyLocation")}
            </button>
            <p className="text-xs text-[color:var(--muted)]">{t("orClickMapBelow")}</p>
          </div>

          <LocationPicker lat={lat} lng={lng} onLocationChange={(newLat, newLng) => {
            setLat(newLat);
            setLng(newLng);
            toast.success(t("locationUpdated"));
          }} />

          <p className="text-xs font-medium text-[color:var(--muted)]">{t("orEnterCoordinates")}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-medium text-[color:var(--foreground)]">
              {t("latitude")}
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                placeholder={t("latitudePlaceholder")}
                className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-2 outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--sea)] focus:ring-2 focus:ring-[color:rgba(37,120,168,0.18)]"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-[color:var(--foreground)]">
              {t("longitude")}
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                placeholder={t("longitudePlaceholder")}
                className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-2 outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--sea)] focus:ring-2 focus:ring-[color:rgba(37,120,168,0.18)]"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm font-medium text-[color:var(--foreground)]">
            {t("outageType")}
            <select
              value={outageType}
              onChange={(e) => setOutageType(e.target.value as (typeof OUTAGE_TYPES)[number])}
              className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-2 outline-none transition focus:border-[color:var(--sea)] focus:ring-2 focus:ring-[color:rgba(37,120,168,0.18)]"
            >
              {OUTAGE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type === "power" ? `⚡ ${t("power")}` : `💧 ${t("water")}`}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-3 text-sm font-medium text-[color:var(--foreground)]">
            <input
              type="checkbox"
              checked={hasServiceNearby}
              onChange={(e) => setHasServiceNearby(e.target.checked)}
            />
            {t("serviceAvailableNearby")}
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-[color:var(--foreground)]">
            {t("weatherCondition")}
            <select
              value={weatherCondition}
              onChange={(e) =>
                setWeatherCondition(e.target.value as (typeof WEATHER_CONDITIONS)[number])
              }
              className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-2 outline-none transition focus:border-[color:var(--sea)] focus:ring-2 focus:ring-[color:rgba(37,120,168,0.18)]"
            >
              {WEATHER_CONDITIONS.map((condition) => (
                <option key={condition} value={condition}>
                  {translateWeatherCondition(language, condition)}
                </option>
              ))}
            </select>
          </label>

          <p className="text-xs font-medium text-[color:var(--muted)]">{t("contactInfoOptional")}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-medium text-[color:var(--foreground)]">
              {t("email")}
              <input
                type="email"
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-2 outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--sea)] focus:ring-2 focus:ring-[color:rgba(37,120,168,0.18)]"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-[color:var(--foreground)]">
              {t("mobileNumber")}
              <input
                type="tel"
                value={reporterMobileNumber}
                onChange={(e) => setReporterMobileNumber(e.target.value)}
                placeholder={t("mobilePlaceholder")}
                className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-2 outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--sea)] focus:ring-2 focus:ring-[color:rgba(37,120,168,0.18)]"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[linear-gradient(90deg,var(--navy),var(--sea))] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? t("submitting") : t("submitReport")}
          </button>
        </form>
      </div>
    </main>
  );
}
