import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductsStore } from "@/lib/products-store";
import { getApprovedReviews } from "@/lib/reviews-store";
import { ProductCard } from "@/components/products/product-card";
import { ContactCTA } from "@/components/common/contact-cta";
import { ReviewsSection } from "@/components/common/reviews-section";
import { FAQSection } from "@/components/common/faq-section";
import { StoreLocationMap } from "@/components/common/store-location-map";
import { InteractiveEquipmentAdvisor } from "@/components/common/interactive-equipment-advisor";
import {
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Phone,
  ArrowLeft,
  Settings,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { env } from "@/lib/env";

export default function HomePage() {
  const products = getProductsStore();
  const featuredProducts = products.filter((p) => p.published && p.featured).slice(0, 4);
  const approvedReviews = getApprovedReviews();

  const phone1 = env.business.phone || "01220792948";
  const phone2 = env.business.secondaryPhone || "01114587917";
  const rawWhatsApp = env.business.whatsapp || "01220792948";
  const cleanWhatsApp = rawWhatsApp.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsApp.startsWith("0") ? `2${cleanWhatsApp}` : cleanWhatsApp}?text=${encodeURIComponent(
    "السلام عليكم، أود الاستفسار عن الآلات والمعدات الزراعية المتوفرة لدى شركة لبيب كمال."
  )}`;

  return (
    <div className="flex flex-col gap-12 sm:gap-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#022c22] via-[#044e39] to-[#022c22] text-white pt-12 sm:pt-20 pb-16 sm:pb-24 text-start">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-brand-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 end-10 w-80 h-80 bg-brand-green-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Experience Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1 text-xs sm:text-sm font-bold text-emerald-200 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-brand-gold-400" />
                <span>تأسسنا كمحل رسمي عام 2005 • خبرة تتجاوز 20 عاماً بالشرقية</span>
              </div>

              {/* Title & Clear Agricultural Tagline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                  شركة لبيب كمال لبيب <br className="hidden sm:inline" />
                  <span className="text-brand-gold-400">للأدوات والآلات الزراعية</span>
                </h1>
                <p className="text-base sm:text-xl text-brand-gold-300 font-bold">
                  طلمبات ديزل وبنزين • مواتير رش وضغط عالي • قطع غيار أصلية
                </p>
              </div>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
                نوفر أحدث ماكينات ومعدات الري والرش لخدمة المزارعين وأصحاب الأراضي في الزقازيق وكافة مراكز محافظة الشرقية ومصر، مع توفير قطع الغيار الأصلية والدعم الفني المباشر.
              </p>

              {/* 3 Huge Touchable Action Buttons (Very Simple for Anyone) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Link href="/products" className="w-full">
                  <button
                    type="button"
                    className="w-full py-4 px-4 rounded-2xl bg-brand-gold-500 hover:bg-brand-gold-600 active:bg-brand-gold-700 text-white font-black text-sm sm:text-base shadow-lg btn-touch flex items-center justify-center gap-2 cursor-pointer border border-brand-gold-400/40"
                  >
                    <span>كتالوج الماكينات</span>
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da851] text-white font-black text-sm sm:text-base shadow-lg btn-touch flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>شات واتساب فوري</span>
                </a>

                <a
                  href={`tel:${phone1}`}
                  className="w-full py-4 px-4 rounded-2xl bg-white/15 hover:bg-white/20 active:bg-white/30 text-white font-bold text-sm sm:text-base border border-white/20 shadow-md btn-touch flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
                >
                  <Phone className="h-4 w-4 text-brand-gold-300" />
                  <span dir="ltr">{phone1}</span>
                </a>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 border-t border-emerald-800/60 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm text-emerald-200/90 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>الجودة • الثقة • الخدمة المتميزة</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>طلمبات بتر ديزل ومواتير أصلية</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>قطع غيار متوفرة وصيانة مستمرة</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card / Official Business Card Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white/[0.08] border border-white/15 p-5 sm:p-6 backdrop-blur-xl shadow-2xl text-center space-y-5 overflow-hidden">
                {/* Official Card Image */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl border border-white/20 group">
                  <Image
                    src="/images/business-card-banner.jpg"
                    alt="كارت شركة لبيب كمال لبيب الرسمي"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    sizes="(max-width: 1024px) 100vw, 450px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 start-3 end-3 flex items-center justify-between text-white text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-amber-300 drop-shadow">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>الكارت الرسمي المعتمد</span>
                    </span>
                    <span className="bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] text-amber-300 font-mono">
                      LABIB KAMAL LABIB
                    </span>
                  </div>
                </div>

                {/* Company Name & Golden Wheat Wreath Logo */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-brand-gold-500 shadow-lg shrink-0 bg-brand-green-950">
                    <Image
                      src="/images/logo.png"
                      alt="لوجو شركة لبيب كمال لبيب"
                      fill
                      className="object-cover scale-110"
                    />
                  </div>
                  <div className="text-start">
                    <h3 className="text-xl font-black text-white leading-tight">
                      شركة لبيب كمال لبيب
                    </h3>
                    <p className="text-xs text-brand-gold-300 font-bold mt-0.5">
                      الشرقية — البداية، طريق مصر الزراعي
                    </p>
                  </div>
                </div>

                {/* The 3 Featured Machines from the Card */}
                <div className="grid grid-cols-3 gap-2 text-[11px] text-emerald-100 text-center pt-1">
                  <Link href="/products?category=diesel-motors" className="p-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 hover:border-emerald-400/40 transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white shadow-sm border border-white/20">
                      <Image src="/images/products/petter-diesel-pump-hd.jpg" alt="طلمبات بتر ديزل" fill className="object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-white font-bold block text-xs">بتر ديزل</span>
                      <span className="text-[10px] text-emerald-200/80">Petter PH1</span>
                    </div>
                  </Link>
                  <Link href="/products?category=water-pumps" className="p-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 hover:border-emerald-400/40 transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white shadow-sm border border-white/20">
                      <Image src="/images/products/gasoline-water-pump-hd.jpg" alt="طلمبات مياه بنزين" fill className="object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-white font-bold block text-xs">مياه بنزين</span>
                      <span className="text-[10px] text-emerald-200/80">قفص حماية</span>
                    </div>
                  </Link>
                  <Link href="/products?category=spray-motors" className="p-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 hover:border-emerald-400/40 transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white shadow-sm border border-white/20">
                      <Image src="/images/products/knapsack-sprayer-hd.jpg" alt="مواتير رش ظهر" fill className="object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-white font-bold block text-xs">رش ظهر</span>
                      <span className="text-[10px] text-emerald-200/80">محرك ورذاذ</span>
                    </div>
                  </Link>
                </div>

                {/* Direct quick call / whatsapp banner inside card */}
                <div className="pt-2 flex items-center justify-around text-xs font-bold text-white border-t border-white/15">
                  <a href={`tel:${phone1}`} className="flex items-center gap-1.5 hover:text-brand-gold-300 active:scale-95 transition-all">
                    <Phone className="h-3.5 w-3.5 text-brand-gold-400" />
                    <span dir="ltr">{phone1}</span>
                  </a>
                  <span className="text-white/30">|</span>
                  <a href={`tel:${phone2}`} className="flex items-center gap-1.5 hover:text-brand-gold-300 active:scale-95 transition-all">
                    <Phone className="h-3.5 w-3.5 text-brand-gold-400" />
                    <span dir="ltr">{phone2}</span>
                  </a>
                  <span className="text-white/30">|</span>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#25D366] hover:text-emerald-300 active:scale-95 transition-all">
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Ticker Banner */}
      <div className="bg-white text-brand-neutral-800 text-xs sm:text-sm py-3 px-4 shadow-2xs border-y border-brand-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-brand-green-50 text-brand-green-800 border border-brand-green-200 text-[11px] font-black">مباشر</span>
            <span className="text-brand-neutral-700 font-medium">توريد فوري لجميع محافظات مصر • قطع غيار طلمبات ومحركات بتر ديزل متوفرة • صيانة وضمان شامل</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-green-800 text-white text-xs font-bold hover:bg-brand-green-700 active:scale-95 transition-all shadow-2xs"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-300" />
            <span>استشارة المهندس الفني الآن</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">
        {/* 2. THE 4 BIG VISUAL DOORS (Clear Photos for Everyone) */}
        <section className="space-y-6 text-start">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-brand-neutral-200 pb-4">
            <div>
              <span className="text-xs font-bold text-brand-green-800 tracking-wider uppercase">
                الأقسام الرئيسية بالمحل
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight mt-1">
                اختر نوع المعدة بالصورة
              </h2>
              <p className="text-xs sm:text-sm text-brand-neutral-600 mt-0.5">
                اضغط على أي قسم لعرض كافة الماكينات والموديلات المتوفرة
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-green-800 hover:text-brand-green-900 active:scale-95 transition-all"
            >
              <span>تصفح الكتالوج بالكامل ({products.filter((p) => p.published).length} معدة)</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Door 1: Petter Diesel */}
            <Link
              href="/products?category=diesel-motors"
              className="group rounded-3xl border-2 border-brand-neutral-200 bg-white p-4 shadow-xs hover:shadow-xl hover:border-brand-green-600 card-touch flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-brand-neutral-100 border border-brand-neutral-100 mb-3.5">
                <Image
                  src="/images/products/petter-diesel-pump-hd.jpg"
                  alt="طلمبات ديزل بتر Petter PH1"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 300px"
                />
                <span className="absolute top-2.5 start-2.5 bg-emerald-950/85 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs border border-emerald-500/30">
                  ديزل خدمة شاقة
                </span>
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-base sm:text-lg font-black text-brand-neutral-900 group-hover:text-brand-green-800 transition-colors">
                  طلمبات ديزل بتر (Petter PH1)
                </h3>
                <p className="text-xs text-brand-neutral-600 leading-relaxed">
                  محركات ديزل 1 سلندر أصلية لسحب ورفع مياه الري وإدارة المعدات.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-neutral-100 flex items-center justify-between text-xs font-bold text-brand-green-800 group-hover:text-brand-green-900">
                <span>عرض موديلات الديزل</span>
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Door 2: Spray Motors */}
            <Link
              href="/products?category=spray-motors"
              className="group rounded-3xl border-2 border-brand-neutral-200 bg-white p-4 shadow-xs hover:shadow-xl hover:border-brand-green-600 card-touch flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-brand-neutral-100 border border-brand-neutral-100 mb-3.5">
                <Image
                  src="/images/products/knapsack-sprayer-hd.jpg"
                  alt="مواتير ومجموعات الرش الزراعي"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 300px"
                />
                <span className="absolute top-2.5 start-2.5 bg-amber-950/85 text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs border border-amber-500/30">
                  رش ومكافحة
                </span>
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-base sm:text-lg font-black text-brand-neutral-900 group-hover:text-brand-green-800 transition-colors">
                  مواتير ومجموعات الرش
                </h3>
                <p className="text-xs text-brand-neutral-600 leading-relaxed">
                  رشاشات ظهر بموتور بنزين ومجموعات رش ضغط عالي 450 بار للمزارع.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-neutral-100 flex items-center justify-between text-xs font-bold text-brand-green-800 group-hover:text-brand-green-900">
                <span>عرض مواتير الرش</span>
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Door 3: Water Pumps */}
            <Link
              href="/products?category=water-pumps"
              className="group rounded-3xl border-2 border-brand-neutral-200 bg-white p-4 shadow-xs hover:shadow-xl hover:border-brand-green-600 card-touch flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-brand-neutral-100 border border-brand-neutral-100 mb-3.5">
                <Image
                  src="/images/products/gasoline-water-pump-hd.jpg"
                  alt="طلمبات ومحركات مياه الري"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 300px"
                />
                <span className="absolute top-2.5 start-2.5 bg-blue-950/85 text-blue-200 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs border border-blue-500/30">
                  ري وسحب مياه
                </span>
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-base sm:text-lg font-black text-brand-neutral-900 group-hover:text-brand-green-800 transition-colors">
                  طلمبات مياه الري والسحب
                </h3>
                <p className="text-xs text-brand-neutral-600 leading-relaxed">
                  طلمبات بنزين 2 و 3 بوصة لسحب المياه من الترع والآبار وري الحقول.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-neutral-100 flex items-center justify-between text-xs font-bold text-brand-green-800 group-hover:text-brand-green-900">
                <span>عرض طلمبات المياه</span>
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Door 4: Spare Parts */}
            <Link
              href="/products?category=spare-parts"
              className="group rounded-3xl border-2 border-brand-neutral-200 bg-white p-4 shadow-xs hover:shadow-xl hover:border-brand-green-600 card-touch flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-brand-neutral-100 border border-brand-neutral-100 mb-3.5">
                <Image
                  src="/images/products/spare-parts-hd.jpg"
                  alt="قطع الغيار الأصلية والمستلزمات"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 300px"
                />
                <span className="absolute top-2.5 start-2.5 bg-brand-gold-950/85 text-brand-gold-200 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs border border-brand-gold-500/30">
                  قطع غيار أصلية
                </span>
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-base sm:text-lg font-black text-brand-neutral-900 group-hover:text-brand-green-800 transition-colors">
                  قطع الغيار الأصلية
                </h3>
                <p className="text-xs text-brand-neutral-600 leading-relaxed">
                  بساتم، شنابر، فواني رش، سيور، خراطيم، ومستلزمات صيانة متوفرة.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-neutral-100 flex items-center justify-between text-xs font-bold text-brand-green-800 group-hover:text-brand-green-900">
                <span>عرض قطع الغيار</span>
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* 3. FEATURED PRODUCTS (Ready for Handover) */}
        <section className="text-start space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-brand-neutral-200 pb-4">
            <div>
              <span className="text-xs font-bold text-brand-green-800 tracking-wider uppercase">
                جاهز للتسليم الفوري
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight mt-1">
                معدات زراعية مختارة بالمحل
              </h2>
              <p className="text-xs sm:text-sm text-brand-neutral-600 mt-0.5">
                المعدات الأكثر طلباً واعتمادية لدى مزارعي الشرقية ومحافظات الدلتا
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-bold text-brand-green-800 hover:text-brand-green-900 flex items-center gap-1 active:scale-95 transition-all"
            >
              <span>الانتقال للكتالوج الكامل</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 4. INTERACTIVE AGRICULTURAL ADVISOR */}
        <section className="space-y-4">
          <InteractiveEquipmentAdvisor />
        </section>

        {/* 5. WHY LKL (Clear, Direct Agricultural Trust) */}
        <section className="rounded-3xl bg-white p-6 sm:p-10 text-start space-y-6 border border-brand-neutral-200 shadow-xs">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-brand-green-800 tracking-wider uppercase">
              لماذا شركة لبيب كمال؟
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight mt-1">
              ثلاث ركائز نلتزم بها أمام كل مزارع
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2.5 bg-brand-green-50/40 p-6 rounded-2xl border border-brand-green-200/60 card-touch">
              <div className="h-10 w-10 rounded-xl bg-brand-green-700 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-brand-neutral-900">معدات مجربة وعالية التحمل</h3>
              <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                لا نورد إلا الماكينات التي أثبتت كفاءتها في الغيط، ضغط بساتم عالي وما بتخنش في عز شمس الصيف.
              </p>
            </div>

            <div className="space-y-2.5 bg-brand-gold-50/40 p-6 rounded-2xl border border-brand-gold-200/60 card-touch">
              <div className="h-10 w-10 rounded-xl bg-brand-gold-600 text-white flex items-center justify-center shadow-xs">
                <Wrench className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-brand-neutral-900">قطع الغيار الأصلية متوفرة دائماً</h3>
              <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                أي ماكينة نبيعها، نؤمن قطع غيارها بالكامل (بساتم، شنابر، فواني، سيور) عشان ما تعطلش في عز الموسم.
              </p>
            </div>

            <div className="space-y-2.5 bg-brand-green-50/40 p-6 rounded-2xl border border-brand-green-200/60 card-touch">
              <div className="h-10 w-10 rounded-xl bg-brand-green-700 text-white flex items-center justify-center shadow-xs">
                <Settings className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-brand-neutral-900">نصيحة وأمانة فنية لوجه الله</h3>
              <p className="text-xs sm:text-sm text-brand-neutral-600 leading-relaxed">
                نحسب معك مساحة أرضك ومصدر المياه وننصحك بالماكينة المناسبة بالضبط دون تحميلك تكاليف زائدة.
              </p>
            </div>
          </div>
        </section>

        {/* 6. AUTHENTIC CUSTOMER REVIEWS */}
        <ReviewsSection initialReviews={approvedReviews} />

        {/* 7. AGRICULTURAL FAQ */}
        <FAQSection />

        {/* 8. CONTACT CTA BANNER */}
        <ContactCTA />

        {/* 9. STORE LOCATION & MAP */}
        <section className="space-y-4">
          <StoreLocationMap />
        </section>
      </div>
    </div>
  );
}
