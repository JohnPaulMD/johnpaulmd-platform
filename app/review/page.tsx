"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  MessageSquareQuote,
  Star,
} from "lucide-react";

import {
  getPublishedReviews,
  PublishedReview,
} from "@/services/reviews/getPublishedReviews";

export default function ReviewPage() {
  const [
    reviews,
    setReviews,
  ] = useState<PublishedReview[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadReviews() {
      try {
        const data =
          await getPublishedReviews();

        setReviews(data);
      } catch (error) {
        console.error(
          "Failed to load published reviews:",
          error
        );

        setError(
          "We couldn't load the reviews right now."
        );
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F7F3]">

      {/* HERO */}

      <section className="bg-[#071A3D] px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-20 sm:pt-36">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">

            <MessageSquareQuote
              size={28}
            />

          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-200 sm:text-sm">
            Client Testimonials
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            What Clients Say
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 lg:text-lg">
            Read experiences shared by clients who have
            worked with Manus Dei Solutions across research,
            data analytics and professional projects.
          </p>

        </div>

      </section>

      {/* REVIEWS */}

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-7xl">

          {loading && (

            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#071A3D]" />

              <p className="mt-4 text-gray-500">
                Loading reviews...
              </p>

            </div>

          )}

          {!loading && error && (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
              {error}
            </div>

          )}

          {!loading &&
            !error &&
            reviews.length === 0 && (

              <div className="rounded-3xl bg-white px-6 py-14 text-center shadow-sm sm:py-16">

                <MessageSquareQuote
                  size={48}
                  className="mx-auto text-gray-300"
                />

                <h2 className="mt-5 text-2xl font-bold text-[#071A3D]">
                  Reviews Coming Soon
                </h2>

                <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
                  Published client testimonials will
                  appear here.
                </p>

              </div>

            )}

          {!loading &&
            !error &&
            reviews.length > 0 && (

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {reviews.map(
                  (review) => (

                    <article
                      key={review.id}
                      className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl sm:p-7"
                    >

                      {/* STARS */}

                      <div
                        className="flex gap-1"
                        aria-label={`${review.rating} out of 5 stars`}
                      >

                        {[1, 2, 3, 4, 5].map(
                          (star) => (

                            <Star
                              key={star}
                              size={19}
                              fill={
                                star <=
                                review.rating
                                  ? "currentColor"
                                  : "none"
                              }
                              className={
                                star <=
                                review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }
                            />

                          )
                        )}

                      </div>

                      {/* REVIEW */}

                      <p className="mt-5 flex-1 whitespace-pre-line break-words text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                        &ldquo;
                        {review.review}
                        &rdquo;
                      </p>

                      {/* CLIENT */}

                      <div className="mt-7 border-t border-gray-100 pt-5">

                        <p className="font-bold text-[#071A3D]">
                          {review.name}
                        </p>

                        {(review.role ||
                          review.universityOrganisation) && (

                          <p className="mt-1 text-sm leading-6 text-gray-500">

                            {review.role}

                            {review.role &&
                              review.universityOrganisation &&
                              " · "}

                            {
                              review.universityOrganisation
                            }

                          </p>

                        )}

                        {(review.month ||
                          review.year > 0) && (

                          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-400">

                            {review.month}

                            {review.month &&
                              review.year >
                                0 &&
                              " "}

                            {review.year >
                              0 &&
                              review.year}

                          </p>

                        )}

                      </div>

                    </article>

                  )
                )}

              </div>

            )}

        </div>

      </section>

    </main>
  );
}