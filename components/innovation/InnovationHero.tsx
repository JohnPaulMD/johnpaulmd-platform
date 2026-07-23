import Image from "next/image";

import { Innovation } from "@/types/innovation";

import StatusBadge from "./StatusBadge";

type Props = {
  app: Innovation;
};

export default function InnovationHero({
  app,
}: Props) {
  return (
    <section className="grid items-center gap-16 lg:grid-cols-2">

      <div className="relative h-[450px] rounded-3xl bg-surface">

        <Image
          src={app.image}
          alt={app.name}
          fill
          className="object-contain p-12"
        />

      </div>

      <div>

        <StatusBadge
          status={app.status}
        />

        <h1 className="mt-6 text-5xl font-bold text-primary">
          {app.name}
        </h1>

        <p className="mt-3 text-xl text-accent">
          {app.tagline}
        </p>

        <p className="mt-8 leading-8 text-muted">
          {app.description}
        </p>

      </div>

    </section>
  );
}