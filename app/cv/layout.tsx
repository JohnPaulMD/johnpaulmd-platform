import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",

  description:
    "View the professional curriculum vitae of JohnPaul Ozoigbo, covering education, research, data analytics, academic experience, technical expertise and professional development.",

  keywords: [
    "JohnPaul Ozoigbo CV",
    "JohnPaul Ozoigbo Curriculum Vitae",
    "JohnPaul Ozoigbo",
    "Manus Dei Solutions",
    "Data Analyst",
    "Researcher",
    "Biomedical Research",
    "Health Sciences",
    "Dental Student",
    "Data Analytics",
  ],

  openGraph: {
    title: "CV | JohnPaul Ozoigbo",

    description:
      "View the professional curriculum vitae of JohnPaul Ozoigbo, including education, research, data analytics and technical expertise.",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "CV | JohnPaul Ozoigbo",

    description:
      "View the professional curriculum vitae of JohnPaul Ozoigbo, including education, research, data analytics and technical expertise.",
  },
};

export default function CVLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}