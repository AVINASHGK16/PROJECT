export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  text: string;
  date: string;
}

export interface Project {
  id: string;
  imageUrl: string;
  caption: string;
  dataAiHint: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  dataAiHint: string;
}

export type DirectoryEntryType = 'Electrician' | 'Plumber' | 'Hardware Store';

export type ServiceProvider = {
  id: string;
  name: string;
  type: DirectoryEntryType;
  avatarUrl: string;
  location: string;
  experience?: number; // in years
  skills?: string[];
  certifications?: string[];
  bio: string;
  projects?: Project[];
  reviews: Review[];
  workingHours: string;
  contact: {
    phone: string;
    email: string;
  };
  rating: number;
  products?: Product[];
};
