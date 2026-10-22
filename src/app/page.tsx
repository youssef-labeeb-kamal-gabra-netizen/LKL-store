import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/catalog";
import { getProductsStore } from "@/lib/products-store";
import { ProductCard } from "@/components/products/product-card";
import { ContactCTA } from "@/components/common/contact-cta";
import { ReviewsSection } from "@/components/common/reviews-section";
import { FAQSection } from "@/components/common/faq-section";
import { StoreLocationMap } from "@/components/common/store-location-map";
import { InteractiveEquipmentAdvisor } from "@/components/common/interactive-equipment-advisor";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Phone,
  ArrowLeft,
  Settings,
  Sparkles,
  Droplets,
  MessageCircle,
  Award,
} from "lucide-react";
import { env } from "@/lib/env";

export default function HomePage() {
  const products = getProductsStore();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

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
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-green-950 via-brand-green-900 to-brand-green-950 text-white pt-16 sm:pt-24 pb-20 sm:pb-28 text-start">
        {/* Glow Effects */}
        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-brand-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 end-10 w-80 h-80 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Experience Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold-500/20 border border-brand-gold-400/40 px-4 py-1.5 text-xs sm:text-sm font-bold text-brand-gold-300 shadow-sm">
                <Sparkles className="h-4 w-4" />
                <span>تأسسنا كمحل سنة 2005 • خبرة تتجاوز 20 عاماً في الميكنة الزراعية</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-black text-brand-gold-400 tracking-widest uppercase">
                  LABIB KAMAL LABIB • LKL
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                  شركة لبيب كمال لبيب <br className="hidden sm:inline" />
                  <span className="text-brand-gold-400">للأدوات والآلات الزراعية</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-brand-green-100 max-w-2xl leading-relaxed">
                نوفر أحدث طلمبات ومحركات بتر الديزل، مواتير مياه الري، محركات الرش الظهرية والمجموعات المتكاملة، ومستلزمات شبكات الري وقطع الغيار الأصلية في الزقازيق ومحافظات مصر.
              </p>

              {/* Direct CTAs: Catalog + Instant WhatsApp + Phone Call */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto font-bold text-brand-neutral-950 shadow-xl hover:scale-105 transition-transform bg-brand-gold-500 hover:bg-brand-gold-400 justify-center">
                    تصفح كتالوج المعدات
                    <ArrowLeft className="h-5 w-5 ms-2" />
                  </Button>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3.5 text-sm sm:text-base font-bold shadow-lg transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>مراسلة واتساب فورية</span>
                </a>

                <a
                  href={`tel:${phone1}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white px-4 py-3.5 text-sm font-semibold transition-colors w-full sm:w-auto"
                >
                  <Phone className="h-4 w-4 text-brand-gold-300" />
                  <span dir="ltr">{phone1}</span>
                </a>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-6 border-t border-brand-green-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm text-brand-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold-400 shrink-0" />
                  <span>الجودة • الثقة • الخدمة المتميزة</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold-400 shrink-0" />
                  <span>طلمبات بتر ديزل ومواتير أصلية</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold-400 shrink-0" />
                  <span>قطع غيار متوفرة ودعم فني</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card / Official Business Card Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-b from-white/15 to-white/5 border border-amber-400/40 p-5 sm:p-6 backdrop-blur-xl shadow-2xl text-center space-y-5 overflow-hidden">
                {/* Official Card Image */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl border border-amber-300/40 group">
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
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg shrink-0 bg-brand-green-950">
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
                    <p className="text-xs text-amber-300 font-bold mt-0.5">
                      الزقازيق — البداية، طريق مصر الزراعي
                    </p>
                  </div>
                </div>

                {/* The 3 Featured Machines from the Card */}
                <div className="grid grid-cols-3 gap-2 text-[11px] text-brand-green-100 text-center pt-1">
                  <div className="p-2 rounded-xl bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-1.5 group">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white shadow-sm border border-amber-400/30">
                      <Image src="/images/products/petter-diesel-pump-hd.jpg" alt="طلمبات بتر ديزل" fill className="object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-amber-300 font-bold block text-xs">بتر ديزل</span>
                      <span className="text-[10px] text-brand-neutral-300">Petter PH1</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-1.5 group">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white shadow-sm border border-amber-400/30">
                      <Image src="/images/products/gasoline-water-pump-hd.jpg" alt="طلمبات مياه بنزين" fill className="object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-amber-300 font-bold block text-xs">مياه بنزين</span>
                      <span className="text-[10px] text-brand-neutral-300">قفص حماية</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-1.5 group">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white shadow-sm border border-amber-400/30">
                      <Image src="/images/products/knapsack-sprayer-hd.jpg" alt="مواتير رش ظهر" fill className="object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-amber-300 font-bold block text-xs">رش ظهر</span>
                      <span className="text-[10px] text-brand-neutral-300">محرك ورذاذ</span>
                    </div>
                  </div>
                </div>

                {/* Direct quick call / whatsapp banner inside card */}
                <div className="pt-2 flex items-center justify-around text-xs font-bold text-white border-t border-white/15">
                  <a href={`tel:${phone1}`} className="flex items-center gap-1.5 hover:text-brand-gold-300">
                    <Phone className="h-3.5 w-3.5 text-brand-gold-400" />
                    <span dir="ltr">{phone1}</span>
                  </a>
                  <span>|</span>
                  <a href={`tel:${phone2}`} className="flex items-center gap-1.5 hover:text-brand-gold-300">
                    <Phone className="h-3.5 w-3.5 text-brand-gold-400" />
                    <span dir="ltr">{phone2}</span>
                  </a>
                  <span>|</span>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300">
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
      <div className="bg-brand-gold-500 text-brand-neutral-950 font-bold text-xs sm:text-sm py-2.5 px-4 shadow-sm border-y border-brand-gold-600/30 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand-green-900 animate-ping" />
            <span className="font-black">مباشر:</span>
            <span>توريد فوري لجميع محافظات مصر • قطع غيار طلمبات ومحركات بتر ديزل متوفرة • صيانة وضمان شامل</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-green-950 text-white text-xs hover:bg-brand-green-900 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>استشارة المهندس الفني الآن</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* 2. BUSINESS INTRODUCTION & HISTORY */}
        <section className="text-start space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-green-100 text-brand-green-800 px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <Award className="h-3.5 w-3.5 text-brand-green-700" />
            <span>تاريخنا وعراقة خبرتنا</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
            أكثر من 20 عاماً في خدمة وتطوير القطاع الزراعي بالشرقية ومصر
          </h2>
          <p className="text-base sm:text-lg text-brand-neutral-600 leading-relaxed">
            انطلقت شركة ومحل <strong>لبيب كمال لبيب</strong> رسمياً كمحل في عام 2005، ولكن جذورنا وبداياتنا المهنية في صيانة وتوريد المعدات الزراعية تمتد لسنوات قبل ذلك. على مدار أكثر من عقدين من الزمان، بنينا سمعتنا في الزقازيق وكافة مراكز محافظة الشرقية على أساس الصدق والأمانة في النصح الفني، وتوفير المعدات عالية التحمل التي لا تخذل المزارع في مواسم العمل الشاق.
          </p>
        </section>

        {/* 2.5 INTERACTIVE AGRICULTURAL ADVISOR */}
        <section className="space-y-4">
          <InteractiveEquipmentAdvisor />
        </section>

        {/* 3. PRODUCT CATEGORIES */}
        <section className="text-start space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-green-700 tracking-wider uppercase">
                الأقسام والمنتجات
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight mt-1">
                استكشف مجموعات المعدات والآلات الزراعية
              </h2>
            </div>
            <Link href="/products" className="text-sm font-bold text-brand-green-700 hover:text-brand-green-800 flex items-center gap-1">
              عرض كل المنتجات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group rounded-3xl border border-brand-neutral-200 bg-white p-7 shadow-sm hover:shadow-lg hover:border-brand-green-600 transition-all text-start"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-50 text-brand-green-700 group-hover:bg-brand-green-700 group-hover:text-white transition-colors mb-4 shadow-sm">
                  <Droplets className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-neutral-900 group-hover:text-brand-green-800 transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-sm text-brand-neutral-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-brand-gold-700 group-hover:translate-x-1 transition-transform">
                  <span>تصفح المعروضات</span>
                  <ArrowLeft className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. FEATURED PRODUCTS */}
        <section className="text-start space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-green-700 tracking-wider uppercase">
                المعروضات المميزة
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight mt-1">
                معدات زراعية مختارة للخدمة الشاقة
              </h2>
            </div>
            <Link href="/products" className="text-sm font-bold text-brand-green-700 hover:text-brand-green-800 flex items-center gap-1">
              الانتقال للكتالوج الكامل
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 5. WHY LKL */}
        <section className="rounded-3xl bg-brand-neutral-100 p-8 sm:p-12 text-start space-y-8 border border-brand-neutral-200">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-brand-green-700 tracking-wider uppercase">
              لماذا شركة لبيب كمال؟
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight mt-1">
              ركائز عملنا: الجودة • الثقة • الخدمة المتميزة
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 bg-white p-7 rounded-2xl shadow-sm border border-brand-neutral-200">
              <div className="h-11 w-11 rounded-xl bg-brand-green-100 text-brand-green-800 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-neutral-900">معدات مجربة وعالية الكفاءة</h3>
              <p className="text-sm text-brand-neutral-600 leading-relaxed">
                نحرص على توريد الآلات والمحركات التي أثبتت جدارتها في المزارع المصرية، لتقليل الأعطال وضمان استمرارية العمل.
              </p>
            </div>

            <div className="space-y-3 bg-white p-7 rounded-2xl shadow-sm border border-brand-neutral-200">
              <div className="h-11 w-11 rounded-xl bg-brand-gold-100 text-brand-gold-800 flex items-center justify-center">
                <Wrench className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-neutral-900">توفر دائم لقطع الغيار</h3>
              <p className="text-sm text-brand-neutral-600 leading-relaxed">
                نؤمن بأن قيمة الموتور أو الطلمبة ترتبط بتوفر قطع غيارها الأصلية، ولذلك نحرص على تأمين مستلزمات الصيانة لمختلف الموديلات.
              </p>
            </div>

            <div className="space-y-3 bg-white p-7 rounded-2xl shadow-sm border border-brand-neutral-200">
              <div className="h-11 w-11 rounded-xl bg-brand-green-100 text-brand-green-800 flex items-center justify-center">
                <Settings className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-neutral-900">مشورة فنية دقيقة قبل الشراء</h3>
              <p className="text-sm text-brand-neutral-600 leading-relaxed">
                نساعدك في حساب مساحتك الزراعية ونوع التربة ومصادر المياه لتحديد قدرة الطلمبة أو المحرك الملائم تماماً لاحتياجك.
              </p>
            </div>
          </div>
        </section>

        {/* 6. AUTHENTIC CUSTOMER REVIEWS SECTION */}
        <ReviewsSection />

        {/* 7. AGRICULTURAL FAQ & TECHNICAL ADVICE SECTION */}
        <FAQSection />

        {/* 8. CONTACT CTA */}
        <ContactCTA />

        {/* 9. LOCATION SECTION & GOOGLE MAPS */}
        <section className="space-y-4">
          <StoreLocationMap />
        </section>
      </div>
    </div>
  );
}
