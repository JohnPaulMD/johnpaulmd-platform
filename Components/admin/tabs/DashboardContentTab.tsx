"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { DashboardData } from "../DashboardEditor";

interface Props {
  dashboard: DashboardData;
  setDashboard: Dispatch<SetStateAction<DashboardData>>;
}

export default function DashboardContentTab({
  dashboard,
  setDashboard,
}: Props) {
  const [objective, setObjective] = useState("");
  const [insight, setInsight] = useState("");

  function update<K extends keyof DashboardData>(
    key: K,
    value: DashboardData[K]
  ) {
    setDashboard((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function addObjective() {
    if (!objective.trim()) return;

    update("objectives", [
      ...dashboard.objectives,
      objective,
    ]);

    setObjective("");
  }

  function removeObjective(index: number) {
    update(
      "objectives",
      dashboard.objectives.filter((_, i) => i !== index)
    );
  }

  function addInsight() {
    if (!insight.trim()) return;

    update("insights", [
      ...dashboard.insights,
      insight,
    ]);

    setInsight("");
  }

  function removeInsight(index: number) {
    update(
      "insights",
      dashboard.insights.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="space-y-10 rounded-3xl bg-white p-8 shadow">

      <div>
        <label className="mb-2 block font-semibold">
          Short Description
        </label>

        <textarea
          rows={3}
          value={dashboard.description}
          onChange={(e) =>
            update("description", e.target.value)
          }
          className="w-full rounded-xl border p-4"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Project Overview
        </label>

        <textarea
          rows={8}
          value={dashboard.overview}
          onChange={(e) =>
            update("overview", e.target.value)
          }
          className="w-full rounded-xl border p-4"
        />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">
          Objectives
        </h2>

        <div className="flex gap-3">
          <input
            value={objective}
            onChange={(e) =>
              setObjective(e.target.value)
            }
            className="flex-1 rounded-xl border p-3"
          />

          <button
            type="button"
            onClick={addObjective}
            className="rounded-xl bg-[#071A3D] px-6 text-white"
          >
            Add
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {dashboard.objectives.map(
            (item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-[#F8F7F3] p-4"
              >
                <span>{item}</span>

                <button
                  type="button"
                  onClick={() =>
                    removeObjective(index)
                  }
                  className="font-bold text-red-500"
                >
                  ✕
                </button>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">
          Key Insights
        </h2>

        <div className="flex gap-3">
          <input
            value={insight}
            onChange={(e) =>
              setInsight(e.target.value)
            }
            className="flex-1 rounded-xl border p-3"
          />

          <button
            type="button"
            onClick={addInsight}
            className="rounded-xl bg-[#071A3D] px-6 text-white"
          >
            Add
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {dashboard.insights.map(
            (item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-[#F8F7F3] p-4"
              >
                <span>{item}</span>

                <button
                  type="button"
                  onClick={() =>
                    removeInsight(index)
                  }
                  className="font-bold text-red-500"
                >
                  ✕
                </button>
              </div>
            )
          )}
        </div>
      </div>

    </div>
  );
}