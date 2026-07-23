type Props = {
  description: string;
};

export default function InnovationOverview({
  description,
}: Props) {
  return (
    <section className="mt-20">

      <h2 className="mb-6 text-3xl font-bold text-primary">
        Overview
      </h2>

      <p className="max-w-4xl leading-8 text-muted">
        {description}
      </p>

    </section>
  );
}