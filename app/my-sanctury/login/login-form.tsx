"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export function MySancturyLoginForm() {
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(
    authError === "auth"
      ? "Your link has expired. Please request a new access link below."
      : authError
        ? "Something went wrong. Please try again."
        : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const trimmed = email.trim();

    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "Unable to send access link.");
        return;
      }

      setSubmittedEmail(trimmed);
    } catch {
      setError("Unable to send access link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedEmail) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-brand"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 6h16v12H4V6zM4 6l8 6 8-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-base leading-relaxed text-foreground">
          Check your email — we&apos;ve sent a secure link to{" "}
          <span className="font-semibold text-brand">{submittedEmail}</span>.
          Click it to access your dashboard.
        </p>
        <button
          type="button"
          onClick={() => setSubmittedEmail(null)}
          className="text-sm font-medium text-muted underline-offset-2 hover:text-foreground hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-foreground">
          Email address
        </label>
        <input
          id="login-email"
          type="email"
          required
          autoComplete="email"
          placeholder="e.g. jane@example.com"
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-accent" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand px-8 text-base font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark disabled:opacity-50"
      >
        {isSubmitting ? "Sending…" : "Send my access link"}
      </button>

      <p className="text-center text-sm text-muted">
        <Link href="/" className="font-medium text-brand hover:underline">
          Back to Sanctury
        </Link>
      </p>
    </form>
  );
}
