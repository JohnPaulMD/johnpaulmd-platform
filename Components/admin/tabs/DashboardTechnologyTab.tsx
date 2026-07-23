"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { DashboardData } from "../DashboardEditor";

interface Props {
  dashboard: DashboardData;
  setDashboard: Dispatch<SetStateAction<DashboardData>>;
}

export default function DashboardTechnologyTab({
  dashboard,
  setDashboard,
}: Props) {
  const [technology, setTechnology] = useState("");

  function addTechnology() {
    if (!technology.trim()) return;

    setDashboard((prev) => ({
      ...prev,
      technologies: [
        ...prev.technologies,
        technology.trim(),
      ],
    }));

    setTechnology("");
  }

  function removeTechnology(index: number) {
    setDashboard((prev) => ({
      ...prev,
      technologies: prev.technologies.filter(
        (_, i) => i !== index
      ),
    }));
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Technologies Used
      </h2>

      <div className="flex gap-3">

        <input
          value={technology}
          onChange={(e) =>
            setTechnology(e.target.value)
          }
          placeholder="e.g. Power BI"
          className="flex-1 rounded-xl border p-3"
        />

        <button
          type="button"
          onClick={addTechnology}
          className="rounded-xl bg-[#071A3D] px-6 text-white"
        >
          Add
        </button>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        {dashboard.technologies.map(
          (tech, index) => (

            <div
              key={index}
              className="flex items-center gap-3 rounded-full bg-[#071A3D] px-5 py-2 text-white"
            >
              <span>{tech}</span>

              <button
                type="button"
                onClick={() =>
                  removeTechnology(index)
                }
                className="font-bold"
              >
                ✕
              </button>

            </div>

          )
        )}

      </div>

    </div>
  );
}