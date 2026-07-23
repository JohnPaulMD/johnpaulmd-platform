import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { DashboardData } from "@/components/admin/DashboardEditor";

export default async function createDashboard(
  dashboard: DashboardData
): Promise<string> {
  try {
    const docRef = await addDoc(
      collection(db, "dashboards"),
      {
        title: dashboard.title,
        slug: dashboard.slug,
        category: dashboard.category,
        software: dashboard.software,

        description: dashboard.description,
        overview: dashboard.overview,

        objectives: dashboard.objectives,
        insights: dashboard.insights,

        technologies: dashboard.technologies,

        image: dashboard.image,

        platform: dashboard.platform,
        liveUrl: dashboard.liveUrl,
        embedUrl: dashboard.embedUrl,
        githubUrl: dashboard.githubUrl,
        websiteUrl: dashboard.websiteUrl,

        featured: dashboard.featured,
        status: dashboard.status,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
    );

    return docRef.id;
  } catch (error) {
    console.error(
      "Error creating dashboard:",
      error
    );

    throw error;
  }
}