import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export function BrandLogo({ className = "", size = "md", showText = true }: BrandLogoProps) {
  const sizeMap = {
    sm: "h-9 w-9",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  const textSizes = {
    sm: { title: "text-sm", sub: "text-[10px]" },
    md: { title: "text-lg", sub: "text-xs" },
    lg: { title: "text-xl", sub: "text-xs" },
    xl: { title: "text-2xl", sub: "text-sm" },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Golden Wheat Wreath Emblem */}
      <div
        className={`relative ${sizeMap[size]} shrink-0 rounded-full p-0.5 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-md ring-1 ring-amber-400/40 overflow-hidden bg-brand-green-950`}
      >
        <Image
          src="/images/logo.png"
          alt="شعار شركة لبيب كمال لبيب"
          fill
          className="object-cover scale-110"
          sizes="96px"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col text-start">
          <span
            className={`font-black tracking-tight text-brand-neutral-900 leading-none ${textSizes[size].title}`}
          >
            شركة لبيب كمال لبيب
          </span>
          <span className={`font-bold text-brand-gold-600 mt-1 leading-none ${textSizes[size].sub}`}>
            للأدوات والآلات الزراعية • LKL
          </span>
        </div>
      )}
    </div>
  );
}
