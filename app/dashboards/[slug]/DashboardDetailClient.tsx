"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";

import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Code2,
  ExternalLink,
  Globe,
  Lightbulb,
  Target,
} from "lucide-react";

import getDashboardBySlug, {
  PublicDashboard,
} from "@/services/dashboards/getDashboardBySlug";

interface DashboardDetailClientProps {
  slug: string;
}

export default function DashboardDetailClient({
  slug,
}: DashboardDetailClientProps) {
  const [
    dashboard,
    setDashboard,
  ] =
    useState<PublicDashboard | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ================================= */
  /* LOAD DASHBOARD */
  /* ================================= */

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getDashboardBySlug(
            slug
          );

        if (!data) {
          setError(
            "This dashboard could not be found."
          );

          return;
        }

        setDashboard(data);
      } catch (err) {
        console.error(
          "Failed to load dashboard:",
          err
        );

        setError(
          "Unable to load this dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [slug]);

  /* ================================= */
  /* LOADING */
  /* ================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F7F3] px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-12 lg:p-16">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#071A3D]" />

            <p className="mt-4 text-sm text-gray-500 sm:text-base">
              Loading dashboard...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* ================================= */
  /* ERROR / NOT FOUND */
  /* ================================= */

  if (
    error ||
    !dashboard
  ) {
    return (
      <main className="min-h-screen bg-[#F8F7F3] px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-12">
            <BarChart3
              size={50}
              className="mx-auto text-gray-300 sm:h-[60px] sm:w-[60px]"
            />

            <h1 className="mt-6 text-2xl font-bold text-[#071A3D] sm:text-3xl">
              Dashboard unavailable
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              {error ||
                "This dashboard could not be found."}
            </p>

            <Link
              href="/dashboards"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#071A3D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B2858] sm:mt-8 sm:px-6 sm:text-base"
            >
              <ArrowLeft
                size={18}
              />

              Back to Dashboards
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F3]">

      {/* HERO */}

      <section className="bg-[#071A3D] px-4 pb-12 pt-32 text-white sm:px-6 sm:pb-14 sm:pt-36 lg:pb-16">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/dashboards"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white sm:mb-10"
          >
            <ArrowLeft
              size={17}
              className="shrink-0"
            />

            Back to Dashboards
          </Link>

          <div className="max-w-4xl">

            <div className="mb-5 flex flex-wrap gap-2 sm:gap-3">

              {dashboard.category && (
                <span className="max-w-full break-words rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm">
                  {dashboard.category}
                </span>
              )}

              {dashboard.software && (
                <span className="max-w-full break-words rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm">
                  {dashboard.software}
                </span>
              )}

            </div>

            <h1 className="break-words text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {dashboard.title}
            </h1>

            {dashboard.description && (
              <p className="mt-5 max-w-3xl break-words text-sm leading-7 text-slate-300 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
                {dashboard.description}
              </p>
            )}

            {(dashboard.liveUrl ||
              dashboard.githubUrl ||
              dashboard.websiteUrl) && (
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">

                {dashboard.liveUrl && (
                  <a
                    href={dashboard.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#071A3D] transition hover:bg-white/90 sm:w-auto sm:px-6 sm:text-base"
                  >
                    <ExternalLink
                      size={18}
                    />

                    View Live Dashboard
                  </a>
                )}

                {dashboard.githubUrl && (
                  <a
                    href={dashboard.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-6 sm:text-base"
                  >
                    GitHub

                    <ExternalLink
                      size={15}
                    />
                  </a>
                )}

                {dashboard.websiteUrl && (
                  <a
                    href={dashboard.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-6 sm:text-base"
                  >
                    <Globe
                      size={18}
                    />

                    Website
                  </a>
                )}

              </div>
            )}

          </div>
        </div>
      </section>

      {/* COVER IMAGE */}

      {dashboard.image && (
        <section className="px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-b-2xl bg-white shadow-lg sm:rounded-b-3xl">
              <Image
                src={dashboard.image}
                alt={dashboard.title}
                width={1600}
                height={900}
                unoptimized
                className="max-h-[650px] w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* MAIN CONTENT */}

      <section className="px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">

          <div className="min-w-0 space-y-6 sm:space-y-8 lg:space-y-10">

            {/* PROJECT OVERVIEW */}

            {dashboard.overview && (
              <div className="rounded-2xl bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 md:p-8 lg:p-10">

                <h2 className="text-2xl font-bold text-[#071A3D] sm:text-3xl">
                  Project Overview
                </h2>

                <p className="mt-5 whitespace-pre-line break-words text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base sm:leading-8">
                  {dashboard.overview}
                </p>

              </div>
            )}

            {/* INTERACTIVE DASHBOARD */}

            {dashboard.embedUrl && (
              <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-8">

                <div className="mb-5 sm:mb-6">
                  <h2 className="text-2xl font-bold text-[#071A3D] sm:text-3xl">
                    Interactive Dashboard
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                    Explore the interactive visualization below.
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border bg-gray-50 sm:rounded-2xl">
                  <iframe
                    src={dashboard.embedUrl}
                    title={`${dashboard.title} interactive dashboard`}
                    className="h-[420px] w-full sm:h-[520px] md:h-[600px] lg:h-[650px]"
                    allowFullScreen
                  />
                </div>

                {dashboard.liveUrl && (
                  <a
                    href={dashboard.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#071A3D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0B2858] sm:hidden"
                  >
                    Open Full Dashboard

                    <ExternalLink
                      size={16}
                    />
                  </a>
                )}

              </div>
            )}

            {/* OBJECTIVES */}

            {dashboard.objectives &&
              dashboard.objectives.length >
                0 && (
                <div className="rounded-2xl bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 md:p-8 lg:p-10">

                  <div className="mb-5 flex items-center gap-3 sm:mb-6">
                    <Target
                      size={24}
                      className="shrink-0 text-[#071A3D]"
                    />

                    <h2 className="text-2xl font-bold text-[#071A3D] sm:text-3xl">
                      Objectives
                    </h2>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {dashboard.objectives.map(
                      (
                        objective,
                        index
                      ) => (
                        <div
                          key={index}
                          className="flex gap-3 rounded-xl bg-[#F8F7F3] p-4 sm:rounded-2xl sm:p-5"
                        >
                          <CheckCircle2
                            size={19}
                            className="mt-0.5 shrink-0 text-[#071A3D]"
                          />

                          <p className="break-words text-sm leading-7 text-gray-700 sm:text-base">
                            {objective}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                </div>
              )}

            {/* KEY INSIGHTS */}

            {dashboard.insights &&
              dashboard.insights.length >
                0 && (
                <div className="rounded-2xl bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 md:p-8 lg:p-10">

                  <div className="mb-5 flex items-center gap-3 sm:mb-6">
                    <Lightbulb
                      size={24}
                      className="shrink-0 text-[#071A3D]"
                    />

                    <h2 className="text-2xl font-bold text-[#071A3D] sm:text-3xl">
                      Key Insights
                    </h2>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {dashboard.insights.map(
                      (
                        insight,
                        index
                      ) => (
                        <div
                          key={index}
                          className="rounded-xl border border-gray-100 p-4 sm:rounded-2xl sm:p-5"
                        >
                          <p className="break-words text-sm leading-7 text-gray-700 sm:text-base">
                            {insight}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                </div>
              )}

          </div>

          {/* SIDEBAR */}

          <aside className="min-w-0 space-y-6">

            <div className="rounded-2xl bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">

              <h3 className="text-lg font-bold text-[#071A3D] sm:text-xl">
                Project Details
              </h3>

              <div className="mt-5 grid gap-5 sm:grid-cols-3 lg:mt-6 lg:grid-cols-1">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Category
                  </p>

                  <p className="mt-1 break-words text-sm font-semibold text-gray-700 sm:text-base">
                    {dashboard.category ||
                      "Data Analytics"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Software
                  </p>

                  <p className="mt-1 break-words text-sm font-semibold text-gray-700 sm:text-base">
                    {dashboard.software ||
                      "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Platform
                  </p>

                  <p className="mt-1 break-words text-sm font-semibold text-gray-700 sm:text-base">
                    {dashboard.platform ||
                      "Not specified"}
                  </p>
                </div>

              </div>
            </div>

            {dashboard.technologies &&
              dashboard.technologies.length >
                0 && (
                <div className="rounded-2xl bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">

                  <div className="flex items-center gap-2">
                    <Code2
                      size={20}
                      className="shrink-0 text-[#071A3D]"
                    />

                    <h3 className="text-lg font-bold text-[#071A3D] sm:text-xl">
                      Technologies
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {dashboard.technologies.map(
                      (
                        technology,
                        index
                      ) => (
                        <span
                          key={index}
                          className="max-w-full break-words rounded-full bg-[#F8F7F3] px-3 py-2 text-xs font-semibold text-gray-700 sm:px-4 sm:text-sm"
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>

                </div>
              )}

          </aside>

        </div>
      </section>
    </main>
  );
}