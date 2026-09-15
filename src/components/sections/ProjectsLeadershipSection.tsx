"use client";

import { motion } from "framer-motion";
import ChevronImage from "@/components/ui/ChevronImage";
import { Reveal, staggerContainer, itemVariants, EASE } from "@/components/ui/Reveal";

interface ProjectsLeadershipSectionProps {
  projects: string[];
  leadership: string[];
}

export default function ProjectsLeadershipSection({
  projects,
  leadership,
}: ProjectsLeadershipSectionProps) {
  return (
    <section
      id="leadership"
      className="py-20 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto"
    >
      <div>
        <Reveal>
          <h2 className="text-2xl font-bold text-brand-cyan mb-4">
            REPRESENTATIVE PROJECTS
          </h2>
        </Reveal>
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-3 mb-8"
        >
          {projects.map((p, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="text-gray-300 border-l-2 border-brand-blue pl-3"
            >
              {p}
            </motion.li>
          ))}
        </motion.ul>

        <Reveal>
          <h2 className="text-2xl font-bold text-brand-cyan mb-4">
            LEADERSHIP TEAM
          </h2>
        </Reveal>
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-3"
        >
          {leadership.map((l, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="text-gray-300 border-l-2 border-brand-cyan pl-3"
            >
              {l}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="h-[350px] w-full"
      >
        <ChevronImage
          src="/images/port-crane.png"
          alt="Port Operations"
          direction="right"
          className="w-full h-full"
        />
      </motion.div>
    </section>
  );
}