"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  BarChart3,
} from "lucide-react";

import getPublishedDashboards, {
  PublishedDashboard,
} from "@/services/dashboards/getPublishedDashboards";

export default function DashboardsPage() {
  const [
    dashboards,
    setDashboards,
  ] = useState<
    PublishedDashboard[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ================================= */
  /* LOAD PUBLISHED DASHBOARDS */
  /* ================================= */

  useEffect(() => {
    async function loadDashboards() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getPublishedDashboards();

        setDashboards(data);
      } catch (err) {
        console.error(
          "Failed to load published dashboards:",
          err
        );

        setError(
          "Unable to load dashboards."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboards();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F7F3]">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <section className="bg-[#071A3D] px-4 pb-14 pt-32 text-white sm:px-6 sm:pb-16 sm:pt-36 lg:py-20 lg:pt-36">

        <div className="mx-auto max-w-7xl text-center md:text-left">

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200 sm:mb-4 sm:text-sm sm:tracking-[0.2em]">
            Data Analytics
          </p>

          <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:mx-0 md:text-5xl lg:text-6xl">
            Interactive Dashboards
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base md:mx-0 md:mt-6 lg:text-lg lg:leading-8">
            Explore data analytics projects,
            interactive visualizations and
            business intelligence dashboards.
          </p>

        </div>

      </section>

      {/* ================================= */}
      {/* DASHBOARDS */}
      {/* ================================= */}

      <section className="px-4 py-14 sm:px-6 sm:py-16">

        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADER */}

          <div className="mb-8 text-center sm:mb-10 md:text-left">

            <h2 className="text-2xl font-bold text-[#071A3D] sm:text-3xl">
              Dashboard Projects
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base md:mx-0">
              Explore published data visualization
              and analytics projects.
            </p>

          </div>

          {/* ================================= */}
          {/* LOADING */}
          {/* ================================= */}

          {loading && (

            <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-12">

              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-[#071A3D]" />

              <p className="mt-4 text-sm text-gray-500 sm:text-base">
                Loading dashboards...
              </p>

            </div>

          )}

          {/* ================================= */}
          {/* ERROR */}
          {/* ================================= */}

          {error && (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700 sm:p-6 sm:text-base">
              {error}
            </div>

          )}

          {/* ================================= */}
          {/* EMPTY */}
          {/* ================================= */}

          {!loading &&
            !error &&
            dashboards.length === 0 && (

              <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-12">

                <BarChart3
                  size={48}
                  className="mx-auto text-gray-300 sm:h-[55px] sm:w-[55px]"
                />

                <h3 className="mt-5 text-lg font-bold text-[#071A3D] sm:text-xl">
                  No published dashboards yet
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                  Published dashboard projects
                  will appear here.
                </p>

              </div>

            )}

          {/* ================================= */}
          {/* DASHBOARD GRID */}
          {/* ================================= */}

          {!loading &&
            !error &&
            dashboards.length > 0 && (

              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">

                {dashboards.map(
                  (dashboard) => (

                    <article
                      key={
                        dashboard.id
                      }
                      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl"
                    >

                      {/* ================================= */}
                      {/* IMAGE */}
                      {/* ================================= */}

                      <div className="h-48 overflow-hidden bg-gray-100 sm:h-52 lg:h-56">

                        {dashboard.image ? (

                          <Image
                            src={dashboard.image}
                            alt={dashboard.title}
                            width={800}
                            height={500}
                            unoptimized
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                        ) : (

                          <div className="flex h-full items-center justify-center">

                            <BarChart3
                              size={50}
                              className="text-gray-300 sm:h-[60px] sm:w-[60px]"
                            />

                          </div>

                        )}

                      </div>

                      {/* ================================= */}
                      {/* CARD CONTENT */}
                      {/* ================================= */}

                      <div className="flex flex-1 flex-col p-5 sm:p-6">

                        {/* TAGS */}

                        <div className="mb-4 flex flex-wrap gap-2">

                          <span className="max-w-full break-words rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">

                            {dashboard.category ||
                              "Dashboard"}

                          </span>

                          {dashboard.software && (

                            <span className="max-w-full break-words rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">

                              {
                                dashboard.software
                              }

                            </span>

                          )}

                        </div>

                        {/* TITLE */}

                        <h3 className="break-words text-lg font-bold leading-snug text-[#071A3D] sm:text-xl">

                          {
                            dashboard.title
                          }

                        </h3>

                        {/* DESCRIPTION */}

                        <p className="mt-3 line-clamp-3 break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">

                          {dashboard.description ||
                            "Explore this data analytics dashboard project."}

                        </p>

                        {/* ================================= */}
                        {/* VIEW PROJECT */}
                        {/* ================================= */}

                        <div className="mt-auto pt-6">

                          <Link
                            href={`/dashboards/${dashboard.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#071A3D] transition hover:gap-3 sm:text-base"
                          >
                            View Project

                            <ArrowRight
                              size={18}
                            />

                          </Link>

                        </div>

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