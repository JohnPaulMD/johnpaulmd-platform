import type { Metadata } from "next";

import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import ResearchDetailClient from "./ResearchDetailClient";

interface ResearchMetadataRecord {
  title: string;
  shortDescription: string;
  abstract: string;
  category: string;
  status: string;
  authors: string[];
  keywords: string[];
  year: string;
  image: string;
}

interface ResearchPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ================================= */
/* GET PUBLISHED RESEARCH BY SLUG */
/* ================================= */

async function getResearchMetadataBySlug(
  slug: string
): Promise<ResearchMetadataRecord | null> {
  try {
    const researchQuery =
      query(
        collection(
          db,
          "research"
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
        researchQuery
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

      abstract:
        data.abstract || "",

      category:
        data.category ||
        "Research",

      status:
        data.status || "",

      authors:
        Array.isArray(
          data.authors
        )
          ? data.authors
          : [],

      keywords:
        Array.isArray(
          data.keywords
        )
          ? data.keywords
          : [],

      year:
        data.year || "",

      image:
        data.image || "",
    };
  } catch (error) {
    console.error(
      "Failed to load research metadata:",
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
}: ResearchPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const research =
    await getResearchMetadataBySlug(
      slug
    );

  if (!research) {
    return {
      title:
        "Research Project",

      description:
        "Explore research projects by JohnPaul Ozoigbo.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    research.shortDescription ||
    research.abstract ||
    "Explore this research project by JohnPaul Ozoigbo.";

  const keywords = [
    research.category,
    research.status,
    research.year,
    ...research.keywords,
    "Research",
    "Medical Research",
    "Biomedical Research",
    "JohnPaul Ozoigbo",
    "Manus Dei Solutions",
  ].filter(
    (keyword): keyword is string =>
      Boolean(keyword)
  );

  return {
    title:
      research.title,

    description,

    alternates: {
      canonical: `/research/${slug}`,
    },

    keywords,

    authors:
      research.authors.length > 0
        ? research.authors.map(
            (author) => ({
              name: author,
            })
          )
        : [
            {
              name:
                "JohnPaul Ozoigbo",
            },
          ],

    openGraph: {
      title:
        research.title,

      description,

      type: "article",

      url:
        `/research/${slug}`,

      images:
        research.image
          ? [
              {
                url:
                  research.image,

                alt:
                  research.title,
              },
            ]
          : undefined,
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        research.title,

      description,

      images:
        research.image
          ? [
              research.image,
            ]
          : undefined,
    },
  };
}

/* ================================= */
/* PAGE */
/* ================================= */

export default async function ResearchDetailPage({
  params,
}: ResearchPageProps) {
  const { slug } =
    await params;

  return (
    <ResearchDetailClient
      slug={slug}
    />
  );
}