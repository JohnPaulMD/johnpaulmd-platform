"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  BarChart3,
  ExternalLink,
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";

import getDashboards, {
  DashboardRecord,
} from "@/services/dashboards/getDashboards";

import deleteDashboard from "@/services/dashboards/deleteDashboard";

export default function AdminDashboardsPage() {
  const [dashboards, setDashboards] =
    useState<DashboardRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  async function loadDashboards() {
    try {
      setLoading(true);

      setError("");

      const data =
        await getDashboards();

      setDashboards(data);
    } catch (err) {
      console.error(
        "Failed to load dashboards:",
        err
      );

      setError(
        "Could not load dashboards."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void Promise.resolve().then(
      loadDashboards
    );
  }, []);

  async function handleDelete(
    id: string,
    title: string
  ) {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteDashboard(id);

      setDashboards((prev) =>
        prev.filter(
          (dashboard) =>
            dashboard.id !== id
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete dashboard:",
        err
      );

      alert(
        "Dashboard could not be deleted."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-5">

        <div>

          <h1 className="text-4xl font-bold text-[#071A3D]">
            Dashboards
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your dashboard projects.
          </p>

        </div>

        <Link
          href="/admin/dashboards/new"
          className="flex items-center gap-2 rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white transition hover:bg-[#0A2557]"
        >
          <Plus size={18} />

          New Dashboard
        </Link>

      </div>

      {/* Loading */}

      {loading && (

        <div className="rounded-2xl bg-white p-10 text-center shadow">

          <p className="text-gray-500">
            Loading dashboards...
          </p>

        </div>

      )}

      {/* Error */}

      {error && (

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">

          {error}

        </div>

      )}

      {/* Empty State */}

      {!loading &&
        !error &&
        dashboards.length === 0 && (

          <div className="rounded-3xl bg-white p-12 text-center shadow">

            <BarChart3
              size={50}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-xl font-bold text-[#071A3D]">
              No dashboards yet
            </h2>

            <p className="mt-2 text-gray-500">
              Create your first dashboard
              project.
            </p>

            <Link
              href="/admin/dashboards/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white"
            >
              <Plus size={18} />

              Create Dashboard
            </Link>

          </div>

        )}

      {/* Dashboard Grid */}

      {!loading &&
        dashboards.length > 0 && (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {dashboards.map(
              (dashboard) => (

                <div
                  key={dashboard.id}
                  className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Image */}

                  <div className="flex h-48 items-center justify-center bg-gray-100">
                  {dashboard.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dashboard.image}
                        alt={dashboard.title}
                        className="h-full w-full object-cover"
                      />
                    </>
                  ) : (
                    <BarChart3
                      size={55}
                      className="text-gray-300"
                    />
                  )}
                </div>
                  {/* Content */}

                  <div className="p-6">

                    <div className="mb-4 flex items-center justify-between gap-3">

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">

                        {dashboard.category ||
                          "Dashboard"}

                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          dashboard.status ===
                          "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {dashboard.status}

                      </span>

                    </div>

                    <h2 className="text-xl font-bold text-[#071A3D]">

                      {dashboard.title}

                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">

                      {dashboard.description ||
                        "No description provided."}

                    </p>

                    {/* Actions */}

                    <div className="mt-6 flex items-center gap-2">

                      {/* Edit */}

                      <Link
                        href={`/admin/dashboards/${dashboard.id}/edit`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 font-semibold text-[#071A3D] transition hover:bg-gray-50"
                      >
                        <Pencil
                          size={16}
                        />

                        Edit
                      </Link>

                      {/* Live Dashboard */}

                      {dashboard.liveUrl && (

                        <a
                          href={
                            dashboard.liveUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open live dashboard"
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-[#071A3D] transition hover:bg-gray-50"
                        >
                          <ExternalLink
                            size={18}
                          />
                        </a>

                      )}

                      {/* Delete */}

                      <button
                        type="button"
                        disabled={
                          deletingId ===
                          dashboard.id
                        }
                        onClick={() =>
                          handleDelete(
                            dashboard.id,
                            dashboard.title
                          )
                        }
                        title="Delete dashboard"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >

                        {deletingId ===
                        dashboard.id ? (

                          <span className="text-xs">
                            ...
                          </span>

                        ) : (

                          <Trash2
                            size={18}
                          />

                        )}

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

    </div>
  );
}