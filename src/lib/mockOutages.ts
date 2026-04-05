import type { OutageReport } from "@/types/outage";
import { Timestamp } from "firebase/firestore";

export const mockOutages: OutageReport[] = [
  {
    id: "mock-1",
    lat: 37.7749,
    lng: -122.4194,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 10)),
    confirmations: 5,
    hasPowerNearby: false,
  },
  {
    id: "mock-2",
    lat: 37.7849,
    lng: -122.4094,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 25)),
    confirmations: 2,
    hasPowerNearby: true,
  },
  {
    id: "mock-3",
    lat: 37.7649,
    lng: -122.4294,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 5)),
    confirmations: 8,
    hasPowerNearby: false,
  },
  {
    id: "mock-4",
    lat: 37.7699,
    lng: -122.4094,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 45)),
    confirmations: 1,
    hasPowerNearby: false,
  },
  {
    id: "mock-5",
    lat: 37.7799,
    lng: -122.4394,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 60)),
    confirmations: 12,
    hasPowerNearby: true,
  },
];
