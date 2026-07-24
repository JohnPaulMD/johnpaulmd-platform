import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface PublishedReview {
  id: string;

  name: string;
  role: string;
  universityOrganisation: string;

  review: string;
  rating: number;

  image: string;

  month: string;
  year: number;

  featured: boolean;
}

export async function getPublishedReviews(): Promise<
  PublishedReview[]
> {
  const reviewsQuery = query(
    collection(db, "reviews"),
    where(
      "status",
      "==",
      "Published"
    )
  );

  const snapshot =
    await getDocs(reviewsQuery);

  const reviews: PublishedReview[] =
    snapshot.docs.map(
      (document) => {
        const data =
          document.data();

        return {
          id: document.id,

          name:
            data.name ||
            "Anonymous Client",

          role:
            data.role || "",

          universityOrganisation:
            data.universityOrganisation ||
            "",

          review:
            data.review || "",

          rating: Number(
            data.rating || 0
          ),

          image:
            data.image || "",

          month:
            data.month || "",

          year: Number(
            data.year || 0
          ),

          featured: Boolean(
            data.featured
          ),
        };
      }
    );

  return reviews.sort(
    (a, b) =>
      b.year - a.year
  );
}