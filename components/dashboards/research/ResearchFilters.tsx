"use client";

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
    <div className="mb-12 space-y-6">

      <input
        type="text"
        placeholder="Search research..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-2xl border border-border px-5 py-4 outline-none transition focus:border-accent"
      />

      <div className="flex flex-wrap gap-3">

        <button
          onClick={() => setField("All")}
          className={`rounded-full px-5 py-2 font-medium transition ${
            field === "All"
              ? "bg-primary text-white"
              : "border border-border"
          }`}
        >
          All
        </button>

        {fields.map((item) => (
          <button
            key={item}
            onClick={() => setField(item)}
            className={`rounded-full px-5 py-2 font-medium transition ${
              field === item
                ? "bg-primary text-white"
                : "border border-border"
            }`}
          >
            {item}
          </button>
        ))}

      </div>

    </div>
  );
}