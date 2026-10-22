"use client";

import React, { useState, useMemo } from "react";
import { Product, Category } from "@/types/product";
import { ProductCard } from "@/components/products/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Search, ArrowUpDown } from "lucide-react";

interface ProductCatalogViewProps {
  products: Product[];
  categories: Category[];
  initialCategorySlug?: string;
}

export function ProductCatalogView({
  products,
  categories,
  initialCategorySlug = "",
}: ProductCatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategorySlug);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"newest" | "name_asc" | "name_desc">("newest");

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.published);

    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat) {
        list = list.filter((p) => p.categoryId === cat.id);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.model && p.model.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    if (sortOption === "name_asc") {
      list.sort((a, b) => a.name.localeCompare(b.name, "ar"));
    } else if (sortOption === "name_desc") {
      list.sort((a, b) => b.name.localeCompare(a.name, "ar"));
    } else {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [products, categories, selectedCategory, searchQuery, sortOption]);

  const activeCategory = categories.find((c) => c.slug === selectedCategory);

  return (
    <div className="space-y-8 text-start">
      {/* Title & Description Header */}
      <div className="space-y-3 border-b border-brand-neutral-200 pb-6">
        <span className="text-xs font-bold text-brand-green-700 tracking-wider uppercase">
          دليل المعروضات
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-neutral-900 tracking-tight">
          {activeCategory ? activeCategory.name : "كتالوج الآلات والمعدات الزراعية"}
        </h1>
        <p className="text-sm sm:text-base text-brand-neutral-600 max-w-3xl leading-relaxed">
          {activeCategory
            ? activeCategory.description
            : "تصفح أحدث محركات الرش، طلمبات مياه الري، محركات الديزل، ومستلزمات الإنتاج الزراعي. جميع المعدات مجهزة للخدمة الشاقة مع توفر قطع الغيار الأصلية."}
        </p>
      </div>

      {/* Category Badges Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory("")}
          className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
            !selectedCategory
              ? "bg-brand-green-800 text-white shadow-xs"
              : "bg-white border border-brand-neutral-200 text-brand-neutral-700 hover:border-brand-neutral-300 hover:bg-brand-neutral-50"
          }`}
        >
          كافة المعدات ({products.filter((p) => p.published).length})
        </button>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          const count = products.filter((p) => p.categoryId === cat.id && p.published).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                isSelected
                  ? "bg-brand-green-800 text-white shadow-xs font-bold"
                  : "bg-white border border-brand-neutral-200 text-brand-neutral-700 hover:border-brand-neutral-300 hover:bg-brand-neutral-50"
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute start-3 top-3.5 h-4 w-4 text-brand-neutral-400" />
          <input
            type="text"
            placeholder="البحث باسم المعدة، الموديل، أو المواصفات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-brand-neutral-300 bg-white ps-9 pe-4 py-2.5 text-sm text-brand-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green-600 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-brand-neutral-500" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as "newest" | "name_asc" | "name_desc")}
            className="rounded-xl border border-brand-neutral-300 bg-white px-3 py-2.5 text-xs sm:text-sm font-semibold text-brand-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-green-600 shadow-sm"
          >
            <option value="newest">الترتيب: الأحدث إضافة</option>
            <option value="name_asc">الترتيب: الاسم أ - ي</option>
            <option value="name_desc">الترتيب: الاسم ي - أ</option>
          </select>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="text-xs text-brand-neutral-500">
        يتم عرض <strong>{filteredProducts.length}</strong> من إجمالي المعروضات
      </div>

      {/* Grid of Products or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="لم نتمكن من العثور على معدات مطابقة"
          description="لا توجد نتائج تطابق معايير البحث أو القسم المحدد. يمكنك تصفح كافة المنتجات أو مراسلتنا للاستفسار عن طراز معين."
          actionLabel="عرض كافة المنتجات"
          onAction={() => {
            setSelectedCategory("");
            setSearchQuery("");
          }}
        />
      )}
    </div>
  );
}
