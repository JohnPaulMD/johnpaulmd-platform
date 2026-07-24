import {
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export async function markReviewInvitationUsed(
  invitationId: string,
  reviewId: string
) {
  await updateDoc(
    doc(
      db,
      "reviewInvitations",
      invitationId
    ),
    {
      used: true,

      status: "Used",

      usedAt:
        serverTimestamp(),

      reviewId,
    }
  );
}