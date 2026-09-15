import type { CoreServiceItem } from "@/types";

interface ServiceCardProps {
  service: CoreServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-brand-navy/80 p-6 border-t-2 border-brand-cyan rounded shadow-lg hover:border-brand-blue transition-colors">
      <h3 className="text-xl font-bold text-brand-cyan mb-3">{service.title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
    </div>
  );
}