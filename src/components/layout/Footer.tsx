import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-brand-navy/60 border-t border-brand-blue/30 px-6 md:px-8 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <Image
            src="/images/logo.png"
            alt={siteConfig.shortName}
            width={1408}
            height={768}
            className="h-16 w-auto"
          />
        </div>

        <ul className="grid grid-cols-2 gap-2">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-gray-300 hover:text-brand-cyan transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="text-sm text-gray-300 md:text-right">
          <p>{siteConfig.location}</p>
          <p className="mt-1">Established {siteConfig.established}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-brand-blue/20 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Markstone Trading Service. All rights reserved.
      </div>
    </footer>
  );
}