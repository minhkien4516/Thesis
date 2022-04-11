export interface CorporationFilter {
  id?: string;
  email?: string;
  name?: string;
  hotline?: number;
  presenterId?: string;
  overtimeRequire?: string;
  special?: string;
  startWorkTime?: string;
  endWorkTime?: string;
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
