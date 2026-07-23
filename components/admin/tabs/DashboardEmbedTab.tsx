"use client";

import { Dispatch, SetStateAction } from "react";
import { DashboardData } from "../DashboardEditor";

interface Props {
  dashboard: DashboardData;
  setDashboard: Dispatch<SetStateAction<DashboardData>>;
}

export default function DashboardEmbedTab({
  dashboard,
  setDashboard,
}: Props) {

  function update<K extends keyof DashboardData>(
    key: K,
    value: DashboardData[K]
  ) {
    setDashboard((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="space-y-8 rounded-3xl bg-white p-8 shadow">

      <div>

        <label className="mb-2 block font-semibold">
          Dashboard Platform
        </label>

        <select
          value={dashboard.platform}
          onChange={(e) =>
            update("platform", e.target.value)
          }
          className="w-full rounded-xl border p-3"
        >
          <option>Power BI</option>
          <option>Tableau</option>
          <option>Looker Studio</option>
          <option>Custom</option>
        </select>

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          Live Dashboard URL
        </label>

        <input
          value={dashboard.liveUrl}
          onChange={(e) =>
            update("liveUrl", e.target.value)
          }
          placeholder="https://..."
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          Embed URL
        </label>

        <input
          value={dashboard.embedUrl}
          onChange={(e) =>
            update("embedUrl", e.target.value)
          }
          placeholder="https://..."
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          GitHub Repository
        </label>

        <input
          value={dashboard.githubUrl}
          onChange={(e) =>
            update("githubUrl", e.target.value)
          }
          placeholder="https://github.com/..."
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          Project Website
        </label>

        <input
          value={dashboard.websiteUrl}
          onChange={(e) =>
            update("websiteUrl", e.target.value)
          }
          placeholder="https://..."
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div className="rounded-2xl bg-[#F8F7F3] p-6">

        <h3 className="mb-4 text-lg font-bold">
          Dashboard Preview
        </h3>

        <div className="flex h-72 items-center justify-center rounded-xl border bg-white">

          {dashboard.embedUrl ? (

            <iframe
              src={dashboard.embedUrl}
              className="h-full w-full rounded-xl"
              title="Dashboard Preview"
            />

          ) : (

            <p className="text-gray-500">
              Embedded dashboard preview will appear here.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}