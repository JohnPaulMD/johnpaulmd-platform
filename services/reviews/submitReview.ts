import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface PublicReviewSubmission {
  name: string;
  role: string;
  universityOrganisation: string;
  review: string;
  rating: number;
}

export async function submitReview(
  review: PublicReviewSubmission
) {
  const now = new Date();

  const month = now.toLocaleString("en-US", {
    month: "long",
  });

  const year = now.getFullYear();

  const docRef = await addDoc(
    collection(db, "reviews"),
    {
      name: review.name.trim(),

      role: review.role.trim(),

      universityOrganisation:
        review.universityOrganisation.trim(),

      review: review.review.trim(),

      rating: review.rating,

      image: "",

      month,

      year,

      status: "Pending",

      featured: false,

      submittedAt: serverTimestamp(),

      updatedAt: serverTimestamp(),
    }
  );

  return docRef.id;
}