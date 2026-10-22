import { env } from "@/lib/env";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

declare global {
  var __lkl_users_store: AppUser[] | undefined;
}

function getInitialUsers(): AppUser[] {
  const primaryAdminEmail = env.auth.adminEmails[0] || "yousseflabeeb256@gmail.com";
  return [
    {
      id: "admin-primary",
      name: "مدير النظام (م. يوسف لبيب)",
      email: primaryAdminEmail,
      role: "ADMIN",
      createdAt: "2026-01-01T00:00:00Z",
    },
    {
      id: "user-registered",
      name: "م. أحمد الشربيني",
      email: "ahmed@example.com",
      role: "USER",
      createdAt: "2026-01-15T12:00:00Z",
    },
  ];
}

export function getUsersStore(): AppUser[] {
  if (!global.__lkl_users_store) {
    global.__lkl_users_store = getInitialUsers();
  }
  return global.__lkl_users_store;
}

export function isImmutableAdmin(email: string): boolean {
  return env.auth.adminEmails.includes(email.trim().toLowerCase());
}

export function updateUserRole(id: string, role: "USER" | "ADMIN"): AppUser | null {
  const store = getUsersStore();
  const user = store.find((u) => u.id === id);
  if (!user) return null;

  // Protect environment-configured primary administrators from accidental demotion
  if (role !== "ADMIN" && isImmutableAdmin(user.email)) {
    throw new Error("لا يمكن إلغاء صلاحية المدير الرئيسي المحدد في إعدادات الخادم (ADMIN_EMAILS).");
  }

  user.role = role;
  return user;
}
