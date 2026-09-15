import { CompanyService } from "@/services/CompanyService";
import { CoreServicesService } from "@/services/CoreServicesService";
import HeroSection from "@/components/sections/HeroSection";
import OverviewSection from "@/components/sections/OverviewSection";
import MissionVisionSection from "@/components/sections/MissionVisionSection";
import CoreServicesSection from "@/components/sections/CoreServicesSection";
import CapabilitiesSafetySection from "@/components/sections/CapabilitiesSafetySection";
import ProjectsLeadershipSection from "@/components/sections/ProjectsLeadershipSection";
import ContactSection from "@/components/sections/ContactSection";

export default async function HomePage() {
  const companyService = CompanyService.getInstance();

  const [overview, missionVision, { capabilities, safety }, { projects, leadership }, coreServices] =
    await Promise.all([
      companyService.getCompanyOverview(),
      companyService.getMissionVision(),
      companyService.getCapabilitiesAndSafety(),
      companyService.getProjectsAndLeadership(),
      CoreServicesService.getInstance().getCoreServices(),
    ]);

  return (
    <div className="bg-brand-dark text-white min-h-screen font-sans">
      <HeroSection overview={overview} />
      <OverviewSection overview={overview} />
      <MissionVisionSection missionVision={missionVision} />
      <CoreServicesSection services={coreServices} />
      <CapabilitiesSafetySection capabilities={capabilities} safety={safety} />
      <ProjectsLeadershipSection projects={projects} leadership={leadership} />
      <ContactSection overview={overview} />
    </div>
  );
}