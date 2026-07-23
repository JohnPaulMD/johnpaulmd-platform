export interface Innovation {
  id: number;

  slug: string;

  name: string;

  tagline: string;

  description: string;

  image: string;

  status: string;

  version: string;

  releaseDate: string;

  platform: string[];

  playStore: string;

  appStore: string;

  website: string;

  github: string;

  featured: boolean;
}