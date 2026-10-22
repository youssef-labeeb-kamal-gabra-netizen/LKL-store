"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Tractor,
  SprayCan,
  Waves,
  Cpu,
  Pipette,
  Wrench,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { env } from "@/lib/env";
import { INITIAL_PRODUCTS } from "@/data/catalog";
import { Product } from "@/types/product";

interface AdvisorProps {
  className?: string;
  defaultOpenModal?: boolean;
}

export function InteractiveEquipmentAdvisor({ className = "" }: AdvisorProps) {
  const [step, setStep] = useState<number>(1);
  const [need, setNeed] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  const rawWhatsApp = env.business.whatsapp || "01220792948";
  const cleanWhatsApp = rawWhatsApp.replace(/[^0-9]/g, "");
  const formattedWhatsApp = cleanWhatsApp.startsWith("0") ? `2${cleanWhatsApp}` : cleanWhatsApp;

  const handleNeedSelect = (value: string) => {
    setNeed(value);
    setStep(2);
  };

  const handleAreaSelect = (value: string) => {
    setArea(value);
    setStep(3);
  };

  const handleFuelSelect = (value: string) => {
    setFuel(value);
    calculateRecommendation(need, area, value);
    setStep(4);
  };

  const calculateRecommendation = (selNeed: string, selArea: string, selFuel: string) => {
    // Intelligent matching rule
    if (selNeed === "spray") {
      setRecommendedProduct(
        INITIAL_PRODUCTS.find((p) => p.id === "prod-1") || INITIAL_PRODUCTS[0]
      );
    } else if (selNeed === "water-pump") {
      if (selFuel === "diesel" || selArea === "large") {
        setRecommendedProduct(
          INITIAL_PRODUCTS.find((p) => p.id === "prod-3") || INITIAL_PRODUCTS[2]
        );
      } else {
        setRecommendedProduct(
          INITIAL_PRODUCTS.find((p) => p.id === "prod-2") || INITIAL_PRODUCTS[1]
        );
      }
    } else if (selNeed === "diesel") {
      setRecommendedProduct(
        INITIAL_PRODUCTS.find((p) => p.id === "prod-3") || INITIAL_PRODUCTS[2]
      );
    } else if (selNeed === "irrigation") {
      setRecommendedProduct(
        INITIAL_PRODUCTS.find((p) => p.id === "prod-4") || INITIAL_PRODUCTS[3]
      );
    } else if (selNeed === "tiller") {
      setRecommendedProduct(
        INITIAL_PRODUCTS.find((p) => p.id === "prod-5") || INITIAL_PRODUCTS[4]
      );
    } else {
      setRecommendedProduct(
        INITIAL_PRODUCTS.find((p) => p.id === "prod-6") || INITIAL_PRODUCTS[5]
      );
    }
  };

  const resetAdvisor = () => {
    setStep(1);
    setNeed("");
    setArea("");
    setFuel("");
    setRecommendedProduct(null);
  };

  const getWhatsAppMessage = () => {
    if (!recommendedProduct) return "";
    const text = `السلام عليكم ورحمة الله، استخدمت مستشار المعدات التفاعلي على موقع شركة لبيب كمال لبيب:
• الاحتياج: ${getNeedLabel(need)}
• المساحة: ${getAreaLabel(area)}
• نوع التشغيل المفضل: ${getFuelLabel(fuel)}
المعدة المقترحة: ${recommendedProduct.name} (${recommendedProduct.model || ""})
أود الاستفسار عن توفرها وأفضل خيارات الاستلام والدعم الفني.`;
    return encodeURIComponent(text);
  };

  const getNeedLabel = (val: string) => {
    switch (val) {
      case "spray":
        return "رش ومكافحة آفات زراعية";
      case "water-pump":
        return "سحب ورفع مياه ري للحقل";
      case "diesel":
        return "محرك ديزل شاق لإدارة الطلمبات";
      case "irrigation":
        return "شبكات وفلاتر ري حديث";
      case "tiller":
        return "عزاقة وخدمة وتقليب التربة";
      default:
        return "قطع غيار وصيانة";
    }
  };

  const getAreaLabel = (val: string) => {
    switch (val) {
      case "small":
        return "أرض صغيرة أو حديقة (أقل من فدان)";
      case "medium":
        return "مساحة متوسطة (من 1 إلى 5 أفدنة)";
      case "large":
        return "مزارع واسعة (أكثر من 5 أفدنة)";
      default:
        return "تشغيل ميداني متنوع";
    }
  };

  const getFuelLabel = (val: string) => {
    switch (val) {
      case "petrol":
        return "بنزين (خفيف وسهل الحركة)";
      case "diesel":
        return "ديزل / سولار (خدمة شاقة وعزم عالي)";
      default:
        return "أي نوع مناسب";
    }
  };

  return (
    <div
      className={`rounded-3xl border border-brand-neutral-200 bg-white p-6 sm:p-10 shadow-xs relative overflow-hidden text-start ${className}`}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-brand-neutral-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-green-50 text-brand-green-800 border border-brand-green-200 px-3 py-1 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold-600" />
            <span>نظام التفاعل المباشر الذكي</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-brand-neutral-900">
            مستشار اختيار المعدة الزراعية المناسبة
          </h3>
          <p className="text-xs sm:text-sm text-brand-neutral-600">
            أجب على 3 أسئلة بسيطة، ليقترح عليك النظام المعدة الأفضل لطبيعة عملك ومساحة أرضك
          </p>
        </div>

        {step > 1 && (
          <button
            type="button"
            onClick={resetAdvisor}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-neutral-300 text-xs font-bold text-brand-neutral-700 hover:bg-brand-neutral-100 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 text-brand-neutral-500" />
            <span>البدء من جديد</span>
          </button>
        )}
      </div>

      {/* Step Progress Indicator */}
      <div className="flex items-center gap-2 py-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              step >= i ? "bg-brand-green-700" : "bg-brand-neutral-200"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Core Need */}
      {step === 1 && (
        <div className="space-y-5 py-2">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-brand-green-800">الخطوة 1 من 3</span>
            <h4 className="text-lg font-bold text-brand-neutral-900">
              ما هي العملية أو المهمة الزراعية التي تريد إنجازها؟
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                id: "water-pump",
                title: "سحب ورفع مياه الري",
                desc: "طلمبات ري الحقول والترع والآبار",
                icon: Waves,
              },
              {
                id: "spray",
                title: "رش المحاصيل ومكافحة الآفات",
                desc: "مواتير رش ظهر ومجموعات ضغط عالي",
                icon: SprayCan,
              },
              {
                id: "diesel",
                title: "محرك ديزل شاق للخدمة المستمرة",
                desc: "محركات بتر Petter لإدارة الطلمبات والمعدات",
                icon: Cpu,
              },
              {
                id: "tiller",
                title: "خدمة وتقليب وتجهيز الأرض",
                desc: "عزاقات وآلات الحراثة المدمجة",
                icon: Tractor,
              },
              {
                id: "irrigation",
                title: "شبكات وفلاتر ري حديث",
                desc: "فلاتر ديسك ومستلزمات ري بالتنقيط",
                icon: Pipette,
              },
              {
                id: "parts",
                title: "قطع غيار وصيانة محركات",
                desc: "بساتم، شنابر، خراطيم، وطلمبات غيار",
                icon: Wrench,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNeedSelect(item.id)}
                  className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border border-brand-neutral-200 bg-brand-neutral-50/60 hover:bg-white hover:border-brand-green-600/60 hover:shadow-md active:scale-[0.98] active:bg-brand-green-50/20 transition-all duration-200 group text-start cursor-pointer"
                >
                  <div className="p-3 rounded-2xl bg-brand-green-50 text-brand-green-800 group-hover:bg-brand-green-800 group-hover:text-white transition-colors duration-200 shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-neutral-900 group-hover:text-brand-green-800 transition-colors text-sm sm:text-base">
                      {item.title}
                    </h5>
                    <p className="text-xs text-brand-neutral-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Area / Usage Scale */}
      {step === 2 && (
        <div className="space-y-5 py-2">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-brand-green-800">الخطوة 2 من 3</span>
            <h4 className="text-lg font-bold text-brand-neutral-900">
              ما هي مساحة الأرض أو حجم العمل الميداني المتوقع؟
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: "small",
                title: "مساحة صغيرة (حتى فدان واحد)",
                desc: "حدائق منزلية، مزارع صغيرة، استخدام متقطع خفيف",
              },
              {
                id: "medium",
                title: "مساحة متوسطة (من 1 إلى 5 أفدنة)",
                desc: "الحقول التقليدية، زراعات الخضار والموالح العائلية",
              },
              {
                id: "large",
                title: "مزارع واسعة (أكثر من 5 أفدنة)",
                desc: "مشاريع زراعية واسعة، ري مستمر لعدة ساعات يومياً",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleAreaSelect(item.id)}
                className="p-5 rounded-2xl border border-brand-neutral-200 bg-brand-neutral-50/60 hover:bg-white hover:border-brand-green-600/60 hover:shadow-md active:scale-[0.98] transition-all duration-200 text-start group cursor-pointer"
              >
                <div className="h-5 w-5 rounded-full border-2 border-brand-neutral-300 group-hover:border-brand-green-700 transition-colors mb-3" />
                <h5 className="font-bold text-brand-neutral-900 text-sm sm:text-base group-hover:text-brand-green-800">
                  {item.title}
                </h5>
                <p className="text-xs text-brand-neutral-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-neutral-600 hover:text-brand-neutral-900 active:scale-95 transition-all pt-2"
          >
            <ArrowRight className="h-4 w-4" />
            <span>الرجوع للخطوة السابقة</span>
          </button>
        </div>
      )}

      {/* Step 3: Engine Type / Mobility Preference */}
      {step === 3 && (
        <div className="space-y-5 py-2">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-brand-green-800">الخطوة 3 من 3</span>
            <h4 className="text-lg font-bold text-brand-neutral-900">
              ما هو نوع المحرك أو أسلوب الحركة الذي تفضله؟
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: "petrol",
                title: "بنزين (خفيف الوزن وسهل النقل)",
                desc: "تشغيل سريع وسهل، ممتاز للتنقل بين الأراضي والمواقع المختلفة بدون مجهود.",
              },
              {
                id: "diesel",
                title: "ديزل / سولار (عزم هائل واقتصادي)",
                desc: "شديد التحمل، مصمم ليعمل طوال اليوم بأقل تكلفة استهلاك وقود وصيانة طويلة الأمد.",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleFuelSelect(item.id)}
                className="p-5 rounded-2xl border border-brand-neutral-200 bg-brand-neutral-50/60 hover:bg-white hover:border-brand-green-600/60 hover:shadow-md active:scale-[0.98] transition-all duration-200 text-start group cursor-pointer"
              >
                <div className="h-5 w-5 rounded-full border-2 border-brand-neutral-300 group-hover:border-brand-green-700 transition-colors mb-3" />
                <h5 className="font-bold text-brand-neutral-900 text-sm sm:text-base group-hover:text-brand-green-800">
                  {item.title}
                </h5>
                <p className="text-xs text-brand-neutral-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-neutral-600 hover:text-brand-neutral-900 active:scale-95 transition-all pt-2"
          >
            <ArrowRight className="h-4 w-4" />
            <span>الرجوع للخطوة السابقة</span>
          </button>
        </div>
      )}

      {/* Step 4: Final Recommendation & Instant Action */}
      {step === 4 && recommendedProduct && (
        <div className="space-y-6 py-2 animate-fadeIn">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 px-3.5 py-1 text-xs font-extrabold">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>بناءً على اختياراتك — إليك المعدة الأنسب لاحتياجك الميداني:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-brand-neutral-50/50 p-6 rounded-3xl border border-brand-neutral-200 shadow-xs items-center">
            {/* Product Image */}
            <div className="md:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-brand-neutral-200">
              <Image
                src={recommendedProduct.images[0]}
                alt={recommendedProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <span className="absolute top-3 end-3 rounded-full bg-brand-gold-600 text-white font-bold text-[11px] px-2.5 py-1 shadow-sm">
                ترشيح مثالي
              </span>
            </div>

            {/* Product Details */}
            <div className="md:col-span-7 space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-brand-green-800">
                  {recommendedProduct.categoryName} • كود: {recommendedProduct.model || "LKL"}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-brand-neutral-900 leading-snug">
                  {recommendedProduct.name}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                {recommendedProduct.description}
              </p>

              {/* Specs Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {recommendedProduct.specifications.slice(0, 4).map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-brand-neutral-200/80 text-xs"
                  >
                    <span className="text-brand-neutral-500 block text-[10px]">{spec.label}</span>
                    <span className="font-bold text-brand-neutral-900 leading-snug">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-3">
                <a
                  href={`https://wa.me/${formattedWhatsApp}?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da851] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md active:scale-95 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>تأكيد الحجز والاستفسار عبر واتساب</span>
                </a>

                <Link
                  href={`/products/${recommendedProduct.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-neutral-300 hover:bg-white active:bg-brand-neutral-100 active:scale-95 px-4 py-3 text-xs sm:text-sm font-bold text-brand-neutral-800 transition-all"
                >
                  <span>عرض التفاصيل الكاملة</span>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
