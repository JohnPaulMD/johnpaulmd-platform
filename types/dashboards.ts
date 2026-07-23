export interface Dashboard {
  id: number;
  slug: string;

  title: string;

  category: string;

  software: string;

  description: string;

  image: string;

  featured: boolean;

  technologies: string[];

  projectOverview: string;

  objectives: string[];

  keyInsights: string[];

  liveUrl?: string;

  githubUrl?: string;

  embedUrl?: string;
}