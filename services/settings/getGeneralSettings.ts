import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface GeneralSettings {
  fullName: string;
  brandName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  twitter: string;
}

const DEFAULT_SETTINGS: GeneralSettings = {
  fullName: "JohnPaul Ozoigbo",
  brandName: "Manus Dei Solutions",
  professionalTitle:
    "Data Analyst • Dental Student • Researcher",
  email: "",
  phone: "",
  address: "",
  linkedin: "",
  github: "",
  twitter: "",
};

export async function getGeneralSettings(): Promise<GeneralSettings> {
  try {
    const ref = doc(db, "siteSettings", "general");

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...(snapshot.data() as Partial<GeneralSettings>),
    };
  } catch (error) {
    console.error(error);

    return DEFAULT_SETTINGS;
  }
}