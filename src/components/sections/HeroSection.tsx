"use client";

import { motion } from "framer-motion";
import ChevronImage from "@/components/ui/ChevronImage";
import Counter from "@/components/ui/Counter";
import { EASE } from "@/components/ui/Reveal";
import type { CompanyOverview } from "@/types";

interface HeroSectionProps {
  overview: CompanyOverview;
}

export default function HeroSection({ overview }: HeroSectionProps) {

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden p-6 md:p-16 pt-24 md:pt-28 border-b border-brand-blue/30"
    >
      <div className="absolute inset-0 bg-grid-lines" />
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-brand-blue/20 blur-3xl animate-drift" />
      <div className="absolute -bottom-40 -right-24 w-[520px] h-[520px] rounded-full bg-brand-cyan/10 blur-3xl animate-drift-slow" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-brand-blue/25 blur-2xl animate-drift" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          className="bg-brand-navy/60 p-6 rounded-lg border border-brand-cyan/20 backdrop-blur"
        >
          <p className="text-lg text-gray-200 uppercase tracking-wider font-semibold">
            {overview.location}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-brand-blue/30 border border-brand-cyan px-4 py-2 rounded">
            <span className="text-sm text-gray-300">ESTABLISHED </span>
            <Counter
              value={overview.established}
              className="text-xl font-bold text-brand-cyan"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
          className="h-[300px] md:h-[350px] w-full"
        >
          <ChevronImage
            src="/images/hero-ship.png"
            alt="Trading & Maritime Logistics"
            direction="left"
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  );
}