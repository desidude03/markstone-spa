export interface CompanyOverview {
  name: string;
  tagline: string;
  established: number;
  location: string;
  description: string;
}

export interface MissionVision {
  mission: string;
  vision: string;
}

export type ServiceCategory = "trading" | "logistics" | "manpower" | "equipment";

export interface CoreServiceItem {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
}

export interface OperationalCapability {
  title: string;
  items: string[];
}

export interface LeadershipMember {
  role: string;
  highlights: string[];
}

export interface InquiryDTO {
  fullName: string;
  email: string;
  phone: string;
  serviceCategory: string;
  message: string;
}

export interface InquiryResult {
  success: boolean;
  id: string;
}

export interface CompanyProfile {
  overview: CompanyOverview;
  missionVision: MissionVision;
  capabilitiesAndSafety: {
    capabilities: OperationalCapability;
    safety: OperationalCapability;
  };
  projectsAndLeadership: {
    projects: string[];
    leadership: string[];
  };
}