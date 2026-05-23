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

export interface OutageReport {
  id: string;
  lat: number;
  lng: number;
  createdAt: Timestamp;
  confirmations: number;
  hasPowerNearby: boolean;
  weatherCondition?: WeatherCondition;
}

export interface NewOutageReport {
  lat: number;
  lng: number;
  hasPowerNearby: boolean;
  weatherCondition: WeatherCondition;
}
