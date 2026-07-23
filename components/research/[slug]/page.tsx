import { notFound } from "next/navigation";

import researchData from "@/data/researchData";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import ResearchHero from "@/components/research/ResearchHero";
import ResearchAbstract from "@/components/research/ResearchAbstract";
import Keywords from "@/components/research/Keywords";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ResearchDetails({
  params,
}: Props) {
  const { slug } = await params;

  const research = researchData.find(
    (item) => item.slug === slug
  );

  if (!research) {
    notFound();
  }

  return (
    <Section>

      <Container>

        <ResearchHero
          research={research}
        />

        <ResearchAbstract
          abstract={research.abstract}
        />

        <Keywords
          keywords={research.keywords}
        />

      </Container>

    </Section>
  );
}