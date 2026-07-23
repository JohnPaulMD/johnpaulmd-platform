"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";

import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import {
  ArrowLeft,
  ExternalLink,
  FileText,
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
  abstract: string;

  authors: string[];
  keywords: string[];

  year: string;

  image: string;

  publicationUrl: string;
  doiUrl: string;

  publishStatus:
    | "Draft"
    | "Published";
}

interface ResearchDetailClientProps {
  slug: string;
}

export default function ResearchDetailClient({
  slug,
}: ResearchDetailClientProps) {
  const [
    research,
    setResearch,
  ] =
    useState<ResearchItem | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [
    notFound,
    setNotFound,
  ] =
    useState(false);

  /* ================================= */
  /* LOAD RESEARCH */
  /* ================================= */

  useEffect(() => {
    async function loadResearch() {
      try {
        setLoading(true);

        const researchQuery =
          query(
            collection(
              db,
              "research"
            ),

            where(
              "slug",
              "==",
              slug
            ),

            where(
              "publishStatus",
              "==",
              "Published"
            ),

            limit(1)
          );

        const snapshot =
          await getDocs(
            researchQuery
          );

        if (snapshot.empty) {
          setNotFound(true);

          return;
        }

        const document =
          snapshot.docs[0];

        const data =
          document.data();

        setResearch({
          id:
            document.id,

          title:
            data.title || "",

          slug:
            data.slug || "",

          category:
            data.category || "",

          status:
            data.status ||
            "Ongoing",

          shortDescription:
            data.shortDescription ||
            "",

          abstract:
            data.abstract || "",

          authors:
            Array.isArray(
              data.authors
            )
              ? data.authors
              : [],

          keywords:
            Array.isArray(
              data.keywords
            )
              ? data.keywords
              : [],

          year:
            data.year || "",

          image:
            data.image || "",

          publicationUrl:
            data.publicationUrl ||
            "",

          doiUrl:
            data.doiUrl || "",

          publishStatus:
            data.publishStatus ||
            "Draft",
        });
      } catch (error) {
        console.error(
          "Failed to load research:",
          error
        );

        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadResearch();
  }, [slug]);

  /* ================================= */
  /* LOADING */
  /* ================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071A3D]">
        <div className="flex min-h-screen items-center justify-center px-4 pt-28 sm:px-6">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />

            <p className="mt-4 text-sm text-white/60 sm:text-base">
              Loading research...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* ================================= */
  /* NOT FOUND */
  /* ================================= */

  if (
    notFound ||
    !research
  ) {
    return (
      <main className="min-h-screen bg-[#071A3D] text-white">
        <div className="flex min-h-screen items-center justify-center px-4 pt-28 sm:px-6">
          <div className="mx-auto max-w-xl text-center">

            <h1 className="text-2xl font-bold sm:text-3xl">
              Research not found
            </h1>

            <p className="mt-3 text-sm leading-7 text-white/60 sm:text-base">
              This research project is
              unavailable or has not
              been published.
            </p>

            <Link
              href="/research"
              className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#071A3D] transition hover:bg-white/90 sm:px-6 sm:text-base"
            >
              Return to Research
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071A3D] text-white">

      {/* HERO */}

      <section className="border-b border-white/10 px-4 pb-12 pt-32 sm:px-6 sm:pb-14 sm:pt-36 lg:pb-16">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/research"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white sm:mb-8"
          >
            <ArrowLeft
              size={17}
              className="shrink-0"
            />

            Research Library
          </Link>

          <div className="flex flex-wrap gap-2 sm:gap-3">

            {research.category && (
              <span className="max-w-full break-words rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 sm:px-4 sm:py-2 sm:text-sm">
                {research.category}
              </span>
            )}

            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 sm:px-4 sm:py-2 sm:text-sm">
              {research.status}
            </span>

            {research.year && (
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 sm:px-4 sm:py-2 sm:text-sm">
                {research.year}
              </span>
            )}

          </div>

          <h1 className="mt-6 max-w-4xl break-words text-3xl font-bold leading-tight sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl">
            {research.title}
          </h1>

          {research.shortDescription && (
            <p className="mt-5 max-w-3xl break-words text-sm leading-7 text-white/65 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              {research.shortDescription}
            </p>
          )}

          {research.authors.length >
            0 && (
            <div className="mt-7 sm:mt-8">

              <p className="text-xs font-semibold uppercase tracking-wider text-white/40 sm:text-sm">
                Authors
              </p>

              <p className="mt-2 break-words text-sm leading-7 text-white/80 sm:text-base lg:text-lg">
                {research.authors.join(
                  ", "
                )}
              </p>

            </div>
          )}

        </div>
      </section>

      {/* BODY */}

      <section className="px-4 py-12 sm:px-6 sm:py-14 lg:py-16">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">

            <div className="min-w-0">

              {research.image && (
                <div className="mb-8 overflow-hidden rounded-2xl bg-white/5 sm:mb-10 sm:rounded-3xl">

                  <Image
                    src={
                      research.image
                    }
                    alt={
                      research.title
                    }
                    width={1400}
                    height={850}
                    unoptimized
                    className="max-h-[520px] w-full object-cover"
                  />

                </div>
              )}

              <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                Abstract / Overview
              </h2>

              <div className="mt-5 whitespace-pre-line break-words text-sm leading-7 text-white/70 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                {research.abstract ||
                  research.shortDescription ||
                  "No abstract or overview is currently available."}
              </div>

            </div>

            <aside className="min-w-0 space-y-8 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">

              {research.keywords.length >
                0 && (
                <div>

                  <h3 className="text-lg font-bold">
                    Keywords
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {research.keywords.map(
                      (
                        keyword,
                        index
                      ) => (
                        <span
                          key={`${keyword}-${index}`}
                          className="max-w-full break-words rounded-full bg-white/10 px-3 py-2 text-xs leading-5 text-white/70 sm:text-sm"
                        >
                          {keyword}
                        </span>
                      )
                    )}

                  </div>
                </div>
              )}

              {(research.publicationUrl ||
                research.doiUrl) && (
                <div>

                  <h3 className="text-lg font-bold">
                    Publication
                  </h3>

                  <div className="mt-4 space-y-3">

                    {research.publicationUrl && (
                      <a
                        href={
                          research.publicationUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#071A3D] transition hover:bg-white/90 sm:text-base"
                      >
                        <span className="flex min-w-0 items-center gap-2">

                          <FileText
                            size={17}
                            className="shrink-0"
                          />

                          <span className="break-words">
                            View Publication
                          </span>

                        </span>

                        <ExternalLink
                          size={15}
                          className="shrink-0"
                        />
                      </a>
                    )}

                    {research.doiUrl && (
                      <a
                        href={
                          research.doiUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base"
                      >
                        <span>
                          DOI
                        </span>

                        <ExternalLink
                          size={15}
                          className="shrink-0"
                        />
                      </a>
                    )}

                  </div>
                </div>
              )}

            </aside>

          </div>
        </div>
      </section>
    </main>
  );
}