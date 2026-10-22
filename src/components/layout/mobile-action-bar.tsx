"use client";

import React from "react";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { env } from "@/lib/env";
import type { BusinessSettings } from "@/types/settings";

interface MobileActionBarProps {
  settings?: Partial<BusinessSettings>;
}

export function MobileActionBar({ settings }: MobileActionBarProps = {}) {
  const phone1 = settings?.phone || env.business.phone || "01220792948";
  const rawWhatsApp = settings?.whatsapp || env.business.whatsapp || "01220792948";
  const cleanWhatsApp = rawWhatsApp.replace(/[^0-9]/g, "");
  const formattedWhatsApp = cleanWhatsApp.startsWith("0") ? `2${cleanWhatsApp}` : cleanWhatsApp;
  const whatsappUrl = `https://wa.me/${formattedWhatsApp}?text=${encodeURIComponent(
    "السلام عليكم، أود الاستفسار عن الآلات والمعدات الزراعية لدى شركة لبيب كمال."
  )}`;
  const mapsUrl = settings?.googleMapsUrl || env.business.googleMapsUrl || "https://maps.app.goo.gl/fjJacxeJPcMBw7rU8";

  return (
    <nav
      aria-label="أزرار التواصل السريع للموبايل"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-neutral-200 px-3 py-2.5 shadow-2xl"
    >
      <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
        {/* 1. Phone Call */}
        <a
          href={`tel:${phone1}`}
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-emerald-50 text-emerald-950 border border-emerald-200/80 hover:bg-emerald-100 active:scale-90 transition-all shadow-2xs cursor-pointer btn-touch"
        >
          <Phone className="h-5 w-5 mb-1 text-emerald-700" />
          <span className="text-xs font-bold">اتصال هاتفي</span>
        </a>

        {/* 2. WhatsApp Direct (High Accent) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-[#25D366] text-white hover:bg-[#20ba59] active:scale-90 active:bg-[#1da851] shadow-md transition-all cursor-pointer btn-touch"
        >
          <MessageCircle className="h-5 w-5 mb-1" />
          <span className="text-xs font-black">شات واتساب</span>
        </a>

        {/* 3. Google Maps */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-amber-50 text-amber-950 border border-amber-200/80 hover:bg-amber-100 active:scale-90 transition-all shadow-2xs cursor-pointer btn-touch"
        >
          <MapPin className="h-5 w-5 mb-1 text-amber-700" />
          <span className="text-xs font-bold">الموقع بالخريطة</span>
        </a>
      </div>
    </nav>
  );
}
