import Link from "next/link";
import Image from "next/image";

import { Innovation } from "@/types/innovation";

import Card from "@/components/ui/Card";

type Props = {
  app: Innovation;
};

export default function InnovationCard({
  app,
}: Props) {
  return (
    <Link href={`/innovation/${app.slug}`}>

      <Card className="overflow-hidden h-full">

        <div className="relative h-56 bg-surface">

          <Image
            src={app.image}
            alt={app.name}
            fill
            className="object-contain p-8"
          />

        </div>

        <div className="space-y-4 p-8">

          <h2 className="text-2xl font-bold text-primary">
            {app.name}
          </h2>

          <p className="font-medium text-accent">
            {app.tagline}
          </p>

          <p className="leading-7 text-muted">
            {app.description}
          </p>

        </div>

      </Card>

    </Link>
  );
}