"use client";

import { useEffect } from "react";
import type { VaultDocument } from "@/lib/my-sanctury/vault-data";

type DocumentModalProps = {
  vaultDocument: VaultDocument;
  onClose: () => void;
};

function DocSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#374151]">
        {title}
      </h3>
      <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-[#1f2937]">
        {children}
      </div>
    </div>
  );
}

function DocRef({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[13px] text-[#374151]">{children}</span>
  );
}

function DocumentBody({ documentId }: { documentId: string }) {
  switch (documentId) {
    case "lim-report":
      return (
        <>
          <div className="border-b border-[#e5e5e0] pb-5">
            <p className="font-serif text-lg font-bold text-[#111827]">
              Tauranga City Council
            </p>
            <p className="mt-1 font-serif text-base font-semibold text-[#374151]">
              Land Information Memorandum
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-[#6b7280]">
              <p>
                Reference: <DocRef>LIM-2023-04471</DocRef>
              </p>
              <p>
                Date: <DocRef>14 March 2023</DocRef>
              </p>
            </div>
          </div>

          <DocSection title="Property">
            <p>
              14 Cameron Road, Tauranga 3110. Legal description: Lot 3 DP 412847.
              Certificate of Title: <DocRef>SA47C/812</DocRef>.
            </p>
          </DocSection>

          <DocSection title="Zoning">
            <p>
              Residential Medium Density (RMD). No special housing area overlay.
            </p>
          </DocSection>

          <DocSection title="Rates">
            <p>
              Current annual rates $4,820. No arrears recorded.
            </p>
          </DocSection>

          <DocSection title="Building consents issued">
            <p>
              <DocRef>BC2021/0847</DocRef> (kitchen renovation),{" "}
              <DocRef>BC2009/0334</DocRef> (deck addition). Both code compliance
              certificates issued.
            </p>
          </DocSection>

          <DocSection title="Drainage">
            <p>
              Connected to reticulated sewer and stormwater. No overland flow path
              identified on this property.
            </p>
          </DocSection>

          <DocSection title="Hazards">
            <p>
              No contaminated land notice. No flood hazard overlay. No erosion or
              instability risk noted.
            </p>
          </DocSection>

          <p className="mt-8 border-t border-[#e5e5e0] pt-5 font-serif text-xs italic leading-relaxed text-[#6b7280]">
            This LIM is valid for 10 working days from date of issue. Tauranga City
            Council accepts no liability beyond this period.
          </p>
        </>
      );

    case "building-consent":
      return (
        <>
          <div className="border-b border-[#e5e5e0] pb-5">
            <p className="font-serif text-lg font-bold text-[#111827]">
              Tauranga City Council — Building Consent
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-[#6b7280]">
              <p>
                Consent number: <DocRef>BC2021/0847</DocRef>
              </p>
              <p>
                Date issued: <DocRef>14 June 2021</DocRef>
              </p>
            </div>
          </div>

          <DocSection title="Property">
            <p>14 Cameron Road, Tauranga</p>
          </DocSection>

          <DocSection title="Owner">
            <p>J &amp; M Thompson</p>
          </DocSection>

          <DocSection title="Description of work">
            <p>
              Kitchen renovation — removal of load-bearing wall and replacement
              with steel lintel (LVL 360×90). New kitchen layout, cabinetry, and
              appliances. Electrical and plumbing subcontracted.
            </p>
          </DocSection>

          <DocSection title="Licensed Building Practitioner">
            <p>
              Coastal Builds Ltd — LBP Licence No.{" "}
              <DocRef>LBP-118842</DocRef> (Dan Herewini)
            </p>
          </DocSection>

          <DocSection title="Inspections required">
            <p>Foundation, framing/lintel, pre-line, final</p>
          </DocSection>

          <DocSection title="Code compliance certificate issued">
            <p>
              <DocRef>22 November 2021</DocRef>
            </p>
          </DocSection>

          <DocSection title="Inspector sign-off">
            <p className="font-serif italic">
              &ldquo;All inspections completed satisfactorily. Work meets NZ
              Building Code requirements.&rdquo;
            </p>
          </DocSection>
        </>
      );

    case "electrical-coc":
      return (
        <>
          <div className="border-b border-[#e5e5e0] pb-5">
            <p className="font-serif text-lg font-bold text-[#111827]">
              Electrical Certificate of Compliance
            </p>
            <p className="mt-1 text-xs text-[#6b7280]">
              Issued under the Electricity Act 1992 and AS/NZS 3000:2018.
            </p>
          </div>

          <DocSection title="Contractor">
            <p>
              Bright Sparks Electrical Ltd. Registration No.{" "}
              <DocRef>EC12047</DocRef>.
            </p>
          </DocSection>

          <DocSection title="Work location">
            <p>14 Cameron Road, Tauranga</p>
          </DocSection>

          <DocSection title="Date of work">
            <p>
              <DocRef>18 July 2021</DocRef>
            </p>
          </DocSection>

          <DocSection title="Description">
            <p>
              Installation of 14 LED downlights (Philips CorePro 9W) throughout
              living room and hallway. New circuit added to DB. All wiring to
              AS/NZS 3000 standard.
            </p>
          </DocSection>

          <DocSection title="Test results">
            <p>
              Insulation resistance &gt;200MΩ. Earth continuity confirmed. RCD
              trip time &lt;30ms. All results within standard.
            </p>
          </DocSection>

          <DocSection title="Signed">
            <p>
              Ben Whitmore, Registered Electrician <DocRef>REL-28847</DocRef>
            </p>
          </DocSection>
        </>
      );

    case "dwelling-plans":
      return (
        <div className="flex flex-col items-center justify-center rounded-lg bg-[#f3f4f6] px-6 py-12 text-center">
          <svg
            viewBox="0 0 64 64"
            className="h-16 w-16 text-[#9ca3af]"
            fill="none"
            aria-hidden
          >
            <rect
              x="8"
              y="28"
              width="48"
              height="28"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M32 12L8 28h48L32 12z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M24 40h8M24 48h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="mt-6 font-serif text-base font-semibold text-[#374151]">
            Original architectural drawings — 14 Cameron Road
          </p>
          <p className="mt-2 text-sm text-[#6b7280]">
            Tauranga City Council Archives — 1998
          </p>
          <p className="mt-3 font-mono text-xs text-[#6b7280]">
            File reference: TCC-ARCH-1998-11432
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#6b7280]">
            These plans are held in digital archive. Contact Tauranga City Council
            on 07 577 7000 to request certified copies.
          </p>
        </div>
      );

    case "insurance-schedule":
      return (
        <>
          <div className="border-b border-[#e5e5e0] pb-5">
            <p className="font-serif text-lg font-bold text-[#111827]">
              IAG New Zealand Limited — State House Insurance
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-[#6b7280]">
              <p>
                Policy number: <DocRef>SHI-449-221-087</DocRef>
              </p>
              <p>
                Period: <DocRef>1 January 2026 – 31 December 2026</DocRef>
              </p>
            </div>
          </div>

          <DocSection title="Insured">
            <p>J &amp; M Thompson, 14 Cameron Road, Tauranga 3110</p>
          </DocSection>

          <DocSection title="Sum insured (house)">
            <p>$600,000</p>
          </DocSection>

          <DocSection title="Sum insured (contents)">
            <p>$85,000</p>
          </DocSection>

          <DocSection title="Annual premium">
            <p>$2,814 (incl. GST)</p>
          </DocSection>

          <DocSection title="Excess">
            <p>
              $500 standard. $1,500 for natural disaster events.
            </p>
          </DocSection>

          <DocSection title="Key covers">
            <p>
              Replacement cover, natural disaster, temporary accommodation up to
              $30,000, legal liability $1,000,000, underground services.
            </p>
          </DocSection>

          <DocSection title="Exclusions">
            <p>
              Gradual damage, pre-existing damage, intentional damage, wear and
              tear.
            </p>
          </DocSection>

          <div className="mt-6 rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-[#92400e]">
            <p className="font-semibold">Important note</p>
            <p className="mt-1">
              Your sum insured has not been updated since purchase. Rebuild costs
              in the Bay of Plenty have increased approximately 31% since 2022. We
              recommend reviewing your sum insured.
            </p>
          </div>
        </>
      );

    default:
      return null;
  }
}

export function DocumentModal({ vaultDocument, onClose }: DocumentModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        aria-label="Close document"
        onClick={onClose}
      />

      <div className="relative flex max-h-[92vh] w-full max-w-[680px] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-violet/20 bg-violet-light px-5 py-4">
          <h2
            id="document-modal-title"
            className="min-w-0 truncate text-base font-semibold text-violet sm:text-lg"
          >
            {vaultDocument.name}
          </h2>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="hidden rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-bg-secondary sm:inline-flex"
            >
              Download PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:bg-bg-secondary hover:text-foreground"
              aria-label="Close"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto bg-[#FAFAF8] px-5 py-6 font-serif sm:px-8 sm:py-8">
          <DocumentBody documentId={vaultDocument.id} />
        </div>
      </div>
    </div>
  );
}
