"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams } from "next/navigation";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import ReviewEditor, {
  ReviewData,
} from "@/components/admin/ReviewEditor";

export default function EditReviewPage() {
  const params = useParams();

  const id = params.id as string;

  const [review, setReview] =
    useState<ReviewData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadReview() {
      if (!id) {
        return;
      }

      try {
        setLoading(true);

        setError("");

        const reviewRef = doc(
          db,
          "reviews",
          id
        );

        const snapshot =
          await getDoc(reviewRef);

        if (!snapshot.exists()) {
          setError(
            "Review not found."
          );

          return;
        }

        const data =
          snapshot.data();

        const reviewData: ReviewData = {
          name:
            data.name || "",

          role:
            data.role || "",

          universityOrganisation:
            data.universityOrganisation ||
            "",

          review:
            data.review || "",

          rating:
            Number(
              data.rating || 0
            ),

          image:
            data.image || "",

          month:
            data.month || "",

          year:
            Number(
              data.year ||
                new Date().getFullYear()
            ),

          featured:
            Boolean(
              data.featured
            ),

          status:
            data.status ===
              "Published" ||
            data.status ===
              "Rejected"
              ? data.status
              : "Pending",
        };

        setReview(
          reviewData
        );
      } catch (error) {
        console.error(
          "Failed to load review:",
          error
        );

        setError(
          "Failed to load review."
        );
      } finally {
        setLoading(false);
      }
    }

    loadReview();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center">

        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#071A3D]" />

        <p className="mt-4 text-gray-500">
          Loading review...
        </p>

      </div>
    );
  }

  if (
    error ||
    !review
  ) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-sm">

        <h1 className="text-2xl font-bold text-[#071A3D]">
          Review Not Available
        </h1>

        <p className="mt-3 text-gray-500">
          {error ||
            "The requested review could not be found."}
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          Reviews
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#071A3D]">
          Edit Review
        </h1>

        <p className="mt-2 text-gray-500">
          Edit the testimonial, rating,
          date and publication settings.
        </p>

      </div>

      <ReviewEditor
        reviewId={id}
        initialData={review}
      />

    </div>
  );
}