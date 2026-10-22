import { cookies } from "next/headers";
import { env } from "@/lib/env";
import { ApplicationError } from "@/lib/error";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "USER" | "ADMIN";
}

const SESSION_COOKIE_NAME = "lkl_session";

/**
 * Resolves whether an email belongs to an administrator
 */
export function resolveUserRole(email: string): "USER" | "ADMIN" {
  const normalizedEmail = email.trim().toLowerCase();
  if (env.auth.adminEmails.includes(normalizedEmail)) {
    return "ADMIN";
  }
  return "USER";
}

/**
 * Encodes a safe session payload into a cookie value.
 */
export async function createSession(user: Omit<SessionUser, "role">): Promise<SessionUser> {
  const role = resolveUserRole(user.email);
  const sessionUser: SessionUser = {
    ...user,
    role,
  };

  const cookieStore = await cookies();
  const serialized = Buffer.from(JSON.stringify(sessionUser)).toString("base64");

  cookieStore.set(SESSION_COOKIE_NAME, serialized, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return sessionUser;
}

/**
 * Retrieves the current authenticated user session from HTTP-only cookie.
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) return null;

    const decoded = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
    const user = JSON.parse(decoded) as SessionUser;

    // Always re-verify role server-side against current ADMIN_EMAILS
    const freshRole = resolveUserRole(user.email);
    user.role = freshRole;

    return user;
  } catch {
    return null;
  }
}

/**
 * Destroys current session cookie (Logout)
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Server-side guard: Requires an authenticated user session
 */
export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw ApplicationError.unauthorized();
  }
  return session;
}

/**
 * Server-side guard: Requires ADMIN role verified on the server
 */
export async function requireAdmin(): Promise<SessionUser> {
  const session = await requireAuth();
  if (session.role !== "ADMIN") {
    throw ApplicationError.forbidden("هذه الصفحة مخصصة لمدير النظام فقط.");
  }
  return session;
}
