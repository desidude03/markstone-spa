"use client";

import { motion } from "framer-motion";
import ChevronImage from "@/components/ui/ChevronImage";
import Reveal, { EASE } from "@/components/ui/Reveal";
import type { CompanyOverview } from "@/types";

interface OverviewSectionProps {
  overview: CompanyOverview;
}

export default function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <section
      id="overview"
      className="py-20 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto"
    >
      <div>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-brand-cyan pl-4 uppercase">
            Company Overview
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 text-gray-300 leading-relaxed text-lg">
            {overview.description}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-6 font-semibold text-brand-cyan">
            Based in {overview.location}
          </div>
        </Reveal>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="h-[320px] w-full"
      >
        <ChevronImage
          src="/images/overview.png"
          alt="Company Overview"
          direction="right"
          className="w-full h-full"
        />
      </motion.div>
    </section>
  );
}