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

const initialUsers: AppUser[] = [
  {
    id: "user-1",
    name: "مدير النظام الرئيسي",
    email: "admin@lkl-egypt.com",
    role: "ADMIN",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    name: "م. أحمد الشربيني",
    email: "ahmed@example.com",
    role: "USER",
    createdAt: "2026-01-15T12:00:00Z",
  },
];

export function getUsersStore(): AppUser[] {
  if (!global.__lkl_users_store) {
    global.__lkl_users_store = [...initialUsers];
  }
  return global.__lkl_users_store;
}

export function updateUserRole(id: string, role: "USER" | "ADMIN"): AppUser | null {
  const store = getUsersStore();
  const user = store.find((u) => u.id === id);
  if (!user) return null;
  user.role = role;
  return user;
}
