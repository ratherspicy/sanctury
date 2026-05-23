import { createClient } from "@supabase/supabase-js";
import { getAuthCallbackUrl } from "@/lib/auth/auth-callback-url";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type SendMagicLinkResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

export async function sendMagicLinkEmail(
  email: string,
  options?: { fullName?: string; redirectTo?: string }
): Promise<SendMagicLinkResult> {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed || !isValidEmail(trimmed)) {
    return {
      ok: false,
      error: "A valid email address is required.",
      status: 400,
    };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return {
      ok: false,
      error: "Authentication is not configured.",
      status: 500,
    };
  }

  const redirectTo = options?.redirectTo ?? getAuthCallbackUrl();

  const supabase = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { error } = await supabase.auth.signInWithOtp({
    email: trimmed,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: redirectTo,
      data: options?.fullName
        ? { full_name: options.fullName.trim() }
        : undefined,
    },
  });

  if (error) {
    return {
      ok: false,
      error: error.message,
      status: 500,
    };
  }

  return { ok: true };
}
