"use client";

import { useMemo, useState } from "react";

import dashboardData from "@/data/dashboardData";

import DashboardCard from "./DashboardCard";
import DashboardFilters from "./DashboardFilters";
import EmptyState from "@/components/ui/EmptyState";

export default function DashboardGrid() {
  const [search, setSearch] = useState("");
  const [software, setSoftware] = useState("All");
  const [category, setCategory] = useState("All");

  const softwares = useMemo(() => {
    return [...new Set(dashboardData.map((d) => d.software))];
  }, []);

  const categories = useMemo(() => {
    return [...new Set(dashboardData.map((d) => d.category))];
  }, []);

  const dashboards = useMemo(() => {
    return dashboardData.filter((dashboard) => {
      const matchesSearch = dashboard.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSoftware =
        software === "All" || dashboard.software === software;

      const matchesCategory =
        category === "All" || dashboard.category === category;

      return matchesSearch && matchesSoftware && matchesCategory;
    });
  }, [search, software, category]);

  return (
    <>
      <DashboardFilters
        search={search}
        setSearch={setSearch}
        software={software}
        setSoftware={setSoftware}
        category={category}
        setCategory={setCategory}
        softwares={softwares}
        categories={categories}
      />

      {dashboards.length === 0 ? (
        <EmptyState
          title="No dashboards found"
          description="Try changing your search or filters."
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {dashboards.map((dashboard) => (
            <DashboardCard
              key={dashboard.id}
              dashboard={dashboard}
            />
          ))}
        </div>
      )}
    </>
  );
}