import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export async function handleGoogleLogin() {
  console.log("[GoogleAuth] Starting Google OAuth flow...");

  const supabase = getSupabaseBrowserClient();
  const redirectTo = `${window.location.origin}/api/auth/callback`;
  console.log("[GoogleAuth] Redirect URL:", redirectTo);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: false,
    },
  });

  // signInWithOAuth does NOT throw — it returns { data, error }
  if (error) {
    console.error("[GoogleAuth] OAuth error:", error.message, error);
    throw new Error(error.message);
  }

  console.log("[GoogleAuth] OAuth initiated, redirect URL:", data?.url);
}

export async function handleSignOut() {
  console.log("[Auth] Signing out...");
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[Auth] Sign-out error:", error.message);
  }
}
