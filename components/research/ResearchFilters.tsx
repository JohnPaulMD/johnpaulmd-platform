"use client";

import SearchInput from "@/components/ui/SearchInput";
import FilterGroup from "@/components/ui/FilterGroup";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  field: string;
  setField: (value: string) => void;
  fields: string[];
};

export default function ResearchFilters({
  search,
  setSearch,
  field,
  setField,
  fields,
}: Props) {
  return (
    <div className="mb-12 space-y-8">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search research..."
      />

      <FilterGroup
        title="Research Field"
        options={["All", ...fields]}
        selected={field}
        onSelect={setField}
      />
    </div>
  );
}