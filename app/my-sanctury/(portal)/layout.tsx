import Link from "next/link";
import { SancturyLogo } from "@/app/components/sanctury-logo";
import { SignOutButton } from "./components/sign-out-button";

export default function MySancturyPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-4 px-6">
          <Link
            href="/my-sanctury"
            className="flex min-w-0 items-center gap-3"
            aria-label="My Sanctury dashboard"
          >
            <SancturyLogo />
            <span className="hidden border-l border-border pl-3 text-sm font-semibold text-brand sm:inline">
              My Sanctury
            </span>
          </Link>
          <SignOutButton />
        </nav>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
