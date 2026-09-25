import {
  CompanyOverview,
  MissionVision,
  OperationalCapability,
} from "@/types";

const CONTENT_SERVICE_URL = process.env.CONTENT_SERVICE_URL;

async function fetchApi<T>(path: string, fallback: T): Promise<T> {
  if (!CONTENT_SERVICE_URL) return fallback;
  try {
    const res = await fetch(`${CONTENT_SERVICE_URL}${path}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return (await res.json()) as T;
  } catch {
    // Content service unreachable — degrade gracefully to the local profile.
  }
  return fallback;
}

export class CompanyService {
  private static instance: CompanyService;

  private constructor() {}

  public static getInstance(): CompanyService {
    if (!CompanyService.instance) {
      CompanyService.instance = new CompanyService();
    }
    return CompanyService.instance;
  }

  async getCompanyOverview(): Promise<CompanyOverview> {
    return fetchApi("/overview", {
      name: "Markstone Trading Service",
      tagline: "Company Profile",
      established: 2025,
      location: "Dammam, Kingdom of Saudi Arabia",
      description:
        "Markstone Trading Service is a forward-looking company delivering reliable solutions in trading, logistics, and manpower services. Established in 2025, we are committed to quality, integrity, and long-term partnerships that create value.",
    });
  }

  async getMissionVision(): Promise<MissionVision> {
    return fetchApi("/mission-vision", {
      mission:
        "Deliver reliable solutions in trading, logistics, and manpower services that create lasting value for our partners and communities.",
      vision:
        "To be a trusted leader, recognized for excellence, integrity, and sustainable growth across the region.",
    });
  }

  async getCapabilitiesAndSafety(): Promise<{
    capabilities: OperationalCapability;
    safety: OperationalCapability;
  }> {
    return fetchApi("/capabilities-safety", {
      capabilities: {
        title: "OPERATIONAL STRENGTH",
        items: [
          "MODERN FLEET AND EQUIPMENT",
          "SKILLED AND RELIABLE MANPOWER",
          "ADVANCED TECHNOLOGY AND SYSTEMS",
          "EFFICIENT PROCESSES AND TIMELY EXECUTION",
        ],
      },
      safety: {
        title: "SAFETY AND QUALITY COMMITMENT",
        items: [
          "STRONG SAFETY POLICIES AND PRACTICES",
          "ADHERENCE TO QUALITY STANDARDS",
          "COMPLIANCE AND CERTIFICATION FOCUS",
          "CONTINUOUS IMPROVEMENT CULTURE",
        ],
      },
    });
  }

  async getProjectsAndLeadership(): Promise<{
    projects: string[];
    leadership: string[];
  }> {
    return fetchApi("/projects-leadership", {
      projects: [
        "Supplying critical materials to industrial and construction sectors",
        "End-to-end logistics solutions across the Kingdom",
        "Workforce supply for large-scale operational projects",
        "Long-term partnerships built on reliability and performance",
      ],
      leadership: [
        "Experienced leaders with deep industry and regional expertise",
        "Strong track record in trading, logistics, and manpower services",
        "Committed to integrity, quality, and long-term value",
        "Focused on people, partnerships, and performance",
      ],
    });
  }
}