import { Timestamp } from "firebase/firestore";

export interface OutageReport {
  id: string;
  lat: number;
  lng: number;
  createdAt: Timestamp;
  confirmations: number;
  hasPowerNearby: boolean;
}

export interface NewOutageReport {
  lat: number;
  lng: number;
  hasPowerNearby: boolean;
}
