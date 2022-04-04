export interface JobFilter {
  id?: string;
  title?: string;
  description?: string;
  dateCreated?: string | Date;
  numberCandidate?: number;
  isActive?: boolean;
  isRegistered?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  details?: JobDetail;
}

export interface JobFilterResponse {
  data: JobFilter[];
  pagination?;
}

export interface JobDetail {
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
}
