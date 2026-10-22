"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Tractor,
  Layers,
  Inbox,
  Image,
  Users,
  FileText,
  Settings,
  ShieldAlert,
  ArrowRight,
  LogOut,
} from "lucide-react";

const adminNav = [
  { href: "/admin", label: "نظرة عامة والتقارير", icon: LayoutDashboard },
  { href: "/admin/products", label: "إدارة المنتجات والمعدات", icon: Tractor },
  { href: "/admin/categories", label: "الأقسام والكتالوج", icon: Layers },
  { href: "/admin/contact-requests", label: "طلبات الاستفسار والعملاء", icon: Inbox },
  { href: "/admin/media", label: "وسائط وصور المعدات", icon: Image },
  { href: "/admin/users", label: "المستخدمين والصلاحيات", icon: Users },
  { href: "/admin/content", label: "إدارة محتوى النصوص", icon: FileText },
  { href: "/admin/settings", label: "بيانات الشركة والإعدادات", icon: Settings },
  { href: "/admin/audit", label: "سجل العمليات (Audit)", icon: ShieldAlert },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-e border-brand-neutral-200 bg-white flex flex-col h-full text-start shrink-0">
      {/* Brand Top */}
      <div className="p-6 border-b border-brand-neutral-200 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-700 text-white shadow-sm">
            <Tractor className="h-5 w-5 text-brand-gold-300" />
          </div>
          <div>
            <span className="text-base font-black text-brand-neutral-900 leading-none">
              إدارة LKL
            </span>
            <p className="text-[10px] text-brand-gold-700 font-bold mt-0.5">لوحة التحكم المركزية</p>
          </div>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto" aria-label="قائمة لوحة التحكم">
        {adminNav.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors",
                isActive
                  ? "bg-brand-green-50 text-brand-green-900 font-bold border border-brand-green-200"
                  : "text-brand-neutral-600 hover:bg-brand-neutral-100 hover:text-brand-neutral-900"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-brand-green-700" : "text-brand-neutral-400")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-brand-neutral-200 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-brand-neutral-600 hover:bg-brand-neutral-100 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة للموقع العام</span>
        </Link>

        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
