import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { env } from "@/lib/env";

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || (request.url.startsWith("https") ? "https" : "http");
  return host ? `${proto}://${host}` : (env.appUrl || new URL(request.url).origin);
}

export async function POST(request: NextRequest) {
  await destroySession();
  const baseUrl = getBaseUrl(request);
  return NextResponse.redirect(`${baseUrl}/login?logged_out=1`, { status: 303 });
}

/**
 * Rejects GET requests to prevent logout CSRF via prefetching or embedded image tags (Phase 1, Item 4)
 */
export async function GET() {
  return new NextResponse(
    JSON.stringify({
      ok: false,
      error: "Method Not Allowed",
      message: "تسجيل الخروج يتطلب طلب POST حصراً لحماية الأمان ومنع هجمات Logout CSRF.",
    }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Allow: "POST",
      },
    }
  );
}
