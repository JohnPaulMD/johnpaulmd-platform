import type { Metadata } from "next";

import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import DashboardDetailClient from "./DashboardDetailClient";

interface DashboardMetadataRecord {
  title: string;
  description: string;
  overview: string;
  image: string;
  category: string;
  software: string;
  technologies: string[];
}

interface DashboardPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ================================= */
/* GET PUBLISHED DASHBOARD BY SLUG */
/* ================================= */

async function getDashboardMetadataBySlug(
  slug: string
): Promise<DashboardMetadataRecord | null> {
  try {
    const dashboardQuery =
      query(
        collection(
          db,
          "dashboards"
        ),

        where(
          "slug",
          "==",
          slug
        ),

        where(
          "publishStatus",
          "==",
          "Published"
        ),

        limit(1)
      );

    const snapshot =
      await getDocs(
        dashboardQuery
      );

    if (snapshot.empty) {
      return null;
    }

    const data =
      snapshot.docs[0].data();

    return {
      title:
        data.title || "",

      description:
        data.description || "",

      overview:
        data.overview || "",

      image:
        data.image || "",

      category:
        data.category || "",

      software:
        data.software || "",

      technologies:
        Array.isArray(
          data.technologies
        )
          ? data.technologies
          : [],
    };
  } catch (error) {
    console.error(
      "Failed to load dashboard metadata:",
      error
    );

    return null;
  }
}

/* ================================= */
/* DYNAMIC SEO */
/* ================================= */

export async function generateMetadata({
  params,
}: DashboardPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const dashboard =
    await getDashboardMetadataBySlug(
      slug
    );

  if (!dashboard) {
    return {
      title:
        "Dashboard Project",

      description:
        "Explore data analytics and visualization projects by JohnPaul Ozoigbo.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    dashboard.description ||
    dashboard.overview ||
    "Explore this data analytics dashboard project by JohnPaul Ozoigbo.";

  const keywords = [
    dashboard.category,
    dashboard.software,
    ...dashboard.technologies,
    "Data Analytics",
    "Data Visualization",
    "Interactive Dashboard",
    "Business Intelligence",
    "JohnPaul Ozoigbo",
    "Manus Dei Solutions",
  ].filter(
    (keyword): keyword is string =>
      Boolean(keyword)
  );

  return {
    title:
      dashboard.title,

    description,

    alternates: {
      canonical:
        `/dashboards/${slug}`,
    },

    keywords,

    openGraph: {
      title:
        dashboard.title,

      description,

      type: "website",

      url:
        `/dashboards/${slug}`,

      images:
        dashboard.image
          ? [
              {
                url:
                  dashboard.image,

                alt:
                  dashboard.title,
              },
            ]
          : undefined,
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        dashboard.title,

      description,

      images:
        dashboard.image
          ? [
              dashboard.image,
            ]
          : undefined,
    },
  };
}

/* ================================= */
/* PAGE */
/* ================================= */

export default async function DashboardDetailsPage({
  params,
}: DashboardPageProps) {
  const { slug } =
    await params;

  return (
    <DashboardDetailClient
      slug={slug}
    />
  );
}