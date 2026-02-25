import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

/**
 * Base URL for redirects. Uses NEXT_PUBLIC_APP_URL so production redirects
 * go to the correct domain even when Supabase redirects to localhost.
 */
function getRedirectBase(request: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return new URL(request.url).origin;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const base = getRedirectBase(request);

  console.log("[AuthCallback] Received callback. code:", code ? "(present)" : "(missing)");

  if (code) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("[AuthCallback] Session exchange failed:", error.message, error);
        return NextResponse.redirect(
          `${base}/login?error=${encodeURIComponent(error.message)}`
        );
      }

      console.log("[AuthCallback] Session exchange successful, redirecting to:", next);
      return NextResponse.redirect(`${base}${next}`);
    } catch (err) {
      console.error("[AuthCallback] Unexpected error:", err);
    }
  }

  console.error("[AuthCallback] No code param — redirecting to login with error");
  return NextResponse.redirect(`${base}/login?error=auth_callback_failed`);
}
