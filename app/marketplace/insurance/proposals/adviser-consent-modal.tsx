"use client";

import { useEffect } from "react";

type AdviserConsentModalProps = {
  adviserName: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function AdviserConsentModal({
  adviserName,
  onConfirm,
  onClose,
}: AdviserConsentModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="adviser-consent-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        aria-label="Close consent dialog"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[480px] rounded-xl border border-border bg-surface p-6 shadow-lg sm:p-8">
        <h2
          id="adviser-consent-title"
          className="text-xl font-bold text-foreground"
        >
          Share your details with {adviserName}?
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
          <p>
            To connect you with {adviserName}, Sanctury will share:
          </p>
          <ul className="space-y-1.5 pl-1">
            <li>· Your name and email address</li>
            <li>· Your property address</li>
            <li>· Your coverage gap summary</li>
          </ul>
          <p>
            {adviserName} will use these details to follow up on their proposal.
            Your details are not shared with any other adviser.
          </p>
          <p>
            You can withdraw your consent at any time by contacting{" "}
            <a
              href="mailto:privacy@sanctury.co.nz"
              className="font-medium text-violet hover:underline"
            >
              privacy@sanctury.co.nz
            </a>
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onConfirm}
            className="btn-violet h-11 w-full px-6 text-sm"
          >
            Yes, share my details and connect me
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost h-11 w-full px-6 text-sm"
          >
            Cancel — go back to proposals
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          This consent is collected under the Privacy Act 2020 (IPP 11). Sanctury
          stores your consent record.
        </p>
      </div>
    </div>
  );
}
