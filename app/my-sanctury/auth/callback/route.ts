import type { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { syncHomeownerProfile } from "@/lib/supabase/sync-homeowner";
import { createCallbackClient } from "@/lib/supabase/route-handler-client";

function redirectToLogin(origin: string, params: Record<string, string>) {
  const url = new URL("/my-sanctury/login", origin);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const oauthError = searchParams.get("error");
  const oauthDescription = searchParams.get("error_description");
  if (oauthError) {
    return redirectToLogin(origin, {
      error: "auth",
      message: oauthDescription ?? oauthError,
    });
  }

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (!code && !(tokenHash && type)) {
    return redirectToLogin(origin, {
      error: "missing_code",
      message: "No authentication code was received. Please request a new link.",
    });
  }

  const cookieStore = await cookies();
  const response = NextResponse.redirect(new URL("/my-sanctury", origin));

  let supabase;
  try {
    supabase = createCallbackClient(cookieStore, response);
  } catch {
    return redirectToLogin(origin, {
      error: "auth",
      message: "Authentication is not configured on the server.",
    });
  }

  let authError: Error | null = null;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    authError = error;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType,
    });
    authError = error;
  }

  if (authError) {
    return redirectToLogin(origin, {
      error: "auth",
      message: authError.message,
    });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    try {
      await syncHomeownerProfile(user);
    } catch {
      // Session is valid; homeowner row can be retried on next login.
    }
  }

  return response;
}
