export interface CorporationFilter {
  id?: string;
  email?: string;
  name?: string;
  hotline?: number;
  presenterId?: string;
  overtimeRequire?: string;
  special?: string;
  startWorkTime?: Date | string;
  endWorkTime?: Date | string;
  origin?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  isActive?: string;
  isRegistered?: string;
  slug?: string;
  location?: Array<{
    id: string;
    country: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    details: string;
    slug: string;
    isActive: string;
    isRegistered: string;
    createdAt: string;
    updatedAt: string;
  }>;
  review?: Array<{
    id: string;
    comment: string;
    rating: number;
    isActive: boolean;
    isRegistered: boolean;
    createdAt: string;
    updatedAt: string;
    subreview?: Array<{
      id: string;
      content: string;
      reviewId: string;
      rating: number;
      isActive: boolean;
      isRegistered: boolean;
      createdAt?: string;
      updatedAt?: string;
    }>;
  }>;
  images?: Array<{
    id: string;
    ownerId: string;
    url: string;
  }>;
}
export interface CorporationFilterResponse {
  data: CorporationFilter[];
  pagination?;
}
