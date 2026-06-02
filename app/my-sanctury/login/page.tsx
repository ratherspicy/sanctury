import Link from "next/link";
import { Suspense } from "react";
import { SancturyLogo } from "@/app/components/sanctury-logo";
import { MySancturyLoginForm } from "./login-form";

export default function MySancturyLoginPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-14">
        <div className="relative w-full max-w-md text-center">
          <Link href="/" className="inline-flex justify-center" aria-label="Sanctury home">
            <SancturyLogo />
          </Link>

          <h1 className="mt-10 text-3xl font-bold tracking-tight text-foreground">
            Good to have you back.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Enter your email and we&apos;ll send you a secure link. No password
            needed — because you have enough to remember.
          </p>

          <div className="mt-8 card p-6 text-left sm:p-8">
            <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
              <MySancturyLoginForm />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
