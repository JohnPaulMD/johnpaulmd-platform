import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

import InnovationGrid from "@/components/innovation/InnovationGrid";

export const metadata: Metadata = {
  title: "Innovation",

  description:
    "Explore innovation projects by JohnPaul Ozoigbo, including technology, data, software and research-driven solutions designed to solve practical problems.",

  keywords: [
    "JohnPaul Ozoigbo innovation",
    "Manus Dei Solutions",
    "Innovation Projects",
    "Technology Projects",
    "Digital Innovation",
    "Data Innovation",
    "Software Solutions",
    "Research Innovation",
    "Nigeria",
  ],

  openGraph: {
    title: "Innovation | JohnPaul Ozoigbo",

    description:
      "Explore technology, data, software and research-driven innovation projects by JohnPaul Ozoigbo.",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Innovation | JohnPaul Ozoigbo",

    description:
      "Explore technology, data, software and research-driven innovation projects by JohnPaul Ozoigbo.",
  },
};

export default function InnovationPage() {
  return (
    <main className="min-h-screen bg-[#071A3D] text-white">

      {/* ================================= */}
      {/* INNOVATION LAB */}
      {/* ================================= */}

      <section className="px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">

        <Container>

          {/* ================================= */}
          {/* PAGE HEADER */}
          {/* ================================= */}

          <div className="mx-auto max-w-4xl">

            <SectionHeader
              eyebrow="Innovation Lab"
              title="Ideas Built Into Solutions"
              description="Explore technology, research and experimental projects designed to solve practical problems through data, software and innovation."
            />

          </div>

          {/* ================================= */}
          {/* INNOVATION PROJECTS */}
          {/* ================================= */}

          <div className="mt-8 sm:mt-10 lg:mt-12">

            <InnovationGrid />

          </div>

        </Container>

      </section>

    </main>
  );
}