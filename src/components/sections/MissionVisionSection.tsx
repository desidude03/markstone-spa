"use client";

import { motion } from "framer-motion";
import ChevronImage from "@/components/ui/ChevronImage";
import Reveal, { EASE } from "@/components/ui/Reveal";
import type { MissionVision } from "@/types";

interface MissionVisionSectionProps {
  missionVision: MissionVision;
}

export default function MissionVisionSection({
  missionVision,
}: MissionVisionSectionProps) {
  return (
    <section
      id="mission-vision"
      className="py-20 px-6 md:px-16 bg-brand-navy/40 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, x: 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="h-[320px] w-full order-2 md:order-1"
      >
        <ChevronImage
          src="/images/warehouse-forklift.png"
          alt="Warehouse Operations"
          direction="left"
          className="w-full h-full"
        />
      </motion.div>
      <div className="order-1 md:order-2 space-y-8">
        <Reveal>
          <h2 className="text-3xl font-bold text-brand-cyan uppercase">
            Our Mission
          </h2>
          <p className="mt-3 text-gray-200 text-lg leading-relaxed">
            {missionVision.mission}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="text-3xl font-bold text-brand-cyan uppercase">
            Our Vision
          </h2>
          <p className="mt-3 text-gray-200 text-lg leading-relaxed">
            {missionVision.vision}
          </p>
        </Reveal>
      </div>
    </section>
  );
}