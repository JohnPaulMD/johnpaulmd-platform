import { Innovation } from "@/types/innovation";

const innovationData: Innovation[] = [
  {
    id: 1,

    slug: "medlearn-ai",

    name: "MedLearn AI",

    tagline: "Your AI Medical Learning Companion",

    description:
      "An AI-powered platform that helps medical students study smarter through intelligent explanations, quizzes and revision tools.",

    image: "/innovation/medlearn-ai.png",

    status: "In Development",

    version: "v1.0",

    releaseDate: "Coming Soon",

    platform: ["Android"],

    playStore: "",

    appStore: "",

    website: "",

    github: "",

    featured: true,
  },

  {
    id: 2,

    slug: "anatomy-atlas",

    name: "Anatomy Atlas",

    tagline: "Interactive Human Anatomy",

    description:
      "A digital anatomy atlas designed for healthcare students with illustrations, labels and self-assessment tools.",

    image: "/innovation/anatomy-atlas.png",

    status: "Coming Soon",

    version: "-",

    releaseDate: "-",

    platform: ["Android"],

    playStore: "",

    appStore: "",

    website: "",

    github: "",

    featured: true,
  },
];

export default innovationData;