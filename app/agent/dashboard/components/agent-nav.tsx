"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SancturyLogo } from "@/app/components/sanctury-logo";
import { AGENT_SESSION_COOKIE, DEMO_AGENT } from "@/lib/agent/auth";

export function AgentNav() {
  const router = useRouter();

  const handleSignOut = () => {
    document.cookie = `${AGENT_SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    router.push("/agent/login");
    router.refresh();
  };

  return (
      <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <Link href="/agent/dashboard" aria-label="Agent dashboard">
            <SancturyLogo />
          </Link>
          <div className="hidden border-l border-border pl-6 sm:block">
            <p className="text-sm font-semibold text-foreground">{DEMO_AGENT.name}</p>
            <p className="text-xs text-muted">{DEMO_AGENT.agency}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/agent/dashboard#clients"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
          >
            My Clients
          </Link>
          <Link
            href="/agent/dashboard#alerts"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
          >
            Alerts
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="btn-ghost ml-2 px-4 py-2 text-sm font-medium"
          >
            Sign out
          </button>
        </div>
      </nav>
    </header>
  );
}
