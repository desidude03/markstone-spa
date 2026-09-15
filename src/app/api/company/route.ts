import { NextResponse } from "next/server";
import { CompanyService } from "@/services/CompanyService";
import type { CompanyProfile } from "@/types";

export async function GET() {
  const companyService = CompanyService.getInstance();

  const [overview, missionVision, capabilitiesAndSafety, projectsAndLeadership] =
    await Promise.all([
      companyService.getCompanyOverview(),
      companyService.getMissionVision(),
      companyService.getCapabilitiesAndSafety(),
      companyService.getProjectsAndLeadership(),
    ]);

  const profile: CompanyProfile = {
    overview,
    missionVision,
    capabilitiesAndSafety,
    projectsAndLeadership,
  };

  return NextResponse.json(profile);
}