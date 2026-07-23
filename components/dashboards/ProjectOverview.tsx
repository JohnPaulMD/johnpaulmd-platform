type Props = {
  overview?: string;
};

export default function ProjectOverview({
  overview,
}: Props) {
  if (!overview) return null;

  return (
    <section className="mt-20">

      <h2 className="mb-6 text-3xl font-bold text-primary">
        Project Overview
      </h2>

      <p className="max-w-4xl leading-8 text-muted">
        {overview}
      </p>

    </section>
  );
}