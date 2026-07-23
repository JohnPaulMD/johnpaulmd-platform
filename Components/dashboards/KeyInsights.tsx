type Props = {
  insights?: string[];
};

export default function KeyInsights({
  insights,
}: Props) {
  if (!insights?.length) return null;

  return (
    <section className="mt-20">

      <h2 className="mb-6 text-3xl font-bold text-primary">
        Key Insights
      </h2>

      <div className="grid gap-6 md:grid-cols-3">

        {insights.map((insight) => (

          <div
            key={insight}
            className="rounded-2xl border border-border bg-surface p-6"
          >

            <p className="leading-7 text-muted">
              {insight}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}