import type { Metadata } from "next";

import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedDashboards from "@/components/home/FeaturedDashboards";
import FeaturedResearch from "@/components/home/FeaturedResearch";
import ClientReviews from "@/components/home/ClientReviews";

export const metadata: Metadata = {
  title: "Data Analyst, Researcher & Dental Student",

  description:
    "Official portfolio of JohnPaul Ozoigbo, featuring data analytics dashboards, biomedical and health sciences research, innovation projects and professional services through Manus Dei Solutions.",

  keywords: [
    "JohnPaul Ozoigbo",
    "Manus Dei Solutions",
    "Data Analyst Nigeria",
    "Data Analytics",
    "Biomedical Research",
    "Health Sciences Research",
    "Researcher Nigeria",
    "Interactive Dashboards",
    "Data Visualization",
    "Dental Student",
  ],

  openGraph: {
    title:
      "JohnPaul Ozoigbo | Data Analyst, Researcher & Dental Student",

    description:
      "Explore data analytics dashboards, biomedical research, innovation projects and professional work by JohnPaul Ozoigbo.",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "JohnPaul Ozoigbo | Data Analyst, Researcher & Dental Student",

    description:
      "Explore data analytics dashboards, biomedical research, innovation projects and professional work by JohnPaul Ozoigbo.",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />

      <ServicesSection />

      <FeaturedDashboards />

      <FeaturedResearch />

      <ClientReviews />
    </>
  );
}