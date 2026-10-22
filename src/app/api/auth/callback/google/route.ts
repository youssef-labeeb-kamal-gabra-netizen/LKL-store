import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { createSession } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(`${env.appUrl}/login?error=oauth_failed`);
  }

  try {
    const redirectUri = `${env.appUrl}/api/auth/callback/google`;

    // 1. Exchange code for access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: env.auth.googleClientId,
        client_secret: env.auth.googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      return NextResponse.redirect(`${env.appUrl}/login?error=token_exchange_failed`);
    }

    // 2. Fetch user profile from Google UserInfo endpoint
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userRes.json();
    if (!userRes.ok || !googleUser.email) {
      return NextResponse.redirect(`${env.appUrl}/login?error=user_info_failed`);
    }

    // 3. Create secure application session
    const session = await createSession({
      id: googleUser.id,
      name: googleUser.name || "مستخدم LKL",
      email: googleUser.email,
      image: googleUser.picture,
    });

    // 4. Redirect based on role
    if (session.role === "ADMIN") {
      return NextResponse.redirect(`${env.appUrl}/admin`);
    }
    return NextResponse.redirect(`${env.appUrl}/account`);
  } catch {
    return NextResponse.redirect(`${env.appUrl}/login?error=oauth_exception`);
  }
}
