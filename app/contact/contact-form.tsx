"use client";

import { useState } from "react";

const ROLE_OPTIONS = [
  "Insurance adviser",
  "Mortgage adviser",
  "Energy provider",
  "Tradie",
  "Real estate agent",
  "Other",
] as const;

const inputClassName =
  "mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted/60 focus:border-violet focus:outline-none focus:ring-0";

const labelClassName = "block text-sm font-medium text-foreground";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <p className="rounded-xl border border-border bg-background px-4 py-4 text-center text-sm font-medium text-foreground">
        Thanks — we&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="contact-name" className={labelClassName}>
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={inputClassName}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClassName}>
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClassName}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="contact-role" className={labelClassName}>
          I am a…
        </label>
        <select
          id="contact-role"
          required
          className={inputClassName}
          defaultValue=""
          disabled={isSubmitting}
        >
          <option value="" disabled>
            Select one
          </option>
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          placeholder="How can we help?"
          className={inputClassName}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-violet h-11 w-full px-6 text-sm">
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
