export interface Research {
  id: number;

  slug: string;

  year: string;

  title: string;

  field: string;

  type: string;

  authors: string;

  featured: boolean;

  abstract?: string;

  keywords?: string[];

  pdf?: string;

  doi?: string;
}