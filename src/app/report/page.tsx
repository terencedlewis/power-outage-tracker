"use client";

import { useState } from "react";
import { z } from "zod";
import { addOutageReport } from "@/lib/outages";
import toast from "react-hot-toast";

const schema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  hasPowerNearby: z.boolean(),
});

export default function ReportForm() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [hasPowerNearby, setHasPowerNearby] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = schema.safeParse({
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      hasPowerNearby,
    });

    if (!parsed.success) {
      toast.error("Invalid coordinates.");
      return;
    }

    setLoading(true);
    try {
      await addOutageReport(parsed.data);
      toast.success("Outage reported!");
      setLat("");
      setLng("");
      setHasPowerNearby(false);
    } catch {
      toast.error("Failed to submit report.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
      <h2 className="text-lg font-semibold">Report an Outage</h2>

      <label className="flex flex-col gap-1 text-sm">
        Latitude
        <input
          type="number"
          step="any"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
          placeholder="e.g. 37.7749"
          className="rounded border px-2 py-1"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Longitude
        <input
          type="number"
          step="any"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
          placeholder="e.g. -122.4194"
          className="rounded border px-2 py-1"
        />
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={hasPowerNearby}
          onChange={(e) => setHasPowerNearby(e.target.checked)}
        />
        Power available nearby?
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Submit Report"}
      </button>
    </form>
  );
}
