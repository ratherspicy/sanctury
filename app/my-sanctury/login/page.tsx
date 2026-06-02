import Link from "next/link";
import { Suspense } from "react";
import { SancturyLogo } from "@/app/components/sanctury-logo";
import { MySancturyLoginForm } from "./login-form";

export default function MySancturyLoginPage() {
  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-14">
        <div className="relative w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Link href="/" aria-label="Sanctury home">
              <SancturyLogo />
            </Link>
          </div>
          <div className="card p-8 sm:p-10">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Good to have you back.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Enter your email and we&apos;ll send you a sign-in link — no
              password needed.
            </p>
            <div className="mt-8">
              <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
                <MySancturyLoginForm />
              </Suspense>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            New to Sanctury?{" "}
            <Link href="/check" className="font-medium text-violet hover:underline">
              Run your free Home Health Check
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
