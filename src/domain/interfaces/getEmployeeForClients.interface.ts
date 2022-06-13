export interface EmployeeFilter {
  id?: string;
  studentId?: string;
  cvId?: string;
  jobId?: string;
  isApproved?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  jobDetail?: EmployeeDetail;
  cvDetail?: ResumeFilter[];
}

export interface EmployeeFilterResponse {
  data: EmployeeFilter[];
  pagination?;
}
export interface ResumeFilter {
  id?: string;
  studentName?: string;
  position?: string;
  content?: string;
  slug?: string;
  isActive: boolean;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
  images?: Array<{
    id: string;
    ownerId: string;
    url: string;
  }>;
  details?: ResumeDetail;
}

export interface ResumeDetail {
  contact?: Array<{
    id: string;
    title: string;
    content: number;
    isActive: boolean;
    isRegistered: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  certificated?: Array<{
    id: string;
    name: string;
    issueDate: Date | string;
    organizer: string;
    isActive: boolean;
    isRegistered: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  skill?: Array<{
    id: string;
    name: string;
    rating: number;
    slug: string;
    isActive: boolean;
    isRegistered: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  project?: Array<{
    id: string;
    projectName: string;
    startDate: Date | string;
    endDate: Date | string;
    teamSize: number;
    role: string;
    responsibilities: string;
    sourceLink: string;
    description: string;
    technology?: Array<{
      id: string;
      title: string;
      content: number;
      isActive: boolean;
      isRegistered: boolean;
      createdAt: string;
      updatedAt: string;
    }>;
    isActive: boolean;
    isRegistered: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
}

export interface EmployeeDetail {
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
