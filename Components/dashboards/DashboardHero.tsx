import Image from "next/image";
import { Dashboard } from "@/types/dashboards";

type Props = {
  dashboard: Dashboard;
};

export default function DashboardHero({
  dashboard,
}: Props) {
  return (
    <div className="space-y-8">

      <Image
        src={dashboard.image}
        alt={dashboard.title}
        width={1400}
        height={700}
        className="rounded-3xl border border-border"
      />

      <div>

        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {dashboard.category}
        </p>

        <h1 className="mt-3 text-5xl font-bold text-primary">
          {dashboard.title}
        </h1>

        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted">
          {dashboard.description}
        </p>

      </div>

    </div>
  );
}