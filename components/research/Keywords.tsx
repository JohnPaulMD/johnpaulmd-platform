import Badge from "@/components/ui/Badge";

type Props = {
  keywords?: string[];
};

export default function Keywords({
  keywords,
}: Props) {
  if (!keywords?.length) return null;

  return (
    <section className="mt-20">

      <h2 className="mb-6 text-3xl font-bold text-primary">
        Keywords
      </h2>

      <div className="flex flex-wrap gap-3">

        {keywords.map((keyword) => (
          <Badge key={keyword}>
            {keyword}
          </Badge>
        ))}

      </div>

    </section>
  );
}