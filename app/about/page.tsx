import type { Metadata } from "next";

import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "About",

  description:
    "Learn about JohnPaul Ozoigbo, his journey in data analytics, biomedical and health sciences research, dentistry and digital innovation through Manus Dei Solutions.",

  keywords: [
    "JohnPaul Ozoigbo",
    "About JohnPaul Ozoigbo",
    "Manus Dei Solutions",
    "Data Analyst",
    "Biomedical Researcher",
    "Health Sciences Research",
    "Dental Student",
    "Digital Innovation",
    "Nigeria",
  ],

  openGraph: {
    title: "About JohnPaul Ozoigbo",

    description:
      "Learn about JohnPaul Ozoigbo and his work across data analytics, biomedical research, dentistry and digital innovation.",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "About JohnPaul Ozoigbo",

    description:
      "Learn about JohnPaul Ozoigbo and his work across data analytics, biomedical research, dentistry and digital innovation.",
  },
};

export default function AboutPage() {
  return (
    <PageHeader
      title="About JohnPaul"
      description="Learn more about my journey in data analytics, medical research and digital innovation."
    />
  );
}