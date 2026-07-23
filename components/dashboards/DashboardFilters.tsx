"use client";

import SearchInput from "@/components/ui/SearchInput";
import FilterGroup from "@/components/ui/FilterGroup";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  software: string;
  setSoftware: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  softwares: string[];
  categories: string[];
};

export default function DashboardFilters({
  search,
  setSearch,
  software,
  setSoftware,
  category,
  setCategory,
  softwares,
  categories,
}: Props) {
  return (
    <div className="mb-12 space-y-8">

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search dashboards..."
      />

      <FilterGroup
        title="Software"
        options={["All", ...softwares]}
        selected={software}
        onSelect={setSoftware}
      />

      <FilterGroup
        title="Category"
        options={["All", ...categories]}
        selected={category}
        onSelect={setCategory}
      />

    </div>
  );
}