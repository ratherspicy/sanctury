import Link from "next/link";
import { SancturyLogo } from "@/app/components/sanctury-logo";
import { SignOutButton } from "./components/sign-out-button";
import { BottomNav } from "./components/bottom-nav";

const DESKTOP_NAV = [
  { label: "Home", href: "/my-sanctury" },
  { label: "Finances", href: "/my-sanctury/finances" },
  { label: "Documents", href: "/my-sanctury/vault" },
  { label: "Maintenance", href: "/my-sanctury/maintenance" },
  { label: "Marketplace", href: "/my-sanctury/marketplace" },
];

export default function MySancturyPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <header className="sticky top-0 z-50 border-b border-border bg-surface">
        <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-4 px-6">
          <Link
            href="/my-sanctury"
            className="flex min-w-0 items-center gap-3"
            aria-label="My Sanctury dashboard"
          >
            <SancturyLogo />
            <span className="hidden border-l border-border pl-3 text-sm font-semibold text-foreground sm:inline">
              My Sanctury
            </span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {DESKTOP_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition-colors hover:text-violet"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <SignOutButton />
        </nav>
      </header>
      {/* pb clears the fixed bottom nav on mobile */}
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
}
