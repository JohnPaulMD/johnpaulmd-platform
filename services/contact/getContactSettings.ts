import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ContactSettings {
  title: string;
  subtitle: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  twitter: string;
  address: string;
  businessHours: string;
}

const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  title: "Contact Manus Dei Solutions",
  subtitle: "Let's build something amazing together.",
  email: "",
  whatsapp: "",
  linkedin: "",
  github: "",
  twitter: "",
  address: "",
  businessHours: "",
};

export async function getContactSettings(): Promise<ContactSettings> {
  try {
    const docRef = doc(db, "siteSettings", "contact");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return DEFAULT_CONTACT_SETTINGS;
    }

    return {
      ...DEFAULT_CONTACT_SETTINGS,
      ...(docSnap.data() as Partial<ContactSettings>),
    };
  } catch (error) {
    console.error("Error fetching contact settings:", error);
    return DEFAULT_CONTACT_SETTINGS;
  }
}