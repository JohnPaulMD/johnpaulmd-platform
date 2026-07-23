import type { MetadataRoute } from "next";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://johnpaulozoigbo.com";

interface SitemapRecord {
  slug?: string;
  updatedAt?: unknown;
}

/* ================================= */
/* GET PUBLISHED SLUGS */
/* ================================= */

async function getPublishedSlugs(
  collectionName: string
): Promise<string[]> {
  try {
    const publishedQuery =
      query(
        collection(
          db,
          collectionName
        ),

        where(
          "publishStatus",
          "==",
          "Published"
        )
      );

    const snapshot =
      await getDocs(
        publishedQuery
      );

    return snapshot.docs
      .map((document) => {
        const data =
          document.data() as SitemapRecord;

        return data.slug || "";
      })
      .filter(
        (slug): slug is string =>
          Boolean(slug)
      );
  } catch (error) {
    console.error(
      `Failed to load ${collectionName} for sitemap:`,
      error
    );

    return [];
  }
}

/* ================================= */
/* GENERATE SITEMAP */
/* ================================= */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    researchSlugs,
    dashboardSlugs,
    innovationSlugs,
  ] =
    await Promise.all([
      getPublishedSlugs(
        "research"
      ),

      getPublishedSlugs(
        "dashboards"
      ),

      getPublishedSlugs(
        "innovations"
      ),
    ]);

  /* ================================= */
  /* STATIC PUBLIC PAGES */
  /* ================================= */

  const staticPages: MetadataRoute.Sitemap =
    [
      {
        url: siteUrl,
        changeFrequency:
          "weekly",
        priority: 1,
      },

      {
        url: `${siteUrl}/about`,
        changeFrequency:
          "monthly",
        priority: 0.8,
      },

      {
        url: `${siteUrl}/research`,
        changeFrequency:
          "weekly",
        priority: 0.9,
      },

      {
        url: `${siteUrl}/dashboards`,
        changeFrequency:
          "weekly",
        priority: 0.9,
      },

      {
        url: `${siteUrl}/innovation`,
        changeFrequency:
          "weekly",
        priority: 0.9,
      },

      {
        url: `${siteUrl}/cv`,
        changeFrequency:
          "monthly",
        priority: 0.8,
      },

      {
        url: `${siteUrl}/contact`,
        changeFrequency:
          "monthly",
        priority: 0.7,
      },

      {
        url: `${siteUrl}/review`,
        changeFrequency:
          "monthly",
        priority: 0.6,
      },
    ];

  /* ================================= */
  /* RESEARCH PAGES */
  /* ================================= */

  const researchPages: MetadataRoute.Sitemap =
    researchSlugs.map(
      (slug) => ({
        url: `${siteUrl}/research/${encodeURIComponent(
          slug
        )}`,

        changeFrequency:
          "monthly",

        priority: 0.8,
      })
    );

  /* ================================= */
  /* DASHBOARD PAGES */
  /* ================================= */

  const dashboardPages: MetadataRoute.Sitemap =
    dashboardSlugs.map(
      (slug) => ({
        url: `${siteUrl}/dashboards/${encodeURIComponent(
          slug
        )}`,

        changeFrequency:
          "monthly",

        priority: 0.8,
      })
    );

  /* ================================= */
  /* INNOVATION PAGES */
  /* ================================= */

  const innovationPages: MetadataRoute.Sitemap =
    innovationSlugs.map(
      (slug) => ({
        url: `${siteUrl}/innovation/${encodeURIComponent(
          slug
        )}`,

        changeFrequency:
          "monthly",

        priority: 0.8,
      })
    );

  return [
    ...staticPages,
    ...researchPages,
    ...dashboardPages,
    ...innovationPages,
  ];
}