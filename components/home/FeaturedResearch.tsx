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

interface FeaturedResearchItem {
  id: string;

  title: string;
  slug: string;

  category: string;

  status:
    | "Ongoing"
    | "Completed";

  shortDescription: string;

  authors: string[];

  year: string;

  image: string;

  featured: boolean;

  publishStatus:
    | "Draft"
    | "Published";
}

export default function FeaturedResearch() {
  const router = useRouter();

  const [
    researchItems,
    setResearchItems,
  ] = useState<
    FeaturedResearchItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadFeaturedResearch() {
      try {
        setLoading(true);

        const researchQuery = query(
          collection(
            db,
            "research"
          ),

          where(
            "publishStatus",
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
            researchQuery
          );

        const items:
          FeaturedResearchItem[] =
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
                  data.slug || "",

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

                year:
                  data.year ||
                  "",

                image:
                  data.image ||
                  "",

                featured:
                  data.featured ||
                  false,

                publishStatus:
                  data.publishStatus ||
                  "Draft",
              };
            }
          );

        setResearchItems(
          items.slice(0, 3)
        );
      } catch (error) {
        console.error(
          "Failed to load featured research:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedResearch();
  }, []);

  /* ================================= */
  /* HIDE EMPTY SECTION */
  /* ================================= */

  if (
    !loading &&
    researchItems.length === 0
  ) {
    return null;
  }

  return (
    <section className="bg-[#F8F7F3] px-4 py-14 sm:px-6 sm:py-16 lg:py-24">

      <div className="mx-auto max-w-7xl">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="mb-10 flex flex-col items-center gap-5 text-center md:mb-12 md:flex-row md:items-end md:justify-between md:text-left">

          <div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 sm:text-sm sm:tracking-[0.2em]">
              Research
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#071A3D] sm:text-4xl md:text-5xl">
              Featured Research
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base md:mx-0">
              Selected research projects
              across health sciences,
              biomedical research and
              data-driven investigation.
            </p>

          </div>

          {/* VIEW ALL RESEARCH */}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/research"
              )
            }
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#071A3D]/15 px-5 py-2.5 text-sm font-semibold text-[#071A3D] transition hover:border-[#071A3D] hover:bg-[#071A3D] hover:text-white sm:text-base md:border-0 md:px-0 md:py-0 md:hover:bg-transparent md:hover:text-blue-700"
          >
            View Research Library

            <ArrowRight
              size={18}
            />

          </button>

        </div>

        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading && (

          <div className="py-12 text-center sm:py-16">

            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-[#071A3D] sm:h-10 sm:w-10" />

            <p className="mt-4 text-sm text-gray-500 sm:text-base">
              Loading featured research...
            </p>

          </div>

        )}

        {/* ================================= */}
        {/* RESEARCH CARDS */}
        {/* ================================= */}

        {!loading &&
          researchItems.length > 0 && (

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">

            {researchItems.map(
              (research) => (

                <article
                  key={
                    research.id
                  }
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl"
                >

                  {/* ================================= */}
                  {/* IMAGE */}
                  {/* ================================= */}

                  {research.image ? (

                    <div className="h-48 overflow-hidden bg-gray-100 sm:h-52">

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

                    <div className="flex h-48 items-center justify-center bg-[#071A3D] sm:h-52">

                      <BookOpen
                        size={42}
                        className="text-white/50 sm:h-[45px] sm:w-[45px]"
                      />

                    </div>

                  )}

                  {/* ================================= */}
                  {/* CONTENT */}
                  {/* ================================= */}

                  <div className="flex flex-1 flex-col p-5 sm:p-7">

                    {/* CATEGORY + STATUS */}

                    <div className="mb-4 flex flex-wrap items-center gap-2">

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {
                          research.category
                        }
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          research.status ===
                          "Completed"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {
                          research.status
                        }
                      </span>

                    </div>

                    {/* TITLE */}

                    <h3 className="text-lg font-bold leading-snug text-[#071A3D] sm:text-xl">
                      {
                        research.title
                      }
                    </h3>

                    {/* YEAR */}

                    {research.year && (

                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">

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

                    {/* DESCRIPTION */}

                    {research.shortDescription && (

                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                        {
                          research.shortDescription
                        }
                      </p>

                    )}

                    {/* AUTHORS */}

                    {research.authors.length >
                      0 && (

                      <p className="mt-4 line-clamp-2 break-words text-xs leading-5 text-gray-500 sm:text-sm">

                        <span className="font-semibold">
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
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#071A3D] transition group-hover:gap-3 sm:text-base"
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

        )}

      </div>

    </section>
  );
}