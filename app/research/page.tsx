import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

import ResearchGrid from "@/components/research/ResearchGrid";

export const metadata: Metadata = {
  title: "Research",

  description:
    "Explore published and ongoing research projects by JohnPaul Ozoigbo across biomedical sciences, health sciences, public health and related research fields.",

  keywords: [
    "JohnPaul Ozoigbo research",
    "Biomedical Research",
    "Health Sciences Research",
    "Public Health Research",
    "Medical Research",
    "Research Projects Nigeria",
    "Manus Dei Solutions",
  ],

  openGraph: {
    title: "Research | JohnPaul Ozoigbo",

    description:
      "Explore biomedical, health sciences and public health research projects by JohnPaul Ozoigbo.",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Research | JohnPaul Ozoigbo",

    description:
      "Explore biomedical, health sciences and public health research projects by JohnPaul Ozoigbo.",
  },
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[#071A3D] text-white">

      <section className="px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">

        <Container>

          <div className="mx-auto max-w-4xl">

            <SectionHeader
              eyebrow="Research"
              title="Research Library"
              description="Browse published and ongoing research projects in health sciences, public health and biomedical research."
            />

          </div>

          <div className="mt-8 sm:mt-10 lg:mt-12">

            <ResearchGrid />

          </div>

        </Container>

      </section>

    </main>
  );
}