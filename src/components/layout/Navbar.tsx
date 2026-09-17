"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useUiStore } from "@/store/uiStore";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const { menuOpen, activeSection, toggleMenu, closeMenu, setActiveSection } =
    useUiStore();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const ids = siteConfig.nav.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-brand-navy/95 backdrop-blur border-b border-brand-blue/30">
      <nav className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        <Link href="#hero" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt={siteConfig.shortName}
            width={1408}
            height={768}
            priority
            className="h-20 w-auto"
          />
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          className="md:hidden flex flex-col items-end gap-1.5 w-8"
        >
          <span
            className={`block h-0.5 bg-brand-cyan transition-all ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-white transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-brand-cyan transition-all ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>

        <ul className="hidden md:flex items-center gap-6">
          {siteConfig.nav.map((item) => {
            const id = item.href.replace("#", "");
            const active = activeSection === id;
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                    active ? "text-brand-cyan" : "text-gray-300 hover:text-brand-cyan"
                  }`}
                >
                  {item.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <motion.div
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-gradient-to-r from-brand-blue to-brand-cyan"
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-brand-navy border-t border-brand-blue/30 px-6"
          >
            {siteConfig.nav.map((item) => {
              const id = item.href.replace("#", "");
              const active = activeSection === id;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block py-4 text-sm font-medium uppercase tracking-wide border-b border-brand-blue/20 last:border-0 transition-colors ${
                      active ? "text-brand-cyan" : "text-gray-200 hover:text-brand-cyan"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}