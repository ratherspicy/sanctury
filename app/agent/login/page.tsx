import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SancturyLogo } from "@/app/components/sanctury-logo";
import { AGENT_SESSION_COOKIE } from "@/lib/agent/auth";
import { AgentLoginForm } from "./login-form";

export default async function AgentLoginPage() {
  const cookieStore = await cookies();
  if (cookieStore.get(AGENT_SESSION_COOKIE)?.value) {
    redirect("/agent/dashboard");
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-14">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-24 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-hero-glow/70 blur-3xl" />
        </div>

        <div className="relative w-full max-w-md text-center">
          <Link href="/" className="inline-flex justify-center" aria-label="Sanctury home">
            <SancturyLogo />
          </Link>

          <h1 className="mt-10 text-3xl font-bold tracking-tight text-foreground">
            Sanctury for Agents
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Your client intelligence dashboard.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-left shadow-sm sm:p-8">
            <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
              <AgentLoginForm />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
