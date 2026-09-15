"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface CounterProps {
  value: number;
  className?: string;
  duration?: number;
}

export default function Counter({
  value,
  className,
  duration = 1.8,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}