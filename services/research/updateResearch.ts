import {
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { ResearchData } from "@/components/admin/ResearchEditor";

export async function updateResearch(
  id: string,
  research: ResearchData
) {
  try {
    const researchRef = doc(
      db,
      "research",
      id
    );

    await updateDoc(researchRef, {
      ...research,

      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(
      "Error updating research:",
      error
    );

    throw error;
  }
}