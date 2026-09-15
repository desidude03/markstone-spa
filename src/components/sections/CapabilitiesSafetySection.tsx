"use client";

import { motion } from "framer-motion";
import { Reveal, staggerContainer, itemVariants } from "@/components/ui/Reveal";
import type { OperationalCapability } from "@/types";

interface CapabilitiesSafetySectionProps {
  capabilities: OperationalCapability;
  safety: OperationalCapability;
}

export default function CapabilitiesSafetySection({
  capabilities,
  safety,
}: CapabilitiesSafetySectionProps) {
  return (
    <section
      id="capabilities"
      className="py-20 px-6 md:px-16 bg-brand-navy/30 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Reveal>
          <div className="bg-brand-dark/80 p-8 rounded border border-brand-blue/30">
            <h2 className="text-2xl font-bold text-brand-cyan mb-6">
              {capabilities.title}
            </h2>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4"
            >
              {capabilities.items.map((item, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-center text-gray-200 font-medium"
                >
                  <span className="w-2 h-2 bg-brand-cyan rounded-full mr-3 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="bg-brand-dark/80 p-8 rounded border border-brand-blue/30">
            <h2 className="text-2xl font-bold text-brand-cyan mb-6">
              {safety.title}
            </h2>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4"
            >
              {safety.items.map((item, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-center text-gray-200 font-medium"
                >
                  <span className="w-2 h-2 bg-brand-blue rounded-full mr-3 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}