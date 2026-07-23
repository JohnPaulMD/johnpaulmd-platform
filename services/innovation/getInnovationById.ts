import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { InnovationData } from "@/components/admin/InnovationEditor";

export interface InnovationDocument
  extends InnovationData {
  id: string;
}

export async function getInnovationById(
  id: string
): Promise<InnovationDocument | null> {
  try {
    const innovationRef = doc(
      db,
      "innovations",
      id
    );

    const snapshot =
      await getDoc(innovationRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...(snapshot.data() as InnovationData),
    };
  } catch (error) {
    console.error(
      "Error getting innovation:",
      error
    );

    throw error;
  }
}