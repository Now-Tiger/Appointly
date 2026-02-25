import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  console.log("[AuthCallback] Received callback. code:", code ? "(present)" : "(missing)");

  if (code) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("[AuthCallback] Session exchange failed:", error.message, error);
        return NextResponse.redirect(
          `${origin}/login?error=${encodeURIComponent(error.message)}`
        );
      }

      console.log("[AuthCallback] Session exchange successful, redirecting to:", next);
      return NextResponse.redirect(`${origin}${next}`);
    } catch (err) {
      console.error("[AuthCallback] Unexpected error:", err);
    }
  }

  console.error("[AuthCallback] No code param — redirecting to login with error");
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
