"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient {
  if (client) {
    return client;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "[Supabase] Missing env vars. Got:",
      "NEXT_PUBLIC_SUPABASE_URL =",
      supabaseUrl ?? "(undefined)",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY =",
      supabaseAnonKey ? "(set)" : "(undefined)"
    );
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Add them to your .env.local file."
    );
  }

  console.log("[Supabase] Creating browser client for:", supabaseUrl);
  client = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return client;
}
