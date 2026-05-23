/** Default Supabase magic-link redirect path (must match Supabase Auth URL allow list). */
export const AUTH_CALLBACK_PATH = "/my-sanctury/auth/callback";

export function getAuthCallbackUrl(siteUrl?: string): string {
  const base = (
    siteUrl ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");

  return `${base}${AUTH_CALLBACK_PATH}`;
}
