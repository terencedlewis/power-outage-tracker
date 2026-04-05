"use client";

import { useState } from "react";
import { mockOutages } from "@/lib/mockOutages";
import type { OutageReport } from "@/types/outage";

// TODO: swap mock data for Firebase when credentials are ready
// import { useEffect } from "react";
// import { subscribeToOutages } from "@/lib/outages";

export function useOutages() {
  const [outages] = useState<OutageReport[]>(mockOutages);
  const loading = false;

  return { outages, loading };
}
