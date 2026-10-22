import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "لوحة تحكم الإدارة | شركة لبيب كمال",
  noIndex: true,
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Strict Server-Side Authentication Guard (Task 108)
  if (!session) {
    redirect("/login");
  }

  // Strict Server-Side Authorization Guard (Task 109)
  if (session.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <div className="flex h-screen bg-brand-neutral-100 overflow-hidden text-start">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader user={session} />
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
