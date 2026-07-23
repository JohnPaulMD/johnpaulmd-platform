import { Research } from "@/types/research";

type Props = {
  research: Research;
};

export default function ResearchHero({
  research,
}: Props) {
  return (
    <div>

      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        {research.year}
      </p>

      <h1 className="mt-4 max-w-5xl text-5xl font-bold text-primary">
        {research.title}
      </h1>

      <p className="mt-6 text-lg text-muted">
        {research.authors}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">

        <span className="rounded-full bg-surface px-4 py-2 text-primary">
          {research.field}
        </span>

        <span className="rounded-full border border-border px-4 py-2 text-primary">
          {research.type}
        </span>

      </div>

    </div>
  );
}