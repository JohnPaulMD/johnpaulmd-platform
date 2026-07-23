import {
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default async function deleteDashboard(
  id: string
): Promise<void> {
  try {
    const dashboardRef = doc(
      db,
      "dashboards",
      id
    );

    await deleteDoc(dashboardRef);
  } catch (error) {
    console.error(
      "Error deleting dashboard:",
      error
    );

    throw error;
  }
}