export interface JobFilter {
  id?: string;
  title?: string;
  description?: string;
  dateCreated?: string | Date;
  numberCandidate?: number;
  isActive?: boolean;
  isRegistered?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  details?: JobDetail;
}

export interface JobFilterResponse {
  data: JobFilter[];
  pagination?;
}

export interface JobDetail {
  job?: [
    {
      id?: string;
      title?: string;
      description?: string;
      dateCreated?: string | Date;
      numberCandidate?: number;
      isActive?: boolean;
      isRegistered?: string;
      createdAt?: string | Date;
      updatedAt?: string | Date;
    },
  ];
  corporation?: [
    {
      id?: string;
      name?: string;
      hotline?: string;
      email?: string;
      presenterId?: string;
      overtimeRequire?: string;
      special?: string;
      startWorkTime?: string | Date;
      endWorkTime?: string | Date;
      origin?: string;
      numberEmployees: number;
      slug: string;
      isActive: string;
      isRegistered: string;
      createdAt: string;
      updatedAt: string;
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
    },
  ];
  skill?: [
    {
      id?: string;
      name?: string;
      level?: string;
      position?: string;
      slug?: string;
      isActive?: string;
      isRegistered?: string;
      createdAt?: string;
      updatedAt?: string;
    },
  ];
  location?: [
    {
      id?: string;
      country?: string;
      city?: string;
      district?: string;
      ward?: string;
      street?: string;
      details?: string;
      slug?: string;
      isActive?: string;
      isRegistered?: string;
      createdAt?: string;
      updatedAt?: string;
    },
  ];
  salary?: [
    {
      id?: string;
      gt?: number;
      lt?: number;
      unit?: string;
      isActive?: boolean;
      isRegistered?: boolean;
      createdAt?: string;
      updatedAt?: string;
    },
  ];
}
