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
  Lightbulb,
} from "lucide-react";

import { db } from "@/lib/firebase";

interface InnovationItem {
  id: string;

  title: string;
  slug: string;

  category: string;

  status:
    | "Concept"
    | "In Development"
    | "Completed";

  shortDescription: string;

  technologies: string[];

  image: string;

  publishStatus:
    | "Draft"
    | "Published";
}

export default function InnovationGrid() {
  const router = useRouter();

  const [
    innovations,
    setInnovations,
  ] = useState<InnovationItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ================================= */
  /* LOAD PUBLISHED INNOVATIONS */
  /* ================================= */

  useEffect(() => {
    async function loadInnovations() {
      try {
        setLoading(true);
        setError("");

        const innovationQuery =
          query(
            collection(
              db,
              "innovations"
            ),

            where(
              "publishStatus",
              "==",
              "Published"
            )
          );

        const snapshot =
          await getDocs(
            innovationQuery
          );

        const items:
          InnovationItem[] =
          snapshot.docs.map(
            (document) => {
              const data =
                document.data();

              return {
                id:
                  document.id,

                title:
                  data.title ||
                  "Untitled Innovation",

                slug:
                  data.slug || "",

                category:
                  data.category ||
                  "Innovation",

                status:
                  data.status ||
                  "Concept",

                shortDescription:
                  data.shortDescription ||
                  "",

                technologies:
                  data.technologies ||
                  [],

                image:
                  data.image || "",

                publishStatus:
                  data.publishStatus ||
                  "Draft",
              };
            }
          );

        setInnovations(
          items
        );
      } catch (error) {
        console.error(
          "Failed to load innovations:",
          error
        );

        setError(
          "Unable to load innovation projects."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInnovations();
  }, []);

  /* ================================= */
  /* LOADING */
  /* ================================= */

  if (loading) {
    return (
      <div className="py-12 text-center sm:py-16 lg:py-20">

        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-white/20 border-t-white sm:h-10 sm:w-10" />

        <p className="mt-4 text-sm text-white/60 sm:text-base">
          Loading innovations...
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
  /* EMPTY */
  /* ================================= */

  if (
    innovations.length === 0
  ) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-12 text-center sm:rounded-3xl sm:px-6 sm:py-16">

        <Lightbulb
          size={40}
          className="mx-auto text-white/40"
        />

        <h3 className="mt-5 text-lg font-bold text-white sm:text-xl">
          Innovation projects coming soon
        </h3>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
          Published Innovation Lab
          projects will appear here.
        </p>

      </div>
    );
  }

  /* ================================= */
  /* INNOVATION GRID */
  /* ================================= */

  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">

      {innovations.map(
        (innovation) => (

          <article
            key={
              innovation.id
            }
            className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:bg-white/10 sm:rounded-3xl"
          >

            {/* ================================= */}
            {/* IMAGE */}
            {/* ================================= */}

            {innovation.image ? (

              <div className="h-44 shrink-0 overflow-hidden sm:h-48 lg:h-52">

                <Image
                  src={innovation.image}
                  alt={innovation.title}
                  width={800}
                  height={500}
                  unoptimized
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

            ) : (

              <div className="flex h-44 shrink-0 items-center justify-center bg-white/5 sm:h-48 lg:h-52">

                <Lightbulb
                  size={44}
                  className="text-white/30 sm:h-12 sm:w-12"
                />

              </div>

            )}

            {/* ================================= */}
            {/* CONTENT */}
            {/* ================================= */}

            <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">

              {/* ================================= */}
              {/* CATEGORY + STATUS */}
              {/* ================================= */}

              <div className="mb-4 flex flex-wrap gap-2">

                <span className="max-w-full break-words rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">

                  {
                    innovation.category
                  }

                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    innovation.status ===
                    "Completed"
                      ? "bg-green-500/15 text-green-300"
                      : innovation.status ===
                        "In Development"
                      ? "bg-blue-500/15 text-blue-300"
                      : "bg-yellow-500/15 text-yellow-300"
                  }`}
                >

                  {
                    innovation.status
                  }

                </span>

              </div>

              {/* ================================= */}
              {/* TITLE */}
              {/* ================================= */}

              <h2 className="break-words text-lg font-bold leading-snug text-white sm:text-xl">

                {
                  innovation.title
                }

              </h2>

              {/* ================================= */}
              {/* DESCRIPTION */}
              {/* ================================= */}

              {innovation.shortDescription && (

                <p className="mt-4 line-clamp-3 break-words text-sm leading-6 text-white/65 sm:text-base sm:leading-7">

                  {
                    innovation.shortDescription
                  }

                </p>

              )}

              {/* ================================= */}
              {/* TECHNOLOGIES */}
              {/* ================================= */}

              {innovation.technologies.length >
                0 && (

                <div className="mt-5 flex flex-wrap gap-2">

                  {innovation.technologies
                    .slice(
                      0,
                      4
                    )
                    .map(
                      (
                        technology,
                        index
                      ) => (

                        <span
                          key={`${technology}-${index}`}
                          className="max-w-full break-words rounded-full border border-white/10 px-3 py-1 text-xs leading-5 text-white/60"
                        >

                          {
                            technology
                          }

                        </span>

                      )
                    )}

                  {/* MORE TECHNOLOGIES */}

                  {innovation
                    .technologies
                    .length >
                    4 && (

                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">

                      +
                      {innovation
                        .technologies
                        .length - 4}{" "}
                      more

                    </span>

                  )}

                </div>

              )}

              {/* ================================= */}
              {/* EXPLORE PROJECT */}
              {/* ================================= */}

              <div className="mt-auto pt-6">

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/innovation/${innovation.slug}`
                    )
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:gap-3 sm:text-base"
                >

                  Explore Project

                  <ArrowRight
                    size={17}
                    className="shrink-0"
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