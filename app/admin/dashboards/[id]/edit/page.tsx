"use client";

import {
  use,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
} from "lucide-react";

import DashboardEditor, {
  DashboardData,
} from "@/components/admin/DashboardEditor";

import getDashboard from "@/services/dashboards/getDashboard";

interface EditDashboardPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditDashboardPage({
  params,
}: EditDashboardPageProps) {
  const { id } = use(params);

  const [
    dashboard,
    setDashboard,
  ] = useState<
    DashboardData | null
  >(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const data =
          await getDashboard(id);

        if (!data) {
          setError(
            "Dashboard not found."
          );

          return;
        }

        const dashboardData: DashboardData = {
          ...data,
        };

        delete (
          dashboardData as DashboardData & {
            id?: string;
          }
        ).id;

        setDashboard(
          dashboardData
        );
      } catch (err) {
        console.error(
          "Failed to load dashboard:",
          err
        );

        setError(
          "Could not load dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow">

        <p className="text-gray-500">
          Loading dashboard...
        </p>

      </div>
    );
  }

  if (
    error ||
    !dashboard
  ) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow">

        <h1 className="text-2xl font-bold text-[#071A3D]">
          Dashboard unavailable
        </h1>

        <p className="mt-3 text-gray-500">
          {error ||
            "Dashboard could not be found."}
        </p>

        <Link
          href="/admin/dashboards"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white"
        >
          <ArrowLeft
            size={18}
          />

          Back to Dashboards
        </Link>

      </div>
    );
  }

  return (
    <div>

      <div className="mb-8">

        <Link
          href="/admin/dashboards"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#071A3D]"
        >
          <ArrowLeft
            size={17}
          />

          Back to Dashboards
        </Link>

        <h1 className="text-4xl font-bold text-[#071A3D]">
          Edit Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Edit {dashboard.title}
        </p>

      </div>

      <DashboardEditor
        initialData={dashboard}
        dashboardId={id}
      />

    </div>
  );
}