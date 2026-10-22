import React from "react";
import Link from "next/link";
import { Phone, ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { env } from "@/lib/env";

export function ContactCTA() {
  const rawWhatsApp = env.business.whatsapp || "01220792948";
  const cleanWhatsApp = rawWhatsApp.replace(/[^0-9]/g, "");
  const formattedWhatsApp = cleanWhatsApp.startsWith("0") ? `2${cleanWhatsApp}` : cleanWhatsApp;
  const whatsappUrl = `https://wa.me/${formattedWhatsApp}?text=${encodeURIComponent(
    "السلام عليكم ورحمة الله، أود الحصول على استشارة فنية لاختيار الموتور أو الطلمبة المناسبة لأرضي من شركة لبيب كمال."
  )}`;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] p-8 sm:p-14 text-white shadow-xl my-12 text-start border border-emerald-800/40">
      <div className="relative z-10 max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-brand-gold-400" />
          <span>استشارات فنية ومواصفات هندسية دقيقة</span>
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug">
          هل تحتاج إلى مشورة لاختيار الموتور أو الطلمبة الزراعية المناسبة لأرضك؟
        </h2>
        <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
          فريق شركة لبيب كمال في الزقازيق جاهز لتزويدك بكافة المواصفات والقدرات الفنية وتحديد أنسب الحلول لنظام الري والزراعة الخاص بك بدون أي تكلفة استشارية.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da851] px-6 py-4 text-sm sm:text-base font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="h-5 w-5" />
            <span>مراسلة واتساب فورية ({rawWhatsApp})</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-gold-600 hover:bg-brand-gold-500 active:bg-brand-gold-700 px-6 py-4 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="h-5 w-5" />
            <span>طلب تواصل ومواصفات</span>
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-semibold text-white hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm"
          >
            <span>استعراض الكتالوج</span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Subtle decorative background circle */}
      <div className="absolute -end-16 -bottom-16 w-80 h-80 rounded-full bg-brand-green-700/20 pointer-events-none blur-3xl" />
    </section>
  );
}
