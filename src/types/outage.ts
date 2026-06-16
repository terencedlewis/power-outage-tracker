import { Timestamp } from "firebase/firestore";

export const WEATHER_CONDITIONS = [
  "clear",
  "rain",
  "storm",
  "snow",
  "wind",
  "other",
] as const;

export type WeatherCondition = (typeof WEATHER_CONDITIONS)[number];

export const OUTAGE_TYPES = ["power", "water"] as const;
export type OutageType = (typeof OUTAGE_TYPES)[number];

export interface OutageReport {
  id: string;
  lat: number;
  lng: number;
  outageType: OutageType;
  createdAt: Timestamp;
  confirmations: number;
  hasServiceNearby: boolean;
  weatherCondition?: WeatherCondition;
  reporterEmail?: string;
  reporterMobileNumber?: string;
}

export interface NewOutageReport {
  lat: number;
  lng: number;
  outageType: OutageType;
  hasServiceNearby: boolean;
  weatherCondition: WeatherCondition;
  reporterEmail?: string;
  reporterMobileNumber?: string;
}
