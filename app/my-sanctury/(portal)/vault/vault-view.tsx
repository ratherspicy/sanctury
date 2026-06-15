"use client";

import { useState } from "react";
import {
  FolderOpen,
  FileText,
  CheckCircle2,
  Home,
  Shield,
  Droplet,
  Zap,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  MAINTENANCE_EVENTS,
  VAULT_DOCUMENTS,
  VAULT_STATS,
  type DocumentCategory,
  type MaintenanceCategory,
  type VaultDocument,
} from "@/lib/my-sanctury/vault-data";
import { DocumentModal } from "./document-modal";
import { ListItem } from "../components/list-item";
import { HorizontalScroll } from "../components/horizontal-scroll";

// Colour-coded tint + icon per document category.
const DOC_STYLE: Record<
  DocumentCategory,
  { icon: LucideIcon; bg: string; color: string }
> = {
  Council: { icon: FolderOpen, bg: "#DBEAFE", color: "#2563EB" }, // blue
  Consent: { icon: FileText, bg: "#DCFCE7", color: "#16A34A" }, // green
  Certificate: { icon: CheckCircle2, bg: "#CCFBF1", color: "#0D9488" }, // teal
  Plans: { icon: Home, bg: "#F3F4F6", color: "#6B7280" }, // grey
  Insurance: { icon: Shield, bg: "#EEEDF8", color: "#6D5FD8" }, // purple
};

// Category icon + tint for the maintenance timeline.
const MAINT_STYLE: Record<
  MaintenanceCategory,
  { icon: LucideIcon; bg: string; color: string }
> = {
  Plumbing: { icon: Droplet, bg: "#E0F2FE", color: "#0369A1" },
  Roofing: { icon: Home, bg: "#F3F4F6", color: "#6B7280" },
  Electrical: { icon: Zap, bg: "#FEF3C7", color: "#D97706" },
  Renovation: { icon: Wrench, bg: "#EEEDF8", color: "#6D5FD8" },
};

export function VaultView() {
  const [openDocument, setOpenDocument] = useState<VaultDocument | null>(null);

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-6 sm:px-6">
      {openDocument && (
        <DocumentModal
          vaultDocument={openDocument}
          onClose={() => setOpenDocument(null)}
        />
      )}
      {/* Completion bar */}
      <div className="card p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[#6D5FD8]">
            Your property record is 78% complete
          </p>
          <p className="shrink-0 text-xs text-muted">3 documents missing</p>
        </div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-violet-light">
          <div className="h-full rounded-full bg-[#6D5FD8]" style={{ width: "78%" }} />
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Property Passport
          </h1>
          <p className="mt-1.5 text-xs text-muted">
            Handed over by Mark Williams, Tall Poppy Tauranga · 15 March 2024
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            The complete record of your home. Documents, repairs, renovations,
            certificates — all in one place. When you sell, it transfers with the
            property.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button type="button" className="btn-ghost h-10 px-4 text-sm">
            Add document +
          </button>
          <button type="button" className="btn-ghost h-10 px-4 text-sm">
            Log maintenance +
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-sm font-semibold text-foreground">
            {VAULT_STATS.documentCount} documents stored
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm font-semibold text-foreground">
            {VAULT_STATS.maintenanceCount} maintenance events
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm font-semibold text-foreground">
            Last updated {VAULT_STATS.lastUpdated}
          </p>
        </div>
      </div>

      {/* Documents — colour-coded ListItems in a scroll row */}
      <section>
        <h2 className="text-lg font-semibold text-foreground">Documents</h2>
        <p className="mt-1 text-sm text-muted">
          Building consents, LIM reports, certificates, plans and policy
          documents.
        </p>

        <div className="mt-4">
          <HorizontalScroll>
            {VAULT_DOCUMENTS.map((doc) => {
              const style = DOC_STYLE[doc.category];
              return (
                <div
                  key={doc.id}
                  className="card min-w-[260px] shrink-0 snap-start p-4"
                >
                  <ListItem
                    icon={style.icon}
                    iconBg={style.bg}
                    iconColor={style.color}
                    title={doc.name}
                    meta={`${doc.issuer} · ${doc.dateIssued}`}
                  />
                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                      style={{ backgroundColor: style.bg, color: style.color }}
                    >
                      {doc.category}
                    </span>
                    <button
                      type="button"
                      className="btn-ghost h-8 px-3 text-xs"
                      onClick={() => setOpenDocument(doc)}
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </HorizontalScroll>
        </div>

        {/* Missing from your record — light compact chips */}
        <h3 className="mt-6 text-sm font-semibold text-foreground">
          Missing from your record
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Renovation permits", "Property valuation", "Pest inspection"].map(
            (name) => (
              <div
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-3 py-1.5"
              >
                <FolderOpen className="h-4 w-4 text-muted" strokeWidth={1.8} />
                <span className="text-xs font-medium text-foreground">{name}</span>
                <button
                  type="button"
                  className="text-xs font-semibold text-violet hover:underline"
                >
                  Upload
                </button>
              </div>
            )
          )}
        </div>
      </section>

      {/* Maintenance log — timeline with category icons */}
      <section>
        <h2 className="text-lg font-semibold text-foreground">Maintenance Log</h2>
        <p className="mt-1 text-sm text-muted">
          Every repair, renovation, and inspection. Who did it, what they found,
          and what was fixed.
        </p>

        <div className="relative mt-6 space-y-0">
          <div
            className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-violet/30"
            aria-hidden
          />
          {MAINTENANCE_EVENTS.map((event, index) => {
            const maint = MAINT_STYLE[event.category];
            const MaintIcon = maint.icon;
            return (
              <article
                key={event.id}
                className={`relative pl-8 ${index < MAINTENANCE_EVENTS.length - 1 ? "pb-8" : ""}`}
              >
                <span
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-violet bg-surface"
                  aria-hidden
                />
                <div className="card p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full"
                        style={{ backgroundColor: maint.bg, color: maint.color }}
                        title={event.category}
                      >
                        <MaintIcon className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      <p className="text-sm font-bold text-foreground">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{event.contractor}</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {event.cost}
                  </p>

                  <span
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      event.signOff.type === "certified"
                        ? "bg-accent-light text-accent"
                        : "bg-amber-50 text-warning"
                    }`}
                  >
                    {event.signOff.type === "certified" ? (
                      <span aria-hidden>✅</span>
                    ) : (
                      <span aria-hidden>⚠️</span>
                    )}
                    {event.signOff.label}
                  </span>

                  <p className="mt-3 text-sm italic text-muted">{event.notes}</p>

                  {event.infoBox && (
                    <div className="mt-4 rounded-lg border border-warning/30 bg-amber-50 px-4 py-3 text-sm text-foreground">
                      {event.infoBox}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
