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
