"use client";

import ServiceCard from "@/components/ui/ServiceCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import type { CoreServiceItem } from "@/types";

interface CoreServicesSectionProps {
  services: CoreServiceItem[];
}

export default function CoreServicesSection({
  services,
}: CoreServicesSectionProps) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-brand-blue pl-4 uppercase mb-12">
          Our Core Services
        </h2>
      </Reveal>
      <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <RevealItem key={service.id}>
            <ServiceCard service={service} />
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal delay={0.2}>
        <div className="mt-10 text-center text-sm text-gray-400 uppercase tracking-widest">
          {siteConfig.location}
        </div>
      </Reveal>
    </section>
  );
}