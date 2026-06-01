import { NextResponse, type NextRequest } from "next/server";
import { getAuthCallbackUrl } from "@/lib/auth/auth-callback-url";
import { createMagicLinkClient } from "@/lib/supabase/route-handler-client";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      {
        error:
          "Server missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
      },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const fullName =
      typeof body.fullName === "string" ? body.fullName : undefined;
    const redirectTo =
      typeof body.redirectTo === "string"
        ? body.redirectTo
        : getAuthCallbackUrl();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const { supabase, getResponse } = createMagicLinkClient(request);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: redirectTo,
        data: fullName ? { full_name: fullName.trim() } : undefined,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const cookieResponse = getResponse();
    const json = NextResponse.json({
      success: true,
      redirectTo,
      message:
        "If an account exists for this email, a sign-in link has been sent.",
    });

    cookieResponse.cookies.getAll().forEach((cookie) => {
      json.cookies.set(cookie.name, cookie.value);
    });

    return json;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unable to send sign-in link.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
