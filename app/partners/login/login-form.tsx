"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { isValidPartnerCredentials, PARTNER_SESSION_COOKIE } from "@/lib/partner/auth";

const inputClassName =
  "mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted/60 focus:border-teal-600 focus:outline-none focus:ring-0";

function setPartnerSession() {
  document.cookie = `${PARTNER_SESSION_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function PartnerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "auth" ? "Please sign in to continue." : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!isValidPartnerCredentials(email, password)) {
      setError("Invalid email or password. Use the demo credentials provided.");
      setIsSubmitting(false);
      return;
    }

    setPartnerSession();
    router.push("/partners/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="partner-email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="partner-email"
          type="email"
          required
          autoComplete="email"
          placeholder="adviser@sanctury.co.nz"
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="partner-password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="partner-password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClassName}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-danger" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-teal-600 px-8 text-base font-medium text-white transition-colors hover:bg-teal-700"
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>

      <p className="rounded-xl border border-border bg-background px-4 py-3 text-center text-xs text-muted">
        Demo:{" "}
        <span className="font-medium text-foreground">adviser@sanctury.co.nz</span> /{" "}
        <span className="font-medium text-foreground">demo1234</span>
      </p>

      <p className="text-center text-sm text-muted">
        <Link href="/partners" className="font-medium text-teal-600 hover:underline">
          Back to Sanctury
        </Link>
      </p>
    </form>
  );
}
