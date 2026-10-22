"use client";

import React, { useState } from "react";
import { MapPin, Navigation, ExternalLink, Phone, Check, Copy, Share2 } from "lucide-react";
import { env } from "@/lib/env";

interface StoreLocationMapProps {
  className?: string;
  showDetails?: boolean;
}

export function StoreLocationMap({ className = "", showDetails = true }: StoreLocationMapProps) {
  const [copied, setCopied] = useState(false);

  // Exact coordinates extracted directly from the verified store pin
  const latitude = 30.5672317;
  const longitude = 31.5233545;
  const placeName = "شركة لبيب كمال لبيب للأدوات والآلات الزراعية";
  const addressArabic = "طريق مصر الزراعي، قرية الجديدة، مركز منيا القمح، محافظة الشرقية";
  const directMapsUrl = env.business.googleMapsUrl || "https://maps.app.goo.gl/fjJacxeJPcMBw7rU8";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  // Google Maps Embed URL with exact coordinates pin
  const embedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=ar&z=16&output=embed`;

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${latitude}, ${longitude}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: placeName,
        text: `موقع ${placeName} على خرائط جوجل:`,
        url: directMapsUrl,
      }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(`موقع ${placeName}:\n${directMapsUrl}`)}`, '_blank');
    }
  };

  return (
    <div className={`overflow-hidden rounded-3xl border border-brand-neutral-200 bg-white shadow-lg ${className}`}>
      {/* Header Info Banner */}
      <div className="bg-brand-green-950 p-6 text-white text-start">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold-500/20 px-3 py-1 text-xs font-bold text-brand-gold-300 border border-brand-gold-500/30">
              <MapPin className="h-3.5 w-3.5 text-brand-gold-400" />
              <span>موقعنا الرسمي المعتمد على الخريطة</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">{placeName}</h3>
            <p className="text-sm text-brand-neutral-300 flex items-center gap-1.5">
              <span>{addressArabic}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={directMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-gold-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-brand-neutral-950 hover:bg-brand-gold-400 transition-colors shadow-sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>فتح تطبيق الخرائط</span>
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors"
            >
              <Navigation className="h-4 w-4 text-emerald-400" />
              <span>الاتجاهات والمسار</span>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Map Iframe */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-brand-neutral-100 min-h-[320px]">
        <iframe
          title="موقع شركة لبيب كمال لبيب على خرائط جوجل"
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Quick Action Overlay */}
        <div className="absolute top-4 start-4 z-10 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border border-brand-neutral-200 text-xs font-semibold text-brand-neutral-800">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>المحل مفتوح وجاهز لاستقبالكم</span>
        </div>
      </div>

      {/* Details & Actions Footer */}
      {showDetails && (
        <div className="p-6 bg-brand-neutral-50/70 border-t border-brand-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-start text-xs sm:text-sm">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-brand-neutral-200">
              <div className="h-8 w-8 rounded-xl bg-brand-green-100 text-brand-green-800 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-brand-neutral-900">العنوان بالتفصيل:</p>
                <p className="text-brand-neutral-600 mt-0.5 leading-relaxed">
                  طريق مصر الزراعي، الجديدة، مركز منيا القمح، الشرقية (على الطريق الزراعي مباشرة)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-brand-neutral-200">
              <div className="h-8 w-8 rounded-xl bg-brand-gold-100 text-brand-gold-800 flex items-center justify-center shrink-0">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-brand-neutral-900">أرقام التواصل:</p>
                <p className="text-brand-neutral-700 mt-0.5" dir="ltr">
                  01220792948 / 01114587917
                </p>
                <p className="text-[11px] text-brand-neutral-500 mt-0.5">متاحون للرد وتحديد المسار هاتفياً</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-brand-neutral-200">
              <div className="space-y-0.5">
                <p className="font-bold text-brand-neutral-900">الإحداثيات الجغرافية:</p>
                <p className="text-brand-neutral-500 text-xs font-mono" dir="ltr">
                  {latitude.toFixed(5)}, {longitude.toFixed(5)}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={copyCoordinates}
                  className="p-2 rounded-xl border border-brand-neutral-200 hover:bg-brand-neutral-100 text-brand-neutral-700 transition-colors"
                  title="نسخ الإحداثيات"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={shareLocation}
                  className="p-2 rounded-xl border border-brand-neutral-200 hover:bg-brand-neutral-100 text-brand-neutral-700 transition-colors"
                  title="مشاركة الموقع"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
