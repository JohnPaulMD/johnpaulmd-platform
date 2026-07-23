import { Research } from "@/types/research";

type ResearchItemProps = {
  research: Research;
};

export default function ResearchItem({
  research,
}: ResearchItemProps) {
  return (
    <article className="border-b border-border py-10">

      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
        {research.year}
      </p>

      <h3 className="mt-3 text-2xl font-bold leading-snug text-primary transition hover:text-accent">
        {research.title}
      </h3>

      <div className="mt-4 flex flex-wrap items-center gap-3">

        <span className="rounded-full bg-surface px-4 py-1 text-sm font-medium text-primary">
          {research.field}
        </span>

        <span className="rounded-full border border-accent/40 px-4 py-1 text-sm font-medium text-primary">
          {research.type}
        </span>

      </div>

      <p className="mt-4 text-muted">
        {research.authors}
      </p>

      <button className="mt-6 font-semibold text-accent transition hover:text-primary">
        Read Publication →
      </button>

    </article>
  );
}