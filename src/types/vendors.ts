export type VendorCategory = 
  | 'TCG Cards'
  | 'Sports Cards' 
  | 'Gaming Accessories'
  | 'Collectibles'
  | 'Art & Prints'
  | 'Apparel'
  | 'Food & Beverages';

export interface VendorContact {
  email?: string;
  phone?: string;
  website?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  category: VendorCategory;
  boothNumber: string;
  location: string;
  contact: VendorContact;
  specialties: string[];
  featured: boolean;
  logo?: string;
  image?: string;
}