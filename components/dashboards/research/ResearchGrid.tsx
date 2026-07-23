"use client";

import { useMemo, useState } from "react";

import researchData from "@/data/researchData";

import ResearchCard from "./ResearchCard";
import ResearchFilters from "./ResearchFilters";

export default function ResearchGrid() {
  const [search, setSearch] = useState("");

  const [field, setField] =
    useState("All");

  const fields = useMemo(() => {
    return [...new Set(researchData.map((r) => r.field))];
  }, []);

  const research = useMemo(() => {
    return researchData.filter((item) => {

      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesField =
        field === "All" ||
        item.field === field;

      return (
        matchesSearch &&
        matchesField
      );
    });
  }, [search, field]);

  return (
    <>

      <ResearchFilters
        search={search}
        setSearch={setSearch}
        field={field}
        setField={setField}
        fields={fields}
      />

      {research.length === 0 ? (

        <div className="rounded-3xl border border-border bg-surface p-12 text-center">

          <h2 className="text-2xl font-bold text-primary">
            No research found
          </h2>

          <p className="mt-3 text-muted">
            Try another search.
          </p>

        </div>

      ) : (

        <div className="grid gap-8 lg:grid-cols-2">

          {research.map((paper) => (

            <ResearchCard
              key={paper.id}
              research={paper}
            />

          ))}

        </div>

      )}

    </>
  );
}