import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { DashboardData } from "@/components/admin/DashboardEditor";

export interface DashboardRecord extends DashboardData {
  id: string;

  createdAt?: Timestamp;

  updatedAt?: Timestamp;
}

export default async function getDashboards(): Promise<
  DashboardRecord[]
> {
  const dashboardsRef = collection(
    db,
    "dashboards"
  );

  const dashboardsQuery = query(
    dashboardsRef,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(
    dashboardsQuery
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,

    ...(doc.data() as DashboardData),
  }));
}