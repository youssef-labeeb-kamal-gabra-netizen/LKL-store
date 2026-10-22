import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tractor, MessageCircle, Info } from "lucide-react";
import { env } from "@/lib/env";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const rawWhatsApp = env.business.whatsapp || "01220792948";
  const cleanWhatsApp = rawWhatsApp.replace(/[^0-9]/g, "");
  const formattedWhatsApp = cleanWhatsApp.startsWith("0") ? `2${cleanWhatsApp}` : cleanWhatsApp;
  const inquiryMessage = encodeURIComponent(
    `السلام عليكم ورحمة الله، أود الاستفسار عن توفر وسعر ومواصفات المعدة: ${product.name} (طراز: ${product.model || "غير محدد"}) لدى شركة لبيب كمال.`
  );
  const whatsappHref = `https://wa.me/${formattedWhatsApp}?text=${inquiryMessage}`;

  return (
    <Card className="flex flex-col h-full bg-white border border-brand-neutral-200/90 rounded-3xl shadow-xs hover:shadow-xl hover:border-brand-green-600/40 card-touch overflow-hidden group">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-neutral-50/80 flex items-center justify-center border-b border-brand-neutral-100">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-brand-neutral-400 p-4 text-center">
            <Tractor className="h-16 w-16 text-brand-green-700/40 mb-2 group-hover:scale-105 transition-transform" />
            <span className="text-xs font-semibold text-brand-neutral-500">
              {product.brand || "LKL Equipment"}
            </span>
          </div>
        )}

        {/* Category Pill */}
        <span className="absolute top-3 end-3 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold text-brand-green-800 shadow-xs border border-brand-neutral-200/90">
          {product.categoryName}
        </span>

        {/* Status Pill */}
        <span className="absolute bottom-3 start-3 inline-flex items-center gap-1 rounded-full bg-emerald-950/80 text-emerald-300 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold border border-emerald-500/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>متوفر بالمحل</span>
        </span>
      </div>

      <CardHeader className="p-5 pb-2">
        {product.model && (
          <span className="text-xs font-bold text-brand-gold-600 mb-1">
            كود الموديل: {product.model}
          </span>
        )}
        <Link href={`/products/${product.slug}`} className="hover:text-brand-green-800 transition-colors">
          <h3 className="text-base sm:text-lg font-bold text-brand-neutral-900 line-clamp-2">
            {product.name}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="px-5 py-2 flex-1">
        <p className="text-sm text-brand-neutral-600 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-3 flex flex-col sm:flex-row gap-2 border-t border-brand-neutral-100">
        <Link href={`/products/${product.slug}`} className="w-full sm:flex-1">
          <Button variant="outline" size="sm" className="w-full justify-center gap-1.5 font-bold rounded-xl py-2.5 text-xs sm:text-sm hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 active:scale-95 transition-all">
            <Info className="h-4 w-4 text-emerald-700" />
            التفاصيل والصور
          </Button>
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:flex-1"
        >
          <Button variant="primary" size="sm" className="w-full justify-center gap-1.5 font-bold rounded-xl py-2.5 text-xs sm:text-sm bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da851] text-white shadow-xs active:scale-95 transition-all">
            <MessageCircle className="h-4 w-4" />
            واتساب فوري
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
