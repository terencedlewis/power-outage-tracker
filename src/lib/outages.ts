import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  increment,
} from "firebase/firestore";
import { db } from "./firebase";
import type { OutageReport, NewOutageReport } from "@/types/outage";

const COLLECTION = "outages";

export function subscribeToOutages(
  callback: (reports: OutageReport[]) => void
): () => void {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const reports: OutageReport[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<OutageReport, "id">),
    }));
    callback(reports);
  });
}

export async function addOutageReport(report: NewOutageReport): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...report,
    confirmations: 0,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function confirmOutage(id: string): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    confirmations: increment(1),
  });
}
