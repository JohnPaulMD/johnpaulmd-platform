import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface HomepageSettings {
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  description: string;
  expertise: string[];
  profileImage: string;
}

const DEFAULT_SETTINGS: HomepageSettings = {
  heroTitle1:
    "Turning Data into Decisions.",

  heroTitle2:
    "Advancing Research.",

  heroTitle3:
    "Building Intelligent Solutions.",

  description:
    "Helping researchers, healthcare professionals, businesses and organizations transform complex data into evidence-based decisions through analytics, scientific research and digital innovation.",

  expertise: [
    "Data Analytics",
    "Medical Research",
    "Digital Innovation",
  ],

  profileImage:
    "/profile/johnpaul.png",
};

export async function getHomepageSettings(): Promise<HomepageSettings> {
  try {
    const snapshot = await getDoc(
      doc(
        db,
        "siteSettings",
        "homepage"
      )
    );

    if (!snapshot.exists()) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...(snapshot.data() as Partial<HomepageSettings>),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}