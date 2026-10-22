import { cookies } from "next/headers";
import crypto from "crypto";
import { env } from "@/lib/env";
import { ApplicationError } from "@/lib/error";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "USER" | "ADMIN";
}

interface StoredSessionPayload {
  user: SessionUser;
  iat: number;
  exp: number;
}

export const SESSION_COOKIE_NAME = "lkl_session";
export const OAUTH_STATE_COOKIE = "lkl_oauth_state";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

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
 * Generates an HMAC-SHA256 signature for a payload string using AUTH_SECRET
 */
function signPayload(payloadStr: string): string {
  const secret = env.auth.secret || "fallback-secret-for-development-mode-only";
  return crypto.createHmac("sha256", secret).update(payloadStr).digest("base64url");
}

/**
 * Verifies that a given signature matches the payload using constant-time comparison
 */
function verifySignature(payloadStr: string, signature: string): boolean {
  try {
    const expectedSig = signPayload(payloadStr);
    const expectedBuffer = Buffer.from(expectedSig);
    const actualBuffer = Buffer.from(signature);
    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }
    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  } catch {
    return false;
  }
}

/**
 * Encodes and cryptographically signs a session payload into an HTTP-only cookie.
 */
export async function createSession(user: Omit<SessionUser, "role">): Promise<SessionUser> {
  const role = resolveUserRole(user.email);
  const sessionUser: SessionUser = {
    ...user,
    role,
  };

  const now = Date.now();
  const payload: StoredSessionPayload = {
    user: sessionUser,
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS * 1000,
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(payloadStr);
  const token = `${payloadStr}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return sessionUser;
}

/**
 * Retrieves and cryptographically validates the current authenticated user session from HTTP-only cookie.
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) return null;

    const parts = sessionCookie.value.split(".");
    if (parts.length !== 2) {
      // Unsigned or malformed legacy/forged cookie: reject immediately
      return null;
    }

    const [payloadStr, signature] = parts;
    if (!verifySignature(payloadStr, signature)) {
      // Signature mismatch (tampering detected): reject immediately
      return null;
    }

    const jsonStr = Buffer.from(payloadStr, "base64url").toString("utf-8");
    const payload = JSON.parse(jsonStr) as StoredSessionPayload;

    // Check expiration
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }

    if (!payload.user || !payload.user.email) {
      return null;
    }

    // Always re-verify role server-side against current ADMIN_EMAILS
    const freshRole = resolveUserRole(payload.user.email);
    payload.user.role = freshRole;

    return payload.user;
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
