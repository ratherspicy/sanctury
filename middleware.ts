import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never intercept the auth callback — it must exchange the code and set cookies first.
  if (pathname.startsWith("/my-sanctury/auth/callback")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/my-sanctury")) {
    return updateSession(request);
  }
}

export const config = {
  matcher: ["/my-sanctury/:path*"],
};
