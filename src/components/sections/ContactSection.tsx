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

        <Reveal>
          <div className="w-full max-w-lg mb-8 bg-brand-dark/50 border border-brand-cyan/20 rounded-lg p-6 text-left">
            <h3 className="text-xl font-bold text-brand-cyan uppercase mb-3">
              Contact Person
            </h3>
            <p className="text-white font-semibold text-lg">Shakeel</p>
            <p className="text-gray-400 text-sm mb-4">Managing Director</p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+966562929365"
                className="text-gray-300 hover:text-brand-cyan transition-colors text-sm"
              >
                +966 56 292 9365
              </a>
              <a
                href="tel:+966570215834"
                className="text-gray-300 hover:text-brand-cyan transition-colors text-sm"
              >
                +966 57 021 5834
              </a>
            </div>
          </div>
        </Reveal>

        <ContactForm />
      </div>
    </section>
  );
}