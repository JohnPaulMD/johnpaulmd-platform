import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { DashboardData } from "@/components/admin/DashboardEditor";

export interface PublishedDashboard
  extends DashboardData {
  id: string;
}

export default async function getPublishedDashboards(): Promise<
  PublishedDashboard[]
> {
  const dashboardsRef = collection(
    db,
    "dashboards"
  );

  const dashboardsQuery = query(
    dashboardsRef,
    where("status", "==", "Published")
  );

  const snapshot = await getDocs(
    dashboardsQuery
  );

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as DashboardData),
  }));
}