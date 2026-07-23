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

import getFeaturedDashboards, {
  FeaturedDashboard,
} from "@/services/dashboards/getFeaturedDashboards";

export default function FeaturedDashboards() {
  const [
    dashboards,
    setDashboards,
  ] = useState<FeaturedDashboard[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadFeaturedDashboards() {
      try {
        const data =
          await getFeaturedDashboards();

        setDashboards(data);
      } catch (error) {
        console.error(
          "Failed to load featured dashboards:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedDashboards();
  }, []);

  /* ================================= */
  /* LOADING */
  /* ================================= */

  if (loading) {
    return (
      <section className="bg-[#F8F7F3] px-4 py-14 sm:px-6 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <p className="text-center text-sm text-gray-500 sm:text-base">
            Loading featured projects...
          </p>

        </div>

      </section>
    );
  }

  /* ================================= */
  /* NO FEATURED DASHBOARDS */
  /* ================================= */

  if (dashboards.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F8F7F3] px-4 py-14 sm:px-6 sm:py-16 lg:py-20">

      <div className="mx-auto max-w-7xl">

        {/* ================================= */}
        {/* HEADING */}
        {/* ================================= */}

        <div className="mb-10 flex flex-col items-center gap-5 text-center md:mb-12 md:flex-row md:items-end md:justify-between md:text-left">

          <div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 sm:text-sm sm:tracking-[0.2em]">
              Selected Work
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#071A3D] sm:text-4xl md:text-5xl">
              Featured Dashboards
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base md:mx-0">
              Explore selected data analytics,
              visualization and business
              intelligence projects.
            </p>

          </div>

          {/* VIEW ALL */}

          <Link
            href="/dashboards"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#071A3D]/15 px-5 py-2.5 text-sm font-semibold text-[#071A3D] transition hover:border-[#071A3D] hover:bg-[#071A3D] hover:text-white sm:text-base md:border-0 md:px-0 md:py-0 md:hover:bg-transparent md:hover:text-blue-700"
          >
            View All Dashboards

            <ArrowRight
              size={18}
            />
          </Link>

        </div>

        {/* ================================= */}
        {/* DASHBOARD CARDS */}
        {/* ================================= */}

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">

          {dashboards
            .slice(0, 3)
            .map((dashboard) => (

              <article
                key={dashboard.id}
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
                        size={48}
                        className="text-gray-300 sm:h-[55px] sm:w-[55px]"
                      />

                    </div>

                  )}

                </div>

                {/* ================================= */}
                {/* CONTENT */}
                {/* ================================= */}

                <div className="flex flex-1 flex-col p-5 sm:p-6">

                  {/* TAGS */}

                  <div className="mb-4 flex flex-wrap gap-2">

                    {dashboard.category && (

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {dashboard.category}
                      </span>

                    )}

                    {dashboard.software && (

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                        {dashboard.software}
                      </span>

                    )}

                  </div>

                  {/* TITLE */}

                  <h3 className="text-lg font-bold leading-snug text-[#071A3D] sm:text-xl">
                    {dashboard.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                    {dashboard.description ||
                      "Explore this data analytics project."}
                  </p>

                  {/* PROJECT LINK */}

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

            ))}

        </div>

      </div>

    </section>
  );
}