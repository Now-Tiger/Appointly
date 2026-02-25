import { getSupabaseBrowserClient } from "./browser-client";

const SIGNED_URL_EXPIRY = 60 * 60; // 1 hour in seconds

/**
 * Returns the public URL for a file in a Supabase Storage bucket.
 * Only works if the bucket has public access enabled.
 */
export function getPublicStorageUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    console.error("[Storage] NEXT_PUBLIC_SUPABASE_URL is not set");
    return "";
  }
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * Creates signed URLs for multiple files in a private Supabase Storage bucket.
 * Returns a map of filename -> signed URL.
 */
export async function getSignedStorageUrls(
  bucket: string,
  paths: string[]
): Promise<Record<string, string>> {
  const supabase = getSupabaseBrowserClient();
  const result: Record<string, string> = {};

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrls(paths, SIGNED_URL_EXPIRY);

  if (error) {
    console.error("[Storage] Failed to create signed URLs:", error.message);
    return result;
  }

  for (const item of data) {
    if (item.signedUrl && item.path) {
      result[item.path] = item.signedUrl;
    }
  }

  return result;
}
