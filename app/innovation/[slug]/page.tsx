import type { Metadata } from "next";

import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import InnovationDetailClient from "./InnovationDetailClient";

interface InnovationMetadataRecord {
  title: string;
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  category: string;
  status: string;
  technologies: string[];
  image: string;
}

interface InnovationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ================================= */
/* GET PUBLISHED INNOVATION BY SLUG */
/* ================================= */

async function getInnovationMetadataBySlug(
  slug: string
): Promise<InnovationMetadataRecord | null> {
  try {
    const innovationQuery =
      query(
        collection(
          db,
          "innovations"
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
        innovationQuery
      );

    if (snapshot.empty) {
      return null;
    }

    const data =
      snapshot.docs[0].data();

    return {
      title:
        data.title || "",

      shortDescription:
        data.shortDescription ||
        "",

      overview:
        data.overview || "",

      problem:
        data.problem || "",

      solution:
        data.solution || "",

      category:
        data.category ||
        "Innovation",

      status:
        data.status || "",

      technologies:
        Array.isArray(
          data.technologies
        )
          ? data.technologies
          : [],

      image:
        data.image || "",
    };
  } catch (error) {
    console.error(
      "Failed to load innovation metadata:",
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
}: InnovationPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const innovation =
    await getInnovationMetadataBySlug(
      slug
    );

  if (!innovation) {
    return {
      title:
        "Innovation Project",

      description:
        "Explore technology, research and innovation projects by JohnPaul Ozoigbo.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    innovation.shortDescription ||
    innovation.overview ||
    innovation.solution ||
    "Explore this innovation project by JohnPaul Ozoigbo.";

  const keywords = [
    innovation.category,
    innovation.status,
    ...innovation.technologies,
    "Innovation",
    "Technology",
    "Digital Innovation",
    "Research Innovation",
    "JohnPaul Ozoigbo",
    "Manus Dei Solutions",
  ].filter(
    (keyword): keyword is string =>
      Boolean(keyword)
  );

  return {
    title:
      innovation.title,

    description,

    alternates: {
      canonical:
        `/innovation/${slug}`,
    },

    keywords,

    openGraph: {
      title:
        innovation.title,

      description,

      type: "website",

      url:
        `/innovation/${slug}`,

      images:
        innovation.image
          ? [
              {
                url:
                  innovation.image,

                alt:
                  innovation.title,
              },
            ]
          : undefined,
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        innovation.title,

      description,

      images:
        innovation.image
          ? [
              innovation.image,
            ]
          : undefined,
    },
  };
}

/* ================================= */
/* PAGE */
/* ================================= */

export default async function InnovationDetailPage({
  params,
}: InnovationPageProps) {
  const { slug } =
    await params;

  return (
    <InnovationDetailClient
      slug={slug}
    />
  );
}