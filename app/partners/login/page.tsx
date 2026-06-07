import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SiteHeader } from "@/app/components/site-header";
import { SancturyLogo } from "@/app/components/sanctury-logo";
import { PARTNER_SESSION_COOKIE } from "@/lib/partner/auth";
import { PartnerLoginForm } from "./login-form";

export default async function PartnerLoginPage() {
  const cookieStore = await cookies();
  if (cookieStore.get(PARTNER_SESSION_COOKIE)?.value) {
    redirect("/partners/dashboard");
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader minimal />

      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-14">
        <div className="relative w-full max-w-md text-center">
          <Link href="/partners" className="inline-flex justify-center" aria-label="Sanctury home">
            <SancturyLogo />
          </Link>

          <h1 className="mt-10 text-3xl font-bold tracking-tight text-foreground">
            Sanctury for advisers
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Your leads, your clients, all in one place.
          </p>

          <div className="mt-8 card p-6 text-left sm:p-8">
            <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
              <PartnerLoginForm />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
