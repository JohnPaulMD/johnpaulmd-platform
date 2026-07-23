import {
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { DashboardData } from "@/components/admin/DashboardEditor";

export default async function updateDashboard(
  id: string,
  dashboard: DashboardData
): Promise<void> {
  const dashboardRef = doc(
    db,
    "dashboards",
    id
  );

  await updateDoc(dashboardRef, {
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

    updatedAt: serverTimestamp(),
  });
}