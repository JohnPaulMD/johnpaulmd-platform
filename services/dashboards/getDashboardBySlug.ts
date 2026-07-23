import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { DashboardData } from "@/components/admin/DashboardEditor";

export interface PublicDashboard
  extends DashboardData {
  id: string;
}

export default async function getDashboardBySlug(
  slug: string
): Promise<PublicDashboard | null> {
  try {
    const dashboardsRef = collection(
      db,
      "dashboards"
    );

    const dashboardQuery = query(
      dashboardsRef,
      where("slug", "==", slug),
      where("status", "==", "Published"),
      limit(1)
    );

    const snapshot = await getDocs(
      dashboardQuery
    );

    if (snapshot.empty) {
      return null;
    }

    const document = snapshot.docs[0];

    return {
      id: document.id,
      ...(document.data() as DashboardData),
    };
  } catch (error) {
    console.error(
      "Error loading dashboard by slug:",
      error
    );

    throw error;
  }
}