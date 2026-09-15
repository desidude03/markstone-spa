"use client";

import { motion, type Variants } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={revealVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function RevealGroup({ children, className }: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: RevealProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}