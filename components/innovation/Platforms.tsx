import Badge from "@/components/ui/Badge";

type Props = {
  platforms: string[];
};

export default function Platforms({
  platforms,
}: Props) {
  return (
    <section className="mt-20">

      <h2 className="mb-8 text-3xl font-bold text-primary">
        Platforms
      </h2>

      <div className="flex flex-wrap gap-4">

        {platforms.map((platform) => (

          <Badge key={platform}>
            {platform}
          </Badge>

        ))}

      </div>

    </section>
  );
}