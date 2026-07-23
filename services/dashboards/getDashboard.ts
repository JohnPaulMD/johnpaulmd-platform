import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { DashboardData } from "@/components/admin/DashboardEditor";

export interface DashboardRecord
  extends DashboardData {
  id: string;
}

export default async function getDashboard(
  id: string
): Promise<DashboardRecord | null> {
  const dashboardRef = doc(
    db,
    "dashboards",
    id
  );

  const snapshot = await getDoc(
    dashboardRef
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as DashboardData),
  };
}