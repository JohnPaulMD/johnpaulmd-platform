export interface Review {
  id: number;

  clientName: string;

  review: string;

  rating: number;

  reviewDate: string;

  approved: boolean;

  featured: boolean;
}