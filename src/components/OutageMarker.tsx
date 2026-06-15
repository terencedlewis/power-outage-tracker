"use client";

import { Marker } from "react-map-gl/maplibre";
import { useI18n } from "@/components/LanguageProvider";
import type { OutageReport } from "@/types/outage";

interface Props {
  report: OutageReport;
  onClick: (report: OutageReport) => void;
}

function getMarkerStyle(outageType: string) {
  const baseClass = "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white shadow-md";
  const colorClass = outageType === "water" ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600";
  return `${baseClass} ${colorClass}`;
}

function getIcon(outageType: string) {
  return outageType === "water" ? "💧" : "⚡";
}

export default function OutageMarker({ report, onClick }: Props) {
  const { t } = useI18n();

  return (
    <Marker latitude={report.lat} longitude={report.lng} anchor="center">
      <button
        onClick={() => onClick(report)}
        title={`${report.outageType === "water" ? t("water") : t("power")} - ${t("confirmations", {
          count: report.confirmations,
        })}`}
        className={getMarkerStyle(report.outageType)}
      >
        {report.confirmations}
      </button>
    </Marker>
  );
}
