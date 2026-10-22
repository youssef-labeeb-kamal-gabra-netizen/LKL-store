import React from "react";
import { getContactRequests } from "@/lib/contact-requests";
import { Inbox, Phone, MessageSquare, Calendar } from "lucide-react";

export default function AdminContactRequestsPage() {
  const requests = getContactRequests();

  return (
    <div className="space-y-6 text-start">
      <div className="border-b border-brand-neutral-200 pb-5">
        <span className="text-xs font-bold text-brand-green-700 tracking-wider uppercase">
          خدمة العملاء والمبيعات
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-neutral-900 tracking-tight mt-0.5">
          طلبات الاستفسار والتواصل الواردة ({requests.length})
        </h1>
        <p className="text-sm text-brand-neutral-500 mt-1">
          جميع الطلبات المرسلة من الموقع العام والمخصصة لطلب الأسعار والمواصفات الفنية.
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="rounded-2xl border border-brand-neutral-200 bg-white p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-neutral-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Inbox className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-neutral-900">{req.name}</h3>
                  <span className="text-xs text-brand-neutral-500">
                    {req.email ? `البريد: ${req.email}` : "لم يتم تسجيل بريد إلكتروني"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    req.status === "NEW"
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {req.status === "NEW" ? "طلب جديد" : req.status}
                </span>
                <span className="text-xs text-brand-neutral-400 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(req.createdAt).toLocaleDateString("ar-EG")}
                </span>
              </div>
            </div>

            <div className="bg-brand-neutral-50 p-4 rounded-xl border border-brand-neutral-100 space-y-1 text-sm">
              <span className="text-xs font-bold text-brand-neutral-600 block">
                تفاصيل رسالة العميل:
              </span>
              <p className="text-brand-neutral-800 leading-relaxed">{req.message}</p>
              {req.product && (
                <div className="pt-2 text-xs font-semibold text-brand-green-800">
                  المعدة المستفسر عنها: <span className="font-mono">{req.product}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${req.phone}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand-neutral-300 bg-white px-3.5 py-2 text-xs font-bold text-brand-neutral-800 hover:bg-brand-neutral-50"
              >
                <Phone className="h-3.5 w-3.5 text-brand-green-700" />
                <span>اتصال هاتفياً: {req.phone}</span>
              </a>

              <a
                href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-800"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>مراسلة واتساب</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
