"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  ArrowRight,
  BookOpen,
  Calendar,
} from "lucide-react";

import { db } from "@/lib/firebase";

interface ResearchItem {
  id: string;

  title: string;
  slug: string;

  category: string;

  status:
    | "Ongoing"
    | "Completed";

  shortDescription: string;

  authors: string[];

  keywords: string[];

  year: string;

  image: string;

  publishStatus:
    | "Draft"
    | "Published";
}

export default function ResearchGrid() {
  const router = useRouter();

  const [
    researchItems,
    setResearchItems,
  ] = useState<ResearchItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ================================= */
  /* LOAD PUBLISHED RESEARCH */
  /* ================================= */

  useEffect(() => {
    async function loadResearch() {
      try {
        setLoading(true);
        setError("");

        const researchQuery =
          query(
            collection(
              db,
              "research"
            ),

            where(
              "publishStatus",
              "==",
              "Published"
            )
          );

        const snapshot =
          await getDocs(
            researchQuery
          );

        const items:
          ResearchItem[] =
          snapshot.docs.map(
            (document) => {
              const data =
                document.data();

              return {
                id:
                  document.id,

                title:
                  data.title ||
                  "Untitled Research",

                slug:
                  data.slug ||
                  "",

                category:
                  data.category ||
                  "Research",

                status:
                  data.status ||
                  "Ongoing",

                shortDescription:
                  data.shortDescription ||
                  "",

                authors:
                  data.authors ||
                  [],

                keywords:
                  data.keywords ||
                  [],

                year:
                  data.year ||
                  "",

                image:
                  data.image ||
                  "",

                publishStatus:
                  data.publishStatus ||
                  "Draft",
              };
            }
          );

        setResearchItems(
          items
        );
      } catch (error) {
        console.error(
          "Failed to load published research:",
          error
        );

        setError(
          "Unable to load research projects."
        );
      } finally {
        setLoading(false);
      }
    }

    loadResearch();
  }, []);

  /* ================================= */
  /* LOADING */
  /* ================================= */

  if (loading) {
    return (
      <div className="py-12 text-center sm:py-16 lg:py-20">

        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-white/20 border-t-white sm:h-10 sm:w-10" />

        <p className="mt-4 text-sm text-white/70 sm:text-base">
          Loading research...
        </p>

      </div>
    );
  }

  /* ================================= */
  /* ERROR */
  /* ================================= */

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-8 text-center text-sm text-red-200 sm:px-6 sm:py-10 sm:text-base">
        {error}
      </div>
    );
  }

  /* ================================= */
  /* EMPTY LIBRARY */
  /* ================================= */

  if (
    researchItems.length === 0
  ) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-12 text-center sm:rounded-3xl sm:px-6 sm:py-16">

        <BookOpen
          size={38}
          className="mx-auto text-white/50"
        />

        <h3 className="mt-5 text-lg font-bold text-white sm:text-xl">
          Research library coming soon
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/60 sm:text-base">
          Published research projects
          will appear here.
        </p>

      </div>
    );
  }

  /* ================================= */
  /* RESEARCH GRID */
  /* ================================= */

  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">

      {researchItems.map(
        (research) => (

          <article
            key={
              research.id
            }
            className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:bg-white/10 sm:rounded-3xl"
          >

            {/* ================================= */}
            {/* IMAGE */}
            {/* ================================= */}

            {research.image ? (

              <div className="h-44 shrink-0 overflow-hidden bg-white/5 sm:h-48 lg:h-52">

                <Image
                  src={research.image}
                  alt={research.title}
                  width={800}
                  height={500}
                  unoptimized
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

            ) : (

              <div className="flex h-44 shrink-0 items-center justify-center bg-white/5 sm:h-48 lg:h-52">

                <BookOpen
                  size={42}
                  className="text-white/30"
                />

              </div>

            )}

            {/* ================================= */}
            {/* CONTENT */}
            {/* ================================= */}

            <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">

              {/* CATEGORY + STATUS */}

              <div className="mb-4 flex flex-wrap items-center gap-2">

                <span className="max-w-full break-words rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">

                  {
                    research.category
                  }

                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    research.status ===
                    "Completed"
                      ? "bg-green-500/15 text-green-300"
                      : "bg-yellow-500/15 text-yellow-300"
                  }`}
                >

                  {
                    research.status
                  }

                </span>

              </div>

              {/* ================================= */}
              {/* TITLE */}
              {/* ================================= */}

              <h2 className="break-words text-lg font-bold leading-snug text-white sm:text-xl">

                {
                  research.title
                }

              </h2>

              {/* ================================= */}
              {/* YEAR */}
              {/* ================================= */}

              {research.year && (

                <div className="mt-3 flex items-center gap-2 text-xs text-white/50 sm:text-sm">

                  <Calendar
                    size={15}
                    className="shrink-0"
                  />

                  <span>
                    {
                      research.year
                    }
                  </span>

                </div>

              )}

              {/* ================================= */}
              {/* DESCRIPTION */}
              {/* ================================= */}

              {research.shortDescription && (

                <p className="mt-4 line-clamp-3 break-words text-sm leading-6 text-white/65 sm:text-base sm:leading-7">

                  {
                    research.shortDescription
                  }

                </p>

              )}

              {/* ================================= */}
              {/* AUTHORS */}
              {/* ================================= */}

              {research.authors.length >
                0 && (

                <p className="mt-4 line-clamp-2 break-words text-xs leading-5 text-white/50 sm:text-sm sm:leading-6">

                  <span className="font-semibold text-white/70">
                    Authors:
                  </span>{" "}

                  {research.authors.join(
                    ", "
                  )}

                </p>

              )}

              {/* ================================= */}
              {/* VIEW RESEARCH */}
              {/* ================================= */}

              <div className="mt-auto pt-6">

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/research/${research.slug}`
                    )
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:gap-3 sm:text-base"
                >

                  View Research

                  <ArrowRight
                    size={17}
                  />

                </button>

              </div>

            </div>

          </article>

        )
      )}

    </div>
  );
}