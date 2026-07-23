"use client";

import {
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import type { DashboardData } from "../DashboardEditor";

import createDashboard from "@/services/dashboards/createDashboard";
import updateDashboard from "@/services/dashboards/updateDashboard";

interface Props {
  dashboard: DashboardData;

  setDashboard: Dispatch<
    SetStateAction<DashboardData>
  >;

  dashboardId?: string;
}

export default function DashboardPublishTab({
  dashboard,
  setDashboard,
  dashboardId,
}: Props) {
  const router = useRouter();

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  function updateStatus(
    status: "Draft" | "Published"
  ) {
    setDashboard((prev) => ({
      ...prev,
      status,
    }));
  }

  function updateFeatured(
    featured: boolean
  ) {
    setDashboard((prev) => ({
      ...prev,
      featured,
    }));
  }

  async function handleSave() {
    setMessage("");
    setError("");

    if (!dashboard.title.trim()) {
      setError(
        "Please enter a dashboard title."
      );
      return;
    }

    if (!dashboard.slug.trim()) {
      setError(
        "Please enter a dashboard slug."
      );
      return;
    }

    try {
      setSaving(true);

      if (dashboardId) {
        // EDIT EXISTING DASHBOARD

        await updateDashboard(
          dashboardId,
          dashboard
        );

        setMessage(
          dashboard.status === "Published"
            ? "Dashboard updated and published successfully."
            : "Dashboard updated successfully."
        );
      } else {
        // CREATE NEW DASHBOARD

        await createDashboard(
          dashboard
        );

        setMessage(
          dashboard.status === "Published"
            ? "Dashboard published successfully."
            : "Dashboard draft saved successfully."
        );
      }

      setTimeout(() => {
        router.push(
          "/admin/dashboards"
        );

        router.refresh();
      }, 1000);
    } catch (err) {
      console.error(
        "Dashboard save failed:",
        err
      );

      setError(
        dashboardId
          ? "Dashboard could not be updated. Please try again."
          : "Dashboard could not be saved. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <h2 className="mb-8 text-2xl font-bold">
        {dashboardId
          ? "Update Dashboard"
          : "Publish"}
      </h2>

      <div className="space-y-8">

        {/* Featured Dashboard */}

        <div className="flex items-center justify-between rounded-xl border p-5">

          <div>

            <h3 className="font-semibold">
              Featured Dashboard
            </h3>

            <p className="text-sm text-gray-500">
              Display this dashboard on the
              home page.
            </p>

          </div>

          <input
            type="checkbox"
            checked={
              dashboard.featured
            }
            onChange={(e) =>
              updateFeatured(
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

        </div>

        {/* Publish Status */}

        <div className="flex items-center justify-between rounded-xl border p-5">

          <div>

            <h3 className="font-semibold">
              Publish Status
            </h3>

            <p className="text-sm text-gray-500">
              Choose whether this dashboard
              should remain a draft or be
              publicly visible.
            </p>

          </div>

          <select
            value={
              dashboard.status
            }
            onChange={(e) =>
              updateStatus(
                e.target.value as
                  | "Draft"
                  | "Published"
              )
            }
            className="rounded-xl border p-3"
          >

            <option value="Draft">
              Draft
            </option>

            <option value="Published">
              Published
            </option>

          </select>

        </div>

        {/* Dashboard Summary */}

        <div className="rounded-xl bg-[#F8F7F3] p-5">

          <h3 className="mb-4 font-semibold">
            Dashboard Summary
          </h3>

          <div className="space-y-2 text-sm text-gray-600">

            <p>
              <strong>
                Title:
              </strong>{" "}
              {dashboard.title ||
                "Not provided"}
            </p>

            <p>
              <strong>
                Slug:
              </strong>{" "}
              {dashboard.slug ||
                "Not provided"}
            </p>

            <p>
              <strong>
                Category:
              </strong>{" "}
              {dashboard.category ||
                "Not provided"}
            </p>

            <p>
              <strong>
                Software:
              </strong>{" "}
              {dashboard.software ||
                "Not provided"}
            </p>

            <p>
              <strong>
                Platform:
              </strong>{" "}
              {dashboard.platform ||
                "Not provided"}
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              {dashboard.status}
            </p>

          </div>

        </div>

        {/* Error Message */}

        {error && (

          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>

        )}

        {/* Success Message */}

        {message && (

          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
            {message}
          </div>

        )}

        {/* Buttons */}

        <div className="flex justify-end gap-4">

          <button
            type="button"
            disabled={saving}
            onClick={() =>
              router.push(
                "/admin/dashboards"
              )
            }
            className="rounded-xl border border-gray-300 px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="rounded-xl bg-[#071A3D] px-8 py-3 font-semibold text-white transition hover:bg-[#0A2557] disabled:cursor-not-allowed disabled:opacity-60"
          >

            {saving
              ? dashboardId
                ? "Updating..."
                : "Saving..."
              : dashboardId
                ? "Update Dashboard"
                : dashboard.status ===
                    "Published"
                  ? "Publish Dashboard"
                  : "Save Draft"}

          </button>

        </div>

      </div>

    </div>
  );
}