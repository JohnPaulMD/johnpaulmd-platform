import {
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { ReviewData } from "@/components/admin/ReviewEditor";

export async function updateReview(
  id: string,
  review: ReviewData
) {
  await updateDoc(
    doc(db, "reviews", id),
    {
      ...review,

      updatedAt: serverTimestamp(),
    }
  );
}