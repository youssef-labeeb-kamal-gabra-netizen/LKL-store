import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { env } from "@/lib/env";

export async function POST() {
  await destroySession();
  return NextResponse.redirect(`${env.appUrl}/login?logged_out=1`, { status: 303 });
}

export async function GET() {
  await destroySession();
  return NextResponse.redirect(`${env.appUrl}/login?logged_out=1`);
}
