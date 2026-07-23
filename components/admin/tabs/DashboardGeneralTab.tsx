"use client";

import { Dispatch, SetStateAction } from "react";
import { DashboardData } from "../DashboardEditor";

interface Props {
  dashboard: DashboardData;
  setDashboard: Dispatch<SetStateAction<DashboardData>>;
}

export default function DashboardGeneralTab({
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
    <div className="space-y-6 rounded-3xl bg-white p-8 shadow">
      <div>
        <label className="mb-2 block font-semibold">
          Dashboard Title
        </label>

        <input
          value={dashboard.title}
          onChange={(e) =>
            update("title", e.target.value)
          }
          placeholder="Sales Dashboard"
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Slug
        </label>

        <input
          value={dashboard.slug}
          onChange={(e) =>
            update("slug", e.target.value)
          }
          placeholder="sales-dashboard"
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <input
            value={dashboard.category}
            onChange={(e) =>
              update("category", e.target.value)
            }
            placeholder="Business Intelligence"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Software
          </label>

          <select
            value={dashboard.software}
            onChange={(e) =>
              update("software", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          >
            <option>Power BI</option>
            <option>Tableau</option>
            <option>Excel</option>
            <option>Python</option>
            <option>R</option>
          </select>
        </div>
      </div>
    </div>
  );
}