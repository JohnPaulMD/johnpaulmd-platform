import Link from "next/link";
import { Research } from "@/types/research";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

type Props = {
  research: Research;
};

export default function ResearchCard({
  research,
}: Props) {
  return (
    <Link href={`/research/${research.slug}`}>

      <Card className="p-8 h-full">

        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {research.year}
        </p>

        <h2 className="mt-4 text-2xl font-bold text-primary">
          {research.title}
        </h2>

        <p className="mt-5 leading-7 text-muted">
          {research.abstract}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">

          <Badge>
            {research.field}
          </Badge>

          <Badge>
            {research.type}
          </Badge>

        </div>

      </Card>

    </Link>
  );
}