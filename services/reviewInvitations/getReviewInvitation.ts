import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface ReviewInvitation {
  id: string;

  token: string;

  clientName: string;
  clientEmail: string;

  status: string;

  used: boolean;
}

export async function getReviewInvitation(
  token: string
): Promise<ReviewInvitation | null> {
  if (!token.trim()) {
    return null;
  }

  const invitationQuery = query(
    collection(
      db,
      "reviewInvitations"
    ),

    where(
      "token",
      "==",
      token
    ),

    limit(1)
  );

  const snapshot =
    await getDocs(
      invitationQuery
    );

  if (snapshot.empty) {
    return null;
  }

  const document =
    snapshot.docs[0];

  const data =
    document.data();

  return {
    id: document.id,

    token:
      data.token || "",

    clientName:
      data.clientName || "",

    clientEmail:
      data.clientEmail || "",

    status:
      data.status || "Active",

    used:
      Boolean(data.used),
  };
}