type Props = {
  embedUrl?: string;
};

export default function LiveDashboard({
  embedUrl,
}: Props) {
  if (!embedUrl) return null;

  return (
    <section className="mt-20">

      <h2 className="mb-6 text-3xl font-bold text-primary">
        Live Dashboard
      </h2>

      <div className="overflow-hidden rounded-3xl border border-border">

        <iframe
          src={embedUrl}
          className="h-[700px] w-full"
          allowFullScreen
        />

      </div>

    </section>
  );
}