import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { DashboardData } from "@/components/admin/DashboardEditor";

export interface FeaturedDashboard
  extends DashboardData {
  id: string;
}

export default async function getFeaturedDashboards(): Promise<
  FeaturedDashboard[]
> {
  try {
    const dashboardsRef = collection(
      db,
      "dashboards"
    );

    const featuredQuery = query(
      dashboardsRef,
      where("status", "==", "Published"),
      where("featured", "==", true)
    );

    const snapshot = await getDocs(
      featuredQuery
    );

    return snapshot.docs.map(
      (document) => ({
        id: document.id,
        ...(document.data() as DashboardData),
      })
    );
  } catch (error) {
    console.error(
      "Error loading featured dashboards:",
      error
    );

    throw error;
  }
}