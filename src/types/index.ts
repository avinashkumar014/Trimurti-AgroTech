export interface Part {
  id: string;
  name: string;
  category: string;
  brand: string;
  modelCompatibility: string[];
  description: string;
  price: string;
  availability: 'In Stock' | 'Out of Stock' | 'Contact for Price';
  images: string[];
  specifications: { label: string; value: string }[];
}

export interface PartCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Vehicle {
  id: string;
  vehicleType: 'Tractor' | 'Agricultural Vehicle' | 'Commercial Vehicle' | 'Other';
  brand: string;
  model: string;
  year: number;
  hours: number;
  condition: 'Excellent' | 'Good' | 'Fair';
  engineCondition: string;
  tyreCondition: string;
  price: number;
  location: string;
  description: string;
  images: string[];
  status: 'Available' | 'Sold' | 'Reserved';
  specifications: { label: string; value: string }[];
}

export interface Enquiry {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  type: 'Part' | 'Vehicle' | 'General' | 'Sell Request';
  product?: string;
  message: string;
  created_at?: string;
  status?: string;
}

export interface SellRequest {
  id?: string;
  name: string;
  phone: string;
  vehicleType: string;
  brand: string;
  model: string;
  year: string;
  hours: string;
  expectedPrice: string;
  location: string;
  condition: string;
  message: string;
  created_at?: string;
  status?: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  image: string;
  caption: string;
}
