import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

import InnovationGrid from "@/components/innovation/InnovationGrid";

export default function InnovationPage() {
  return (
    <Section>

      <Container>

        <SectionHeader
          eyebrow="Innovation"
          title="Innovation Lab"
          description="Explore digital products, AI tools and healthcare technologies developed under Manus Dei Solutions."
        />

        <InnovationGrid />

      </Container>

    </Section>
  );
}