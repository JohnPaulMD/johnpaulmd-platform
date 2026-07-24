import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface CreateReviewInvitationData {
  clientName: string;
  clientEmail?: string;
}

export async function createReviewInvitation(
  data: CreateReviewInvitationData
) {
  const token = crypto.randomUUID();

  const documentReference =
    await addDoc(
      collection(
        db,
        "reviewInvitations"
      ),
      {
        token,

        clientName:
          data.clientName.trim(),

        clientEmail:
          data.clientEmail?.trim() ||
          "",

        status: "Active",

        used: false,

        createdAt:
          serverTimestamp(),

        usedAt: null,

        reviewId: null,
      }
    );

  return {
    id: documentReference.id,
    token,
  };
}