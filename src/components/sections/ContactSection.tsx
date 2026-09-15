"use client";

import { Reveal } from "@/components/ui/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import type { CompanyOverview } from "@/types";

interface ContactSectionProps {
  overview: CompanyOverview;
}

export default function ContactSection({ overview }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 px-6 md:px-16 bg-brand-navy/60">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <Reveal>
          <h2 className="text-4xl font-extrabold tracking-wider text-white mb-2">
            CONTACT US
          </h2>
          <p className="text-gray-300 mb-10">{overview.location}</p>
        </Reveal>

        <ContactForm />
      </div>
    </section>
  );
}