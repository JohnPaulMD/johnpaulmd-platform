import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { InnovationData } from "@/components/admin/InnovationEditor";

export async function createInnovation(
  innovation: InnovationData
) {
  const docRef =
    await addDoc(
      collection(
        db,
        "innovations"
      ),
      {
        ...innovation,

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp(),
      }
    );

  return docRef.id;
}