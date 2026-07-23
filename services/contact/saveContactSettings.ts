import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ContactSettings } from "./getContactSettings";

export async function saveContactSettings(
  settings: ContactSettings
): Promise<void> {
  const docRef = doc(db, "siteSettings", "contact");

  await setDoc(
    docRef,
    {
      ...settings,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}