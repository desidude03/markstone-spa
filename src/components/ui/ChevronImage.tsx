import Image from "next/image";

interface ChevronImageProps {
  src: string;
  alt: string;
  direction?: "left" | "right";
  className?: string;
}

export default function ChevronImage({
  src,
  alt,
  direction = "left",
  className = "",
}: ChevronImageProps) {
  const clipClass =
    direction === "left" ? "clip-chevron-left" : "clip-chevron-right";

  return (
    <div className={`relative overflow-hidden ${clipClass} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-navy scale-105" />
      <div className={`relative w-full h-full p-2 ${clipClass}`}>
        <div className="relative w-full h-full overflow-hidden animate-slow-zoom">
          <Image src={src} alt={alt} fill sizes="100%" className="object-cover" priority />
        </div>
      </div>
    </div>
  );
}