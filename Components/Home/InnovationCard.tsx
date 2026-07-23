import Image from "next/image";
import { Innovation } from "@/types/innovation";

type InnovationCardProps = {
  app: Innovation;
};

export default function InnovationCard({
  app,
}: InnovationCardProps) {
  const statusColor = {
    Live: "bg-green-100 text-green-700",
    Beta: "bg-blue-100 text-blue-700",
    "Coming Soon": "bg-yellow-100 text-yellow-700",
    "In Development": "bg-gray-200 text-gray-700",
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">

      {/* App Preview */}

      <div className="relative h-56 bg-surface">

        <Image
          src={app.image}
          alt={app.name}
          fill
          className="object-contain p-8 transition duration-500 group-hover:scale-105"
        />

      </div>

      {/* Content */}

      <div className="space-y-5 p-8">

        <div className="flex items-start justify-between">

          <div>

            <h3 className="text-2xl font-bold text-primary">
              {app.name}
            </h3>

            <p className="mt-1 text-sm text-muted">
              {app.tagline}
            </p>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              statusColor[
                app.status as keyof typeof statusColor
              ]
            }`}
          >
            {app.status}
          </span>

        </div>

        <p className="leading-7 text-muted">
          {app.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>

            <p className="font-semibold text-primary">
              Version
            </p>

            <p className="text-muted">
              {app.version}
            </p>

          </div>

          <div>

            <p className="font-semibold text-primary">
              Release
            </p>

            <p className="text-muted">
              {app.releaseDate}
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-2">

          {app.platform.map((platform) => (
            <span
              key={platform}
              className="rounded-full bg-primary px-3 py-1 text-sm text-white"
            >
              {platform}
            </span>
          ))}

        </div>

        <div className="flex flex-wrap gap-3 pt-2">

          {app.playStore && (
            <a
              href={app.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Google Play
            </a>
          )}

          {app.appStore && (
            <a
              href={app.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              App Store
            </a>
          )}

          {app.website && (
            <a
              href={app.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Website
            </a>
          )}

          {app.github && (
            <a
              href={app.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-text transition hover:bg-surface"
            >
              GitHub
            </a>
          )}

        </div>

      </div>

    </div>
  );
}