import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboards",

  description:
    "Explore interactive data analytics dashboards and visualization projects by JohnPaul Ozoigbo, featuring business intelligence, data analysis and practical data-driven insights.",

  keywords: [
    "JohnPaul Ozoigbo dashboards",
    "Data Analytics Dashboards",
    "Interactive Dashboards",
    "Data Visualization",
    "Business Intelligence",
    "Data Analysis",
    "Dashboard Development",
    "Manus Dei Solutions",
  ],

  openGraph: {
    title: "Dashboards | JohnPaul Ozoigbo",

    description:
      "Explore interactive data analytics, visualization and business intelligence dashboard projects by JohnPaul Ozoigbo.",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Dashboards | JohnPaul Ozoigbo",

    description:
      "Explore interactive data analytics, visualization and business intelligence dashboard projects by JohnPaul Ozoigbo.",
  },
};

export default function DashboardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}