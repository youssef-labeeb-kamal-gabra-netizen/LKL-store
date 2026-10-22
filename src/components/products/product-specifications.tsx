import React from "react";
import { ProductSpecification } from "@/types/product";

export interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
}

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  if (!specifications || specifications.length === 0) {
    return (
      <div className="rounded-xl border border-brand-neutral-200 bg-brand-neutral-50 p-6 text-start">
        <p className="text-sm text-brand-neutral-500">
          لم يتم تحديد المواصفات بعد. يرجى التواصل مع فريق المبيعات للحصول على الكتالوج الفني المفصل.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brand-neutral-200 overflow-hidden shadow-sm bg-white text-start">
      <div className="bg-brand-neutral-100/80 px-6 py-4 border-b border-brand-neutral-200">
        <h3 className="text-base font-bold text-brand-neutral-900">
          المواصفات والبيانات الفنية
        </h3>
      </div>
      <dl className="divide-y divide-brand-neutral-100">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className={`px-6 py-3.5 sm:grid sm:grid-cols-3 sm:gap-4 ${
              index % 2 === 0 ? "bg-white" : "bg-brand-neutral-50/50"
            }`}
          >
            <dt className="text-sm font-semibold text-brand-neutral-700">
              {spec.label}
            </dt>
            <dd className="mt-1 text-sm text-brand-neutral-900 sm:col-span-2 sm:mt-0 font-medium">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
