"use client";

import { Marker } from "react-map-gl/maplibre";
import type { OutageReport } from "@/types/outage";

interface Props {
  report: OutageReport;
  onClick: (report: OutageReport) => void;
}

export default function OutageMarker({ report, onClick }: Props) {
  return (
    <Marker latitude={report.lat} longitude={report.lng} anchor="center">
      <button
        onClick={() => onClick(report)}
        title={`${report.confirmations} confirmations`}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md hover:bg-red-600"
      >
        {report.confirmations}
      </button>
    </Marker>
  );
}
