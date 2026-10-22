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

export async function GET(request: NextRequest) {
  await destroySession();
  const baseUrl = getBaseUrl(request);
  return NextResponse.redirect(`${baseUrl}/login?logged_out=1`);
}
