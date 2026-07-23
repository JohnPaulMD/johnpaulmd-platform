"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Star,
} from "lucide-react";

import { db } from "@/lib/firebase";

interface ClientReview {
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

  status: string;
}

export default function ClientReviews() {
  const [reviews, setReviews] =
    useState<ClientReview[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const carouselRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const autoPlayRef =
    useRef<
      ReturnType<typeof setInterval> | null
    >(null);

  /* ================================= */
  /* LOAD REVIEWS */
  /* ================================= */

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);

        const reviewsQuery = query(
          collection(
            db,
            "reviews"
          ),

          where(
            "status",
            "==",
            "Published"
          ),

          where(
            "featured",
            "==",
            true
          )
        );

        const snapshot =
          await getDocs(
            reviewsQuery
          );

        const reviewItems:
          ClientReview[] =
          snapshot.docs.map(
            (document) => {
              const data =
                document.data();

              return {
                id:
                  document.id,

                name:
                  data.name ||
                  "Anonymous",

                role:
                  data.role || "",

                universityOrganisation:
                  data.universityOrganisation ||
                  "",

                review:
                  data.review || "",

                rating:
                  Math.min(
                    5,
                    Math.max(
                      0,
                      Number(
                        data.rating ||
                          0
                      )
                    )
                  ),

                image:
                  data.image || "",

                month:
                  data.month || "",

                year:
                  Number(
                    data.year || 0
                  ),

                featured:
                  Boolean(
                    data.featured
                  ),

                status:
                  data.status || "",
              };
            }
          );

        setReviews(
          reviewItems
        );
      } catch (error) {
        console.error(
          "Failed to load client reviews:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  /* ================================= */
  /* SCROLL TO REVIEW */
  /* ================================= */

  function scrollToReview(
    index: number
  ) {
    const carousel =
      carouselRef.current;

    if (
      !carousel ||
      reviews.length === 0
    ) {
      return;
    }

    const cards =
      carousel.querySelectorAll(
        "[data-review-card]"
      );

    const card =
      cards[
        index
      ] as HTMLElement | undefined;

    if (!card) {
      return;
    }

    carousel.scrollTo({
      left:
        card.offsetLeft -
        carousel.offsetLeft,

      behavior: "smooth",
    });

    setActiveIndex(index);
  }

  /* ================================= */
  /* NEXT REVIEW */
  /* ================================= */

  function nextReview() {
    if (
      reviews.length <= 1
    ) {
      return;
    }

    const nextIndex =
      activeIndex >=
      reviews.length - 1
        ? 0
        : activeIndex + 1;

    scrollToReview(
      nextIndex
    );
  }

  /* ================================= */
  /* PREVIOUS REVIEW */
  /* ================================= */

  function previousReview() {
    if (
      reviews.length <= 1
    ) {
      return;
    }

    const previousIndex =
      activeIndex <= 0
        ? reviews.length - 1
        : activeIndex - 1;

    scrollToReview(
      previousIndex
    );
  }

  /* ================================= */
  /* AUTOMATIC CAROUSEL */
  /* ================================= */

  useEffect(() => {
    if (
      reviews.length <= 1
    ) {
      return;
    }

    autoPlayRef.current =
      setInterval(() => {
        setActiveIndex(
          (currentIndex) => {
            const nextIndex =
              currentIndex >=
              reviews.length - 1
                ? 0
                : currentIndex + 1;

            const carousel =
              carouselRef.current;

            if (carousel) {
              const cards =
                carousel.querySelectorAll(
                  "[data-review-card]"
                );

              const card =
                cards[
                  nextIndex
                ] as
                  | HTMLElement
                  | undefined;

              if (card) {
                carousel.scrollTo({
                  left:
                    card.offsetLeft -
                    carousel.offsetLeft,

                  behavior:
                    "smooth",
                });
              }
            }

            return nextIndex;
          }
        );
      }, 5000);

    return () => {
      if (
        autoPlayRef.current
      ) {
        clearInterval(
          autoPlayRef.current
        );
      }
    };
  }, [reviews.length]);

  /* ================================= */
  /* DETECT MANUAL SWIPE / SCROLL */
  /* ================================= */

  function handleScroll() {
    const carousel =
      carouselRef.current;

    if (
      !carousel ||
      reviews.length === 0
    ) {
      return;
    }

    const cards =
      carousel.querySelectorAll(
        "[data-review-card]"
      );

    let closestIndex = 0;

    let closestDistance =
      Number.POSITIVE_INFINITY;

    cards.forEach(
      (element, index) => {
        const card =
          element as HTMLElement;

        const distance =
          Math.abs(
            card.offsetLeft -
              carousel.offsetLeft -
              carousel.scrollLeft
          );

        if (
          distance <
          closestDistance
        ) {
          closestDistance =
            distance;

          closestIndex =
            index;
        }
      }
    );

    setActiveIndex(
      closestIndex
    );
  }

  /* ================================= */
  /* LOADING */
  /* ================================= */

  if (loading) {
    return (
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#071A3D]/50 sm:text-sm sm:tracking-[0.2em]">
              Testimonials
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">
              Client Reviews
            </h2>

          </div>

          <div className="mt-10 flex justify-center sm:mt-12">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#071A3D]" />

          </div>

        </div>

      </section>
    );
  }

  /* ================================= */
  /* NO REVIEWS */
  /* ================================= */

  if (
    reviews.length === 0
  ) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl">

        {/* ================================= */}
        {/* SECTION HEADER */}
        {/* ================================= */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#071A3D]/50 sm:text-sm sm:tracking-[0.2em]">
            Testimonials
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">
            What Clients Say
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            Feedback from students,
            researchers and professionals
            who have worked with Manus Dei
            Solutions.
          </p>

        </div>

        {/* ================================= */}
        {/* CAROUSEL NAVIGATION */}
        {/* ================================= */}

        {reviews.length > 1 && (

          <div className="mt-8 flex items-center justify-center gap-3 md:justify-end">

            {/* PREVIOUS */}

            <button
              type="button"
              onClick={
                previousReview
              }
              aria-label="Previous review"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#071A3D] shadow-sm transition hover:border-[#071A3D] hover:bg-[#071A3D] hover:text-white"
            >

              <ChevronLeft
                size={20}
              />

            </button>

            {/* NEXT */}

            <button
              type="button"
              onClick={
                nextReview
              }
              aria-label="Next review"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071A3D] text-white shadow-sm transition hover:bg-[#0B2858]"
            >

              <ChevronRight
                size={20}
              />

            </button>

          </div>

        )}

        {/* ================================= */}
        {/* SWIPEABLE REVIEWS */}
        {/* ================================= */}

        <div
          ref={carouselRef}
          onScroll={
            handleScroll
          }
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5 sm:gap-6 md:mt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >

          {reviews.map(
            (item) => (

              <article
                key={item.id}
                data-review-card
                className="
                  group
                  flex
                  h-auto
                  min-w-[88%]
                  snap-start
                  flex-col
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  sm:min-w-[70%]
                  sm:rounded-3xl
                  sm:p-6
                  md:min-w-[calc(50%-12px)]
                  lg:min-w-[calc(33.333%-16px)]
                  lg:p-7
                "
              >

                {/* ================================= */}
                {/* QUOTE ICON */}
                {/* ================================= */}

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#071A3D]/5 sm:h-12 sm:w-12">

                  <MessageSquareQuote
                    size={22}
                    className="text-[#071A3D] sm:h-6 sm:w-6"
                  />

                </div>

                {/* ================================= */}
                {/* STAR RATING */}
                {/* ================================= */}

                <div className="mt-5 flex items-center gap-1 sm:mt-6">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                      <Star
                        key={star}
                        size={18}
                        fill={
                          star <=
                          item.rating
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          star <=
                          item.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />

                    )
                  )}

                  {/* NUMERIC RATING */}

                  {item.rating >
                    0 && (

                    <span className="ml-2 text-xs font-semibold text-gray-400">
                      {item.rating}/5
                    </span>

                  )}

                </div>

                {/* ================================= */}
                {/* REVIEW TEXT */}
                {/* ================================= */}

                <p className="mt-5 flex-1 text-sm leading-7 text-gray-600 sm:text-base">
                  “{item.review}”
                </p>

                {/* ================================= */}
                {/* CLIENT INFORMATION */}
                {/* ================================= */}

                <div className="mt-7 border-t border-gray-100 pt-5 sm:pt-6">

                  <div className="flex items-center gap-4">

                    {/* IMAGE / INITIAL */}

                    {item.image ? (

                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        unoptimized
                        className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
                      />

                    ) : (

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#071A3D] text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">

                        {item.name
                          .charAt(0)
                          .toUpperCase()}

                      </div>

                    )}

                    {/* CLIENT DETAILS */}

                    <div className="min-w-0">

                      <h3 className="font-bold text-[#071A3D]">
                        {item.name}
                      </h3>

                      {(item.role ||
                        item.universityOrganisation) && (

                        <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">

                          {item.role}

                          {item.role &&
                          item.universityOrganisation
                            ? " • "
                            : ""}

                          {
                            item.universityOrganisation
                          }

                        </p>

                      )}

                    </div>

                  </div>

                  {/* ================================= */}
                  {/* REVIEW DATE */}
                  {/* ================================= */}

                  {(item.month ||
                    item.year) && (

                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400">

                      {item.month}{" "}

                      {item.year ||
                        ""}

                    </p>

                  )}

                </div>

              </article>

            )
          )}

        </div>

        {/* ================================= */}
        {/* POSITION DOTS */}
        {/* ================================= */}

        {reviews.length > 1 && (

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">

            {reviews.map(
              (review, index) => (

                <button
                  key={
                    review.id
                  }
                  type="button"
                  onClick={() =>
                    scrollToReview(
                      index
                    )
                  }
                  aria-label={`Go to review ${
                    index + 1
                  }`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex ===
                    index
                      ? "w-7 bg-[#071A3D]"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />

              )
            )}

          </div>

        )}

        {/* ================================= */}
        {/* MOBILE SWIPE HINT */}
        {/* ================================= */}

        {reviews.length > 1 && (

          <p className="mt-4 text-center text-xs font-medium text-gray-400 md:hidden">
            Swipe to see more reviews
          </p>

        )}

      </div>

    </section>
  );
}