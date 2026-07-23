import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { ResearchData } from "@/components/admin/ResearchEditor";

export async function createResearch(
  research: ResearchData
) {
  try {
    const docRef = await addDoc(
      collection(db, "research"),
      {
        ...research,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
    );

    return docRef.id;
  } catch (error) {
    console.error(
      "Error creating research:",
      error
    );

    throw error;
  }
}