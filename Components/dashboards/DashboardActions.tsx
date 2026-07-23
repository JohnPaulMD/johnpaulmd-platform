type Props = {
  liveUrl?: string;
  githubUrl?: string;
};

export default function DashboardActions({
  liveUrl,
  githubUrl,
}: Props) {
  if (!liveUrl && !githubUrl) return null;

  return (
    <section className="mt-16">

      <div className="flex flex-wrap gap-4">

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            View Live Dashboard
          </a>
        )}

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            View GitHub
          </a>
        )}

      </div>

    </section>
  );
}