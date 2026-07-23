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
  Globe,
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

  overview: string;

  problem: string;

  solution: string;

  technologies: string[];

  image: string;

  liveUrl: string;

  githubUrl: string;

  websiteUrl: string;

  publishStatus:
    | "Draft"
    | "Published";
}

interface InnovationDetailClientProps {
  slug: string;
}

export default function InnovationDetailClient({
  slug,
}: InnovationDetailClientProps) {
  const [
    innovation,
    setInnovation,
  ] =
    useState<InnovationItem | null>(
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
  /* LOAD INNOVATION */
  /* ================================= */

  useEffect(() => {
    async function loadInnovation() {
      try {
        setLoading(true);
        setNotFound(false);

        const innovationQuery =
          query(
            collection(
              db,
              "innovations"
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
            innovationQuery
          );

        if (snapshot.empty) {
          setNotFound(true);

          return;
        }

        const document =
          snapshot.docs[0];

        const data =
          document.data();

        setInnovation({
          id:
            document.id,

          title:
            data.title || "",

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

          overview:
            data.overview || "",

          problem:
            data.problem || "",

          solution:
            data.solution || "",

          technologies:
            Array.isArray(
              data.technologies
            )
              ? data.technologies
              : [],

          image:
            data.image || "",

          liveUrl:
            data.liveUrl || "",

          githubUrl:
            data.githubUrl || "",

          websiteUrl:
            data.websiteUrl ||
            "",

          publishStatus:
            data.publishStatus ||
            "Draft",
        });
      } catch (error) {
        console.error(
          "Failed to load innovation:",
          error
        );

        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadInnovation();
  }, [slug]);

  /* ================================= */
  /* LOADING */
  /* ================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071A3D] text-white">
        <div className="flex min-h-screen items-center justify-center px-4 pt-28 sm:px-6">
          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />

            <p className="mt-4 text-sm text-white/60 sm:text-base">
              Loading project...
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
    !innovation
  ) {
    return (
      <main className="min-h-screen bg-[#071A3D] text-white">
        <div className="flex min-h-screen items-center justify-center px-4 pt-28 sm:px-6">
          <div className="mx-auto max-w-xl text-center">

            <Lightbulb
              size={42}
              className="mx-auto text-white/40"
            />

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              Innovation not found
            </h1>

            <p className="mt-3 text-sm leading-7 text-white/60 sm:text-base">
              This project is unavailable
              or has not been published.
            </p>

            <Link
              href="/innovation"
              className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#071A3D] transition hover:bg-white/90 sm:px-6 sm:text-base"
            >
              Return to Innovation Lab
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

        <div className="mx-auto max-w-6xl">

          <Link
            href="/innovation"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white sm:mb-8"
          >
            <ArrowLeft
              size={17}
              className="shrink-0"
            />

            Innovation Lab
          </Link>

          <div className="flex flex-wrap gap-2 sm:gap-3">

            {innovation.category && (
              <span className="max-w-full break-words rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 sm:px-4 sm:py-2 sm:text-sm">
                {innovation.category}
              </span>
            )}

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm ${
                innovation.status ===
                "Completed"
                  ? "bg-green-500/15 text-green-300"
                  : innovation.status ===
                    "In Development"
                  ? "bg-blue-500/15 text-blue-300"
                  : "bg-yellow-500/15 text-yellow-300"
              }`}
            >
              {innovation.status}
            </span>

          </div>

          <h1 className="mt-6 max-w-5xl break-words text-3xl font-bold leading-tight sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl">
            {innovation.title}
          </h1>

          {innovation.shortDescription && (
            <p className="mt-5 max-w-3xl break-words text-sm leading-7 text-white/65 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              {innovation.shortDescription}
            </p>
          )}

        </div>
      </section>

      {/* PROJECT BODY */}

      <section className="px-4 py-12 sm:px-6 sm:py-14 lg:py-16">

        <div className="mx-auto max-w-6xl">

          {innovation.image && (
            <div className="mb-10 overflow-hidden rounded-2xl bg-white/5 sm:mb-12 sm:rounded-3xl lg:mb-14">

              <Image
                src={
                  innovation.image
                }
                alt={
                  innovation.title
                }
                width={1600}
                height={900}
                unoptimized
                className="max-h-[600px] w-full object-cover"
              />

            </div>
          )}

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">

            <div className="min-w-0 space-y-10 sm:space-y-12 lg:space-y-14">

              {innovation.overview && (
                <div>
                  <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                    Project Overview
                  </h2>

                  <p className="mt-5 whitespace-pre-line break-words text-sm leading-7 text-white/70 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                    {innovation.overview}
                  </p>
                </div>
              )}

              {innovation.problem && (
                <div>
                  <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                    The Problem
                  </h2>

                  <p className="mt-5 whitespace-pre-line break-words text-sm leading-7 text-white/70 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                    {innovation.problem}
                  </p>
                </div>
              )}

              {innovation.solution && (
                <div>
                  <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                    The Solution
                  </h2>

                  <p className="mt-5 whitespace-pre-line break-words text-sm leading-7 text-white/70 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                    {innovation.solution}
                  </p>
                </div>
              )}

            </div>

            {/* SIDEBAR */}

            <aside className="min-w-0 space-y-8 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">

              {innovation.technologies.length >
                0 && (
                <div>

                  <h3 className="text-lg font-bold">
                    Technologies
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {innovation.technologies.map(
                      (
                        technology,
                        index
                      ) => (
                        <span
                          key={`${technology}-${index}`}
                          className="max-w-full break-words rounded-full bg-white/10 px-3 py-2 text-xs leading-5 text-white/70 sm:text-sm"
                        >
                          {technology}
                        </span>
                      )
                    )}

                  </div>
                </div>
              )}

              {(innovation.liveUrl ||
                innovation.githubUrl ||
                innovation.websiteUrl) && (
                <div>

                  <h3 className="text-lg font-bold">
                    Project Links
                  </h3>

                  <div className="mt-4 space-y-3">

                    {innovation.liveUrl && (
                      <a
                        href={
                          innovation.liveUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#071A3D] transition hover:bg-white/90 sm:text-base"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <ExternalLink
                            size={17}
                          />

                          <span className="break-words">
                            View Project
                          </span>
                        </span>

                        <ExternalLink
                          size={14}
                        />
                      </a>
                    )}

                    {innovation.githubUrl && (
                      <a
                        href={
                          innovation.githubUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base"
                      >
                        <span>
                          GitHub
                        </span>

                        <ExternalLink
                          size={14}
                        />
                      </a>
                    )}

                    {innovation.websiteUrl && (
                      <a
                        href={
                          innovation.websiteUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <Globe
                            size={17}
                          />

                          Website
                        </span>

                        <ExternalLink
                          size={14}
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