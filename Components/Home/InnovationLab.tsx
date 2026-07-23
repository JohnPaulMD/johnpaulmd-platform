import SectionHeader from "@/components/ui/SectionHeader";
import InnovationCard from "./InnovationCard";
import innovationData from "@/data/innovationData";

export default function InnovationLab() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          eyebrow="Innovation"
          title="Innovation Lab"
          description="Building digital tools that support healthcare, education and research."
        />

        <div className="grid gap-8 md:grid-cols-2">

          {innovationData
            .filter((app) => app.featured)
            .map((app) => (
              <InnovationCard
                key={app.id}
                app={app}
              />
            ))}

        </div>

      </div>

    </section>
  );
}