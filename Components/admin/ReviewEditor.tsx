"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createReview } from "@/services/reviews/createReview";
import { updateReview } from "@/services/reviews/updateReview";

export interface ReviewData {
  name: string;

  role: string;

  universityOrganisation: string;

  review: string;

  rating: number;

  image: string;

  month: string;

  year: number;

  featured: boolean;

  status:
    | "Pending"
    | "Published"
    | "Rejected";
}

interface ReviewEditorProps {
  reviewId?: string;

  initialData?: ReviewData;
}

const defaultReviewData: ReviewData = {
  name: "",

  role: "",

  universityOrganisation: "",

  review: "",

  rating: 5,

  image: "",

  month: new Date().toLocaleString(
    "en-US",
    {
      month: "long",
    }
  ),

  year: new Date().getFullYear(),

  featured: false,

  status: "Pending",
};

export default function ReviewEditor({
  reviewId,
  initialData,
}: ReviewEditorProps) {
  const router = useRouter();

  const [reviewData, setReviewData] =
    useState<ReviewData>(() =>
      initialData
        ? { ...initialData }
        : { ...defaultReviewData }
    );

  const [saving, setSaving] =
    useState(false);

  const [saveError, setSaveError] =
    useState("");

  const isEditing =
    Boolean(reviewId);

  function updateField<
    K extends keyof ReviewData
  >(
    field: K,
    value: ReviewData[K]
  ) {
    setReviewData(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );
  }

  async function handleSave() {
    if (!reviewData.name.trim()) {
      setSaveError(
        "Please enter the client's name."
      );

      return;
    }

    if (!reviewData.review.trim()) {
      setSaveError(
        "Please enter the review."
      );

      return;
    }

    try {
      setSaving(true);

      setSaveError("");

      if (
        isEditing &&
        reviewId
      ) {
        await updateReview(
          reviewId,
          reviewData
        );

        alert(
          "Review updated successfully!"
        );
      } else {
        await createReview(
          reviewData
        );

        alert(
          "Review saved successfully!"
        );
      }

      router.push(
        "/admin/reviews"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Review save failed:",
        error
      );

      setSaveError(
        isEditing
          ? "Failed to update review."
          : "Failed to save review."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* CLIENT INFORMATION */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold text-[#071A3D]">
          Client Information
        </h2>

        <div className="space-y-6">

          {/* NAME */}

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Client Name
            </label>

            <input
              type="text"
              value={reviewData.name}
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value
                )
              }
              placeholder="Enter client name"
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* ROLE */}

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                Role / Position
              </label>

              <input
                type="text"
                value={reviewData.role}
                onChange={(event) =>
                  updateField(
                    "role",
                    event.target.value
                  )
                }
                placeholder="e.g. Researcher, Student, Lecturer"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
              />

            </div>

            {/* UNIVERSITY / ORGANISATION */}

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                University / Organisation
              </label>

              <input
                type="text"
                value={
                  reviewData.universityOrganisation
                }
                onChange={(event) =>
                  updateField(
                    "universityOrganisation",
                    event.target.value
                  )
                }
                placeholder="Enter university or organisation"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
              />

            </div>

          </div>

        </div>

      </section>

      {/* REVIEW */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold text-[#071A3D]">
          Review
        </h2>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Client Review
            </label>

            <textarea
              rows={7}
              value={reviewData.review}
              onChange={(event) =>
                updateField(
                  "review",
                  event.target.value
                )
              }
              placeholder="Enter the client's review..."
              className="w-full rounded-xl border border-gray-300 p-4 text-gray-900"
            />

          </div>

          {/* RATING */}

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Rating
            </label>

            <select
              value={reviewData.rating}
              onChange={(event) =>
                updateField(
                  "rating",
                  Number(
                    event.target.value
                  )
                )
              }
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-900 md:w-48"
            >

              <option value={5}>
                5 Stars
              </option>

              <option value={4}>
                4 Stars
              </option>

              <option value={3}>
                3 Stars
              </option>

              <option value={2}>
                2 Stars
              </option>

              <option value={1}>
                1 Star
              </option>

            </select>

          </div>

        </div>

      </section>

      {/* DATE */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold text-[#071A3D]">
          Review Date
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          The month and year are automatically recorded
          when the review is submitted. You can correct
          them here if necessary.
        </p>

        <div className="grid gap-6 md:grid-cols-2">

          {/* MONTH */}

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Month
            </label>

            <select
              value={reviewData.month}
              onChange={(event) =>
                updateField(
                  "month",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
            >

              <option value="January">
                January
              </option>

              <option value="February">
                February
              </option>

              <option value="March">
                March
              </option>

              <option value="April">
                April
              </option>

              <option value="May">
                May
              </option>

              <option value="June">
                June
              </option>

              <option value="July">
                July
              </option>

              <option value="August">
                August
              </option>

              <option value="September">
                September
              </option>

              <option value="October">
                October
              </option>

              <option value="November">
                November
              </option>

              <option value="December">
                December
              </option>

            </select>

          </div>

          {/* YEAR */}

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Year
            </label>

            <input
              type="number"
              value={reviewData.year}
              onChange={(event) =>
                updateField(
                  "year",
                  Number(
                    event.target.value
                  )
                )
              }
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
            />

          </div>

        </div>

      </section>

      {/* CLIENT IMAGE */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold text-[#071A3D]">
          Client Image
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          Enter an image URL if you want to display
          the client&apos;s photograph.
        </p>

        <input
          type="text"
          value={reviewData.image}
          onChange={(event) =>
            updateField(
              "image",
              event.target.value
            )
          }
          placeholder="https://..."
          className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
        />

        {reviewData.image && (

          <div className="mt-6">

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={reviewData.image}
              alt={
                reviewData.name ||
                "Client"
              }
              className="h-24 w-24 rounded-full object-cover"
            />

          </div>

        )}

      </section>

      {/* REVIEW STATUS */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold text-[#071A3D]">
          Review Status
        </h2>

        <div className="space-y-6">

          {/* FEATURED */}

          <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold text-gray-800">
                Featured Review
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Feature this testimonial prominently
                on the website.
              </p>

            </div>

            <input
              type="checkbox"
              checked={reviewData.featured}
              onChange={(event) =>
                updateField(
                  "featured",
                  event.target.checked
                )
              }
              className="h-5 w-5"
            />

          </div>

          {/* STATUS */}

          <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold text-gray-800">
                Status
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Pending reviews remain private until
                you approve them.
              </p>

            </div>

            <select
              value={reviewData.status}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target.value as
                    | "Pending"
                    | "Published"
                    | "Rejected"
                )
              }
              className="rounded-xl border border-gray-300 p-3 text-gray-900"
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Published">
                Published
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>

          {/* ERROR */}

          {saveError && (

            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {saveError}
            </div>

          )}

          {/* BUTTONS */}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                router.push(
                  "/admin/reviews"
                )
              }
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="rounded-xl bg-[#071A3D] px-8 py-3 font-semibold text-white transition hover:bg-[#0A2557] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                ? "Update Review"
                : "Save Review"}
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}