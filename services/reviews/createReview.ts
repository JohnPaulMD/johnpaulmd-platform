import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { ReviewData } from "@/components/admin/ReviewEditor";

export async function createReview(
  review: ReviewData
) {
  const docRef = await addDoc(
    collection(db, "reviews"),
    {
      ...review,

      createdAt: serverTimestamp(),

      submittedAt: serverTimestamp(),

      updatedAt: serverTimestamp(),
    }
  );

  return docRef.id;
}