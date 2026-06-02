"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AGENT_SESSION_COOKIE, isValidAgentCredentials } from "@/lib/agent/auth";

const inputClassName =
"mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted/60 focus:border-violet focus:outline-none focus:ring-0";

function setAgentSession() {
  document.cookie = `${AGENT_SESSION_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function AgentLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "auth"
      ? "Please sign in to continue."
      : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!isValidAgentCredentials(email, password)) {
      setError("Invalid email or password. Use the demo credentials provided.");
      setIsSubmitting(false);
      return;
    }

    setAgentSession();
    router.push("/agent/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="agent-email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="agent-email"
          type="email"
          required
          autoComplete="email"
          placeholder="agent@sanctury.co.nz"
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="agent-password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="agent-password"
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
        className="btn-violet h-12 w-full px-8 text-base"
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>

      <p className="rounded-xl border border-border bg-background px-4 py-3 text-center text-xs text-muted">
        Demo: <span className="font-medium text-foreground">agent@sanctury.co.nz</span> /{" "}
        <span className="font-medium text-foreground">demo1234</span>
      </p>

      <p className="text-center text-sm text-muted">
        <Link href="/" className="font-medium text-violet hover:underline">
          Back to Sanctury
        </Link>
      </p>
    </form>
  );
}
