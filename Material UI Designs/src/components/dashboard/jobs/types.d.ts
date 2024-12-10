export interface Job {
  id: string;
  title: string;
  currency: string;
  budgetMin: number;
  budgetMax: number;
  isRemote?: boolean;
  city?: string;
  state?: string;
  country?: string;
  publishedAt: Date;
}

export interface Member {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  skills?: string[];
}

export interface Review {
  id: string;
  title: string;
  comment?: string;
  rating: number;
  author: { name: string; avatar?: string };
  createdAt: Date;
}

export interface Asset {
  id: string;
  mimeType: string;
  name: string;
  size: string;
  url: string;
}
