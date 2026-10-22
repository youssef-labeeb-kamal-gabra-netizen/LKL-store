import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  if (!env.auth.googleClientId || env.auth.googleClientId.trim() === "") {
    return NextResponse.redirect(`${env.appUrl}/login?error=not_configured`);
  }

  const redirectUri = `${env.appUrl}/api/auth/callback/google`;
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: redirectUri,
    client_id: env.auth.googleClientId,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options).toString();
  return NextResponse.redirect(`${rootUrl}?${qs}`);
}
