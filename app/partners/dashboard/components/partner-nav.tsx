"use client";

import { useRouter } from "next/navigation";
import { DEMO_PARTNER, PARTNER_SESSION_COOKIE } from "@/lib/partner/auth";

export function PartnerNav() {
  const router = useRouter();

  const handleSignOut = () => {
    document.cookie = `${PARTNER_SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    router.push("/partners/login");
    router.refresh();
  };

  return (
    <header className="border-b border-border bg-surface">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <p className="text-sm font-semibold text-foreground">
          {DEMO_PARTNER.name} — {DEMO_PARTNER.title}
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Sign out
        </button>
      </nav>
    </header>
  );
}
