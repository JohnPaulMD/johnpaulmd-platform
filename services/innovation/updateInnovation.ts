import {
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { InnovationData } from "@/components/admin/InnovationEditor";

export async function updateInnovation(
  id: string,
  innovation: InnovationData
) {
  await updateDoc(
    doc(
      db,
      "innovations",
      id
    ),
    {
      ...innovation,

      updatedAt:
        serverTimestamp(),
    }
  );
}