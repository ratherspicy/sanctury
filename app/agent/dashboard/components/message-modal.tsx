"use client";

import { useEffect, useState } from "react";
import type { AgentAlert } from "@/lib/agent/dashboard-data";

type MessageModalProps = {
  alert: AgentAlert | null;
  onClose: () => void;
};

export function MessageModal({ alert, onClose }: MessageModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!alert) return;
    setCopied(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [alert, onClose]);

  if (!alert) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(alert.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="message-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-surface">
        <div className="border-b border-border px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2E8B57]">
            Client message
          </p>
          <h2 id="message-modal-title" className="mt-1 text-xl font-bold text-foreground">
            {alert.clientName}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {alert.situationSummary}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <label htmlFor="agent-message" className="sr-only">
            Message for {alert.clientName}
          </label>
          <textarea
            id="agent-message"
            readOnly
            rows={14}
            value={alert.message}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground"
          />
          <p className="mt-3 flex items-center gap-2 text-xs text-muted">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-[#2E8B57]" aria-hidden>
              <path
                d="M8 1.5l1.2 2.4 2.7.4-2 1.9.5 2.7L8 7.5 5.6 8.9l.5-2.7-2-1.9 2.7-.4L8 1.5z"
                fill="currentColor"
              />
            </svg>
            Sanctury AI — review before sending
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost h-11 px-6 text-sm"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#2E8B57] px-6 text-sm font-medium text-white transition-colors hover:bg-[#267349]"
          >
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
