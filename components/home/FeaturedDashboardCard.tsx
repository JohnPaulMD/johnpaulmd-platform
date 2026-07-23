import Image from "next/image";
import { Dashboard } from "@/types/dashboards";

type FeaturedDashboardCardProps = {
  dashboard: Dashboard;
};

export default function FeaturedDashboardCard({
  dashboard,
}: FeaturedDashboardCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">

      {/* Dashboard Preview */}

      <div className="relative h-72 overflow-hidden">

        <Image
          src={dashboard.image}
          alt={dashboard.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />

      </div>

      {/* Content */}

      <div className="space-y-5 p-8">

        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
          {dashboard.category}
        </p>

        <h3 className="text-2xl font-bold text-primary">
          {dashboard.title}
        </h3>

        {dashboard.description && (
          <p className="text-muted leading-7">
            {dashboard.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">

          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
            {dashboard.software}
          </span>

          {dashboard.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted"
            >
              {tech}
            </span>
          ))}

        </div>

      </div>

    </div>
  );
}