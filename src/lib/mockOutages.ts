import type { OutageReport } from "@/types/outage";
import { Timestamp } from "firebase/firestore";

export const mockOutages: OutageReport[] = [
  {
    id: "mock-1",
    lat: 18.4655,
    lng: -66.1057,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 10)),
    confirmations: 5,
    hasPowerNearby: false,
    weatherCondition: "storm",
  },
  {
    id: "mock-2",
    lat: 18.0111,
    lng: -66.6141,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 25)),
    confirmations: 2,
    hasPowerNearby: true,
    weatherCondition: "rain",
  },
  {
    id: "mock-3",
    lat: 18.2011,
    lng: -67.1396,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 5)),
    confirmations: 8,
    hasPowerNearby: false,
    weatherCondition: "wind",
  },
  {
    id: "mock-4",
    lat: 18.3808,
    lng: -65.9574,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 45)),
    confirmations: 1,
    hasPowerNearby: false,
    weatherCondition: "clear",
  },
  {
    id: "mock-5",
    lat: 18.3358,
    lng: -64.8963,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 60)),
    confirmations: 12,
    hasPowerNearby: true,
    weatherCondition: "other",
  },
];
