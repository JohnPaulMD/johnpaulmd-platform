"use client";

import SearchInput from "@/components/ui/SearchInput";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function InnovationFilters({
  search,
  setSearch,
}: Props) {
  return (
    <div className="mb-12">

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search applications..."
      />

    </div>
  );
}