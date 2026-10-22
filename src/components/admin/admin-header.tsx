import React from "react";
import { SessionUser } from "@/lib/auth";
import { ShieldCheck } from "lucide-react";

export function AdminHeader({ user }: { user: SessionUser }) {
  return (
    <header className="h-16 border-b border-brand-neutral-200 bg-white px-6 flex items-center justify-between text-start">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-purple-100 text-purple-800 px-2.5 py-1 text-xs font-bold border border-purple-200">
          <ShieldCheck className="h-3.5 w-3.5 text-purple-700" />
          جلسة مشرفة ومؤمنة
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-brand-green-100 text-brand-green-800 flex items-center justify-center font-bold text-xs">
            {user.name.charAt(0)}
          </div>
          <div className="hidden sm:block text-start">
            <span className="text-xs font-bold text-brand-neutral-900 block leading-none">
              {user.name}
            </span>
            <span className="text-[10px] text-brand-neutral-500">{user.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
