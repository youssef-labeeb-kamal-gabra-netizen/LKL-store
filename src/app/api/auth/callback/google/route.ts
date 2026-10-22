import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { createSession, OAUTH_STATE_COOKIE } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDesc = searchParams.get("error_description");

  // Dynamically resolve base URL from incoming request
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || (request.url.startsWith("https") ? "https" : "http");
  const rawBaseUrl = host ? `${proto}://${host}` : (env.appUrl || new URL(request.url).origin);
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");

  // 0. CSRF State Verification
  const storedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;
  if (!state || !storedState || state !== storedState) {
    console.error("OAuth CSRF protection triggered: state mismatch or missing");
    const res = NextResponse.redirect(`${baseUrl}/login?error=invalid_csrf_state`);
    res.cookies.delete(OAUTH_STATE_COOKIE);
    return res;
  }

  if (error || !code) {
    const errorMsg = errorDesc || error || "oauth_failed";
    const res = NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(errorMsg)}`);
    res.cookies.delete(OAUTH_STATE_COOKIE);
    return res;
  }

  try {
    const redirectUri = `${baseUrl}/api/auth/callback/google`;

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
      const errDetail = tokenData.error_description || tokenData.error || "token_exchange_failed";
      console.error("Token exchange failed:", tokenData);
      return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(errDetail)}`);
    }

    // 2. Fetch user profile from Google UserInfo endpoint
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userRes.json();
    if (!userRes.ok || !googleUser.email) {
      const errUser = googleUser.error_description || googleUser.error?.message || "user_info_failed";
      return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(errUser)}`);
    }

    // 3. Create secure application session
    const session = await createSession({
      id: googleUser.id,
      name: googleUser.name || "مستخدم LKL",
      email: googleUser.email,
      image: googleUser.picture,
    });

    // 4. Redirect based on role and delete transient OAuth state cookie
    const targetUrl = session.role === "ADMIN" ? `${baseUrl}/admin` : `${baseUrl}/account`;
    const response = NextResponse.redirect(targetUrl);
    response.cookies.delete(OAUTH_STATE_COOKIE);
    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "oauth_exception";
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(message)}`);
  }
}
