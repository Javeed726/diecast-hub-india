import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import type { DiecastWebsite } from '../types';

const COLLECTION = 'websites';

// ── Real-time subscription ──────────────────────────────────────────────────
export function subscribeToWebsites(
  callback: (sites: DiecastWebsite[]) => void,
  onError?: (err: Error) => void
) {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const sites: DiecastWebsite[] = snapshot.docs.map((d) => ({
        ...(d.data() as Omit<DiecastWebsite, 'id'>),
        id: d.id,
      }));
      callback(sites);
    },
    onError
  );
}

// ── One-time fetch ──────────────────────────────────────────────────────────
export async function fetchWebsites(): Promise<DiecastWebsite[]> {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    ...(d.data() as Omit<DiecastWebsite, 'id'>),
    id: d.id,
  }));
}

// ── Add ─────────────────────────────────────────────────────────────────────
export async function addWebsite(
  data: Omit<DiecastWebsite, 'id' | 'createdAt'>
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: Timestamp.now().toMillis(),
  });
  return ref.id;
}

// ── Update ──────────────────────────────────────────────────────────────────
export async function updateWebsite(
  id: string,
  data: Partial<Omit<DiecastWebsite, 'id' | 'createdAt'>>
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, data);
}

// ── Delete ──────────────────────────────────────────────────────────────────
export async function deleteWebsite(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
