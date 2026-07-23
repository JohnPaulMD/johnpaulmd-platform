import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type {
  GeneralSettings,
} from "./getGeneralSettings";

export async function saveGeneralSettings(
  settings: GeneralSettings
) {
  await setDoc(
    doc(db, "siteSettings", "general"),
    {
      ...settings,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );
}