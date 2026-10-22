import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { constructMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ShieldCheck, LogOut, ArrowLeft } from "lucide-react";

export const metadata = constructMetadata({
  title: "حسابي | شركة لبيب كمال",
  noIndex: true,
});

export default async function AccountPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-start">
      {/* Page Title & Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-neutral-200 pb-6">
        <div>
          <span className="text-xs font-bold text-brand-green-700 tracking-wider uppercase">
            منطقة الحساب
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight mt-1">
            مرحباً، {session.name}
          </h1>
          <p className="text-sm text-brand-neutral-500 mt-1">
            البريد المسجل: {session.email}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {session.role === "ADMIN" && (
            <Link href="/admin">
              <Button variant="primary" size="sm" className="gap-2 bg-brand-neutral-900 hover:bg-black">
                <ShieldCheck className="h-4 w-4 text-brand-gold-400" />
                لوحة تحكم الإدارة
              </Button>
            </Link>
          )}

          <form action="/api/auth/logout" method="POST">
            <Button type="submit" variant="outline" size="sm" className="gap-2 text-red-600 border-red-200 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Button>
          </form>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="rounded-2xl border border-brand-neutral-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="text-lg font-bold text-brand-neutral-900 border-b border-brand-neutral-100 pb-3">
          بيانات الهوية والمصادقة
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <span className="text-xs text-brand-neutral-500 font-semibold">الاسم</span>
            <p className="text-base font-bold text-brand-neutral-900 mt-1">{session.name}</p>
          </div>

          <div>
            <span className="text-xs text-brand-neutral-500 font-semibold">البريد الإلكتروني</span>
            <p className="text-base font-bold text-brand-neutral-900 mt-1">{session.email}</p>
          </div>

          <div>
            <span className="text-xs text-brand-neutral-500 font-semibold">مستوى الصلاحية (Role)</span>
            <div className="mt-1">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  session.role === "ADMIN"
                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                    : "bg-brand-green-100 text-brand-green-800 border border-brand-green-200"
                }`}
              >
                {session.role === "ADMIN" ? "مدير النظام (ADMIN)" : "عميل معتمد (USER)"}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs text-brand-neutral-500 font-semibold">حالة الجلسة</span>
            <p className="text-sm text-brand-green-700 font-bold mt-1">نشطة وآمنة (OAuth 2.0)</p>
          </div>
        </div>
      </div>

      {/* Customer Quick Links */}
      <div className="rounded-2xl border border-brand-neutral-200 bg-brand-neutral-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-brand-neutral-900">
            هل تحتاج إلى متابعة طلبك أو مواصفات جديدة؟
          </h3>
          <p className="text-xs sm:text-sm text-brand-neutral-600 mt-0.5">
            يمكنك تصفح كتالوج الآلات أو إرسال استفسار مباشر لفريق الدعم الفني.
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-white font-semibold">
            استعراض المنتجات
            <ArrowLeft className="h-4 w-4 ms-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
