"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import {
  CheckCircle2,
  MessageSquareQuote,
  Star,
} from "lucide-react";

import { submitReview } from "@/services/reviews/submitReview";

import { markReviewInvitationUsed } from "@/services/reviewInvitations/useReviewInvitation";

interface ReviewSubmissionFormProps {
  invitationId: string;
  clientName?: string;
}

export default function ReviewSubmissionForm({
  invitationId,
  clientName = "",
}: ReviewSubmissionFormProps) {
  const [name, setName] =
    useState(clientName);

  const [role, setRole] =
    useState("");

  const [
    universityOrganisation,
    setUniversityOrganisation,
  ] = useState("");

  const [review, setReview] =
    useState("");

  const [rating, setRating] =
    useState(0);

  const [submitting, setSubmitting] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim()) {
      setError(
        "Please enter your name."
      );

      return;
    }

    if (rating === 0) {
      setError(
        "Please select a star rating."
      );

      return;
    }

    if (!review.trim()) {
      setError(
        "Please enter your review."
      );

      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const reviewId =
        await submitReview({
          name,
          role,
          universityOrganisation,
          review,
          rating,
        });

      await markReviewInvitationUsed(
        invitationId,
        reviewId
      );

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Review submission failed:",
        error
      );

      setError(
        "We couldn't submit your review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="px-4 py-16 sm:px-6 sm:py-20">

        <div className="mx-auto max-w-2xl">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center sm:p-10 md:p-14">

            <CheckCircle2
              size={54}
              className="mx-auto text-green-400"
            />

            <h1 className="mt-6 text-3xl font-bold text-white md:text-4xl">
              Thank You for Your Review
            </h1>

            <p className="mx-auto mt-5 max-w-lg leading-8 text-white/65">
              Your feedback has been submitted successfully.
              It will be reviewed before being published on
              the website.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/review"
                className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View Reviews
              </Link>

              <Link
                href="/"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-[#071A3D]"
              >
                Return Home
              </Link>

            </div>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">

      <div className="mx-auto max-w-3xl">

        <div className="mb-10 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">

            <MessageSquareQuote
              size={28}
              className="text-white"
            />

          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-white/50">
            Client Feedback
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Share Your Experience
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/65">
            Thank you for working with Manus Dei Solutions.
            Your feedback helps us improve our services and
            share genuine client experiences.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-xl sm:p-7 md:p-10"
        >

          <div className="space-y-7">

            <div>

              <label
                htmlFor="name"
                className="mb-2 block font-semibold text-[#071A3D]"
              >
                Full Name *
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/10"
              />

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label
                  htmlFor="role"
                  className="mb-2 block font-semibold text-[#071A3D]"
                >
                  Role / Position
                </label>

                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(event) =>
                    setRole(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Student, Researcher, Lecturer"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/10"
                />

              </div>

              <div>

                <label
                  htmlFor="universityOrganisation"
                  className="mb-2 block font-semibold text-[#071A3D]"
                >
                  University / Organisation
                </label>

                <input
                  id="universityOrganisation"
                  type="text"
                  value={
                    universityOrganisation
                  }
                  onChange={(event) =>
                    setUniversityOrganisation(
                      event.target.value
                    )
                  }
                  placeholder="Enter your university or organisation"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/10"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-semibold text-[#071A3D]">
                Your Rating *
              </label>

              <p className="mb-3 text-sm text-gray-500">
                Click a star to select your rating.
              </p>

              <div className="flex flex-wrap items-center gap-2">

                {[1, 2, 3, 4, 5].map(
                  (star) => (

                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setRating(star);

                        if (
                          error ===
                          "Please select a star rating."
                        ) {
                          setError("");
                        }
                      }}
                      aria-label={`Give ${star} ${
                        star === 1
                          ? "star"
                          : "stars"
                      }`}
                      aria-pressed={
                        rating === star
                      }
                      className="cursor-pointer rounded-lg p-1 transition duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#071A3D]/30"
                    >

                      <Star
                        size={38}
                        fill={
                          star <= rating
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          star <= rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />

                    </button>

                  )
                )}

              </div>

              <div className="mt-3 min-h-6">

                {rating === 0 ? (

                  <span className="text-sm text-gray-500">
                    No rating selected
                  </span>

                ) : (

                  <>
                    <span className="font-semibold text-[#071A3D]">
                      {rating} / 5
                    </span>

                    <span className="ml-2 text-sm text-gray-500">
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </span>
                  </>

                )}

              </div>

            </div>

            <div>

              <label
                htmlFor="review"
                className="mb-2 block font-semibold text-[#071A3D]"
              >
                Your Review *
              </label>

              <textarea
                id="review"
                rows={7}
                value={review}
                onChange={(event) =>
                  setReview(
                    event.target.value
                  )
                }
                placeholder="Tell us about your experience..."
                required
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 leading-7 text-gray-900 outline-none transition focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/10"
              />

            </div>

            <div className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
              By submitting this review, you agree that
              your name, role, University / Organisation
              and testimonial may be displayed on this
              website after approval.
            </div>

            {error && (

              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>

            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[#071A3D] px-6 py-4 font-bold text-white transition hover:bg-[#0A2557] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Submitting Review..."
                : "Submit Review"}
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}