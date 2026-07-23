import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import SiteShell from "@/components/layout/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://johnpaulozoigbo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "JohnPaul Ozoigbo | Data Analyst, Dental Student & Researcher",

    template:
      "%s | JohnPaul Ozoigbo",
  },

  description:
    "Official portfolio of JohnPaul Ozoigbo, a data analyst, dental student, researcher and founder of Manus Dei Solutions. Explore research, data analytics dashboards, innovation projects and professional work.",

  applicationName:
    "JohnPaul Ozoigbo",

  authors: [
    {
      name:
        "JohnPaul Ozoigbo",
    },
  ],

  creator:
    "JohnPaul Ozoigbo",

  publisher:
    "JohnPaul Ozoigbo",

  keywords: [
    "JohnPaul Ozoigbo",
    "JohnPaul Ozoigbo Data Analyst",
    "JohnPaul Ozoigbo Researcher",
    "JohnPaul Ozoigbo Dental Student",
    "Manus Dei Solutions",
    "Data Analyst Nigeria",
    "Data Analytics",
    "Data Visualization",
    "Medical Research",
    "Biomedical Research",
    "Dental Research",
    "Researcher Nigeria",
  ],

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview":
        "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",

    url: siteUrl,

    siteName:
      "JohnPaul Ozoigbo",

    title:
      "JohnPaul Ozoigbo | Data Analyst, Dental Student & Researcher",

    description:
      "Explore the professional portfolio, research, data analytics dashboards and innovation projects of JohnPaul Ozoigbo.",

    locale:
      "en_NG",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "JohnPaul Ozoigbo | Data Analyst, Dental Student & Researcher",

    description:
      "Explore research, data analytics dashboards, innovation projects and professional work by JohnPaul Ozoigbo.",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#071A3D] text-white">

        <SiteShell>
          {children}
        </SiteShell>

      </body>
    </html>
  );
}