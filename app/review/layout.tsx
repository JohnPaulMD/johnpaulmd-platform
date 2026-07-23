import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews",

  description:
    "Share your experience working with JohnPaul Ozoigbo and Manus Dei Solutions on research, data analytics, academic consulting and digital projects.",

  alternates: {
    canonical: "/review",
  },

  openGraph: {
    title:
      "Client Reviews | JohnPaul Ozoigbo",

    description:
      "Share your experience working with JohnPaul Ozoigbo and Manus Dei Solutions.",

    url: "/review",

    type: "website",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Client Reviews | JohnPaul Ozoigbo",

    description:
      "Share your experience working with JohnPaul Ozoigbo and Manus Dei Solutions.",
  },
};

export default function ReviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}