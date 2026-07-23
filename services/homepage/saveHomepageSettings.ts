import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type {
  HomepageSettings,
} from "./getHomepageSettings";

export async function saveHomepageSettings(
  settings: HomepageSettings
) {
  await setDoc(
    doc(
      db,
      "siteSettings",
      "homepage"
    ),
    {
      ...settings,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );
}