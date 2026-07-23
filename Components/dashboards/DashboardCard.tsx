import Link from "next/link";
import Image from "next/image";

import { Dashboard } from "@/types/dashboards";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

type Props = {
  dashboard: Dashboard;
};

export default function DashboardCard({
  dashboard,
}: Props) {
  return (
    <Link href={`/dashboards/${dashboard.slug}`}>

      <Card>

        <div className="relative h-56">

          <Image
            src={dashboard.image}
            alt={dashboard.title}
            fill
            className="object-cover"
          />

        </div>

        <div className="space-y-5 p-6">

          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            {dashboard.category}
          </p>

          <h3 className="text-2xl font-bold text-primary">
            {dashboard.title}
          </h3>

          <p className="leading-7 text-muted">
            {dashboard.description}
          </p>

          <div className="flex flex-wrap gap-2">

            {dashboard.technologies.map((tech) => (

              <Badge key={tech}>
                {tech}
              </Badge>

            ))}

          </div>

        </div>

      </Card>

    </Link>
  );
}