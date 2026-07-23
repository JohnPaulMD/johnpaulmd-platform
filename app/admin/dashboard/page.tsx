"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  BarChart3,
  BookOpen,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  Clock,
} from "lucide-react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface DashboardStats {
  dashboards: number;
  research: number;
  innovations: number;
  reviews: number;
  pendingReviews: number;
}

const initialStats: DashboardStats = {
  dashboards: 0,
  research: 0,
  innovations: 0,
  reviews: 0,
  pendingReviews: 0,
};

export default function AdminDashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats>(
      initialStats
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadDashboardStats() {
      try {
        setLoading(true);

        const [
          dashboardsSnapshot,
          researchSnapshot,
          innovationsSnapshot,
          reviewsSnapshot,
        ] = await Promise.all([
          getDocs(
            collection(
              db,
              "dashboards"
            )
          ),

          getDocs(
            collection(
              db,
              "research"
            )
          ),

          getDocs(
            collection(
              db,
              "innovations"
            )
          ),

          getDocs(
            collection(
              db,
              "reviews"
            )
          ),
        ]);

        const pendingReviews =
          reviewsSnapshot.docs.filter(
            (document) =>
              document.data()
                .status ===
              "Pending"
          ).length;

        setStats({
          dashboards:
            dashboardsSnapshot.size,

          research:
            researchSnapshot.size,

          innovations:
            innovationsSnapshot.size,

          reviews:
            reviewsSnapshot.size,

          pendingReviews,
        });
      } catch (error) {
        console.error(
          "Failed to load admin dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboardStats();
  }, []);

  const cards = [
    {
      title: "Dashboards",

      value:
        stats.dashboards,

      description:
        "Data analytics projects",

      href:
        "/admin/dashboards",

      icon:
        BarChart3,
    },

    {
      title: "Research",

      value:
        stats.research,

      description:
        "Research projects",

      href:
        "/admin/research",

      icon:
        BookOpen,
    },

    {
      title: "Innovations",

      value:
        stats.innovations,

      description:
        "Innovation projects",

      href:
        "/admin/innovation",

      icon:
        Lightbulb,
    },

    {
      title: "Reviews",

      value:
        stats.reviews,

      description:
        "Client testimonials",

      href:
        "/admin/review",

      icon:
        MessageSquare,
    },
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
          Manus Dei Solutions
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#071A3D]">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-gray-500">
          Manage your dashboards,
          research, innovations and
          client reviews from one place.
        </p>

      </div>

      {/* STATISTICS */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {cards.map(
          (card) => {
            const Icon =
              card.icon;

            return (
              <Link
                key={
                  card.title
                }
                href={
                  card.href
                }
                className="group rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#071A3D]/5">

                    <Icon
                      size={23}
                      className="text-[#071A3D]"
                    />

                  </div>

                  <ArrowRight
                    size={19}
                    className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#071A3D]"
                  />

                </div>

                <div className="mt-6">

                  <p className="text-sm font-semibold text-gray-500">
                    {
                      card.title
                    }
                  </p>

                  <p className="mt-2 text-4xl font-bold text-[#071A3D]">

                    {loading
                      ? "..."
                      : card.value}

                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    {
                      card.description
                    }
                  </p>

                </div>

              </Link>
            );
          }
        )}

      </div>

      {/* PENDING REVIEWS */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-50">

              <Clock
                size={23}
                className="text-yellow-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-[#071A3D]">
                Pending Reviews
              </h2>

              <p className="mt-2 text-gray-500">

                {loading
                  ? "Checking for new reviews..."
                  : stats.pendingReviews ===
                    0
                  ? "There are currently no reviews awaiting approval."
                  : stats.pendingReviews ===
                    1
                  ? "1 review is waiting for your approval."
                  : `${stats.pendingReviews} reviews are waiting for your approval.`}

              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            {!loading &&
              stats.pendingReviews >
                0 && (

                <span className="flex h-10 min-w-10 items-center justify-center rounded-full bg-yellow-100 px-3 font-bold text-yellow-700">
                  {
                    stats.pendingReviews
                  }
                </span>

              )}

            <Link
              href="/admin/review"
              className="flex items-center gap-2 rounded-xl bg-[#071A3D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A2557]"
            >
              Manage Reviews

              <ArrowRight
                size={17}
              />

            </Link>

          </div>

        </div>

      </section>

      {/* QUICK ACTIONS */}

      <section>

        <div>

          <h2 className="text-2xl font-bold text-[#071A3D]">
            Quick Actions
          </h2>

          <p className="mt-2 text-gray-500">
            Quickly access the main
            management areas of your
            website.
          </p>

        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <Link
            href="/admin/dashboards"
            className="rounded-2xl border border-gray-200 bg-white p-5 font-semibold text-[#071A3D] transition hover:border-[#071A3D]/30 hover:shadow-sm"
          >
            Manage Dashboards
          </Link>

          <Link
            href="/admin/research"
            className="rounded-2xl border border-gray-200 bg-white p-5 font-semibold text-[#071A3D] transition hover:border-[#071A3D]/30 hover:shadow-sm"
          >
            Manage Research
          </Link>

          <Link
            href="/admin/innovation"
            className="rounded-2xl border border-gray-200 bg-white p-5 font-semibold text-[#071A3D] transition hover:border-[#071A3D]/30 hover:shadow-sm"
          >
            Manage Innovations
          </Link>

          <Link
            href="/admin/review"
            className="rounded-2xl border border-gray-200 bg-white p-5 font-semibold text-[#071A3D] transition hover:border-[#071A3D]/30 hover:shadow-sm"
          >
            Manage Reviews
          </Link>

        </div>

      </section>

    </div>
  );
}