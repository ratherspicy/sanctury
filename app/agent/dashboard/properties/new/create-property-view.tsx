"use client";

import { useState } from "react";
import Link from "next/link";
import { AgentNav } from "../../components/agent-nav";
import { AddressAutocomplete } from "@/app/check/address-autocomplete";
import { PROPERTY } from "@/lib/my-sanctury/handover-data";

const STEPS = ["Property", "Sale", "Documents", "Invite", "Done"] as const;

// Demo handover context — pre-filled so the agent can walk the story quickly.
const DEMO = {
  settlementDate: "2024-03-15",
  settlementDateLabel: "15 March 2024",
  salePrice: "1,285,000",
  occupancy: "10+ years",
  agentName: "Mark Williams",
  agency: "Tall Poppy Real Estate",
  inviteEmail: "jane.thompson@example.com",
} as const;

const DOCUMENTS = [
  { id: "lim", label: "LIM Report", file: "LIM Report 2024.pdf" },
  { id: "consent", label: "Building Consent", file: "Building Consent 1998.pdf" },
  { id: "electrical", label: "Electrical Certificate", file: "Electrical CoC 2019.pdf" },
  { id: "photos", label: "Property Photos", file: "8 photos uploaded" },
] as const;

const inputClass =
  "mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted/60 focus:border-[#2E8B57] focus:outline-none focus:ring-0";

function DocIcon({ id }: { id: string }) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === "photos") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" {...stroke} />
        <circle cx="8.5" cy="10" r="1.5" {...stroke} />
        <path d="M21 16l-5-5L5 19" {...stroke} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" {...stroke} />
      <path d="M14 2v6h6M8 13h8M8 17h8" {...stroke} />
    </svg>
  );
}

export function CreatePropertyView() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<string>(PROPERTY.address);
  const [region, setRegion] = useState<string>(PROPERTY.region);
  const [regionAutoSet, setRegionAutoSet] = useState(false);

  const [settlementDate, setSettlementDate] = useState<string>(DEMO.settlementDate);
  const [salePrice, setSalePrice] = useState<string>(DEMO.salePrice);
  const [occupancy, setOccupancy] = useState<string>(DEMO.occupancy);
  const [agentName, setAgentName] = useState<string>(DEMO.agentName);
  const [agency, setAgency] = useState<string>(DEMO.agency);
  const [inviteEmail, setInviteEmail] = useState<string>(DEMO.inviteEmail);

  const goNext = () => setStep((s) => Math.min(STEPS.length, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="flex min-h-full flex-col bg-bg-secondary">
      <AgentNav />

      <main className="flex-1">
        {/* Sea green header + step indicator */}
        <section
          className="border-b-4 border-[#3CB371] px-6 py-8 text-white lg:px-8"
          style={{
            background:
              "linear-gradient(135deg, #1a5c3a 0%, #2E8B57 50%, #3CB371 100%)",
          }}
        >
          <div className="mx-auto max-w-2xl">
            <Link
              href="/agent/dashboard"
              className="text-xs font-medium uppercase tracking-widest text-white/70 hover:text-white"
            >
              ← Agent dashboard
            </Link>
            <h1 className="!text-white mt-2 text-2xl font-black sm:text-3xl">
              {step < STEPS.length
                ? "Prepare property handover"
                : "Handover ready"}
            </h1>
            <p className="mt-1 text-sm text-white/85">
              Step {Math.min(step, STEPS.length)} of {STEPS.length} ·{" "}
              {STEPS[step - 1]}
            </p>

            {/* Step segments */}
            <ol className="mt-5 flex gap-1.5">
              {STEPS.map((label, i) => {
                const n = i + 1;
                const done = n < step;
                const active = n === step;
                return (
                  <li key={label} className="flex-1">
                    <div
                      className={`h-1.5 rounded-full ${
                        done || active ? "bg-white" : "bg-white/30"
                      }`}
                    />
                    <span
                      className={`mt-1.5 hidden text-[11px] font-medium sm:block ${
                        done || active ? "text-white" : "text-white/50"
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          {/* STEP 1 — Property search */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="card p-5 sm:p-6">
                <h2 className="text-lg font-bold text-foreground">
                  Find the property
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Search the address — we&apos;ll pull the property profile from
                  council and LINZ records.
                </p>
                <div className="mt-5">
                  <AddressAutocomplete
                    address={address}
                    region={region}
                    onAddressChange={setAddress}
                    onRegionChange={setRegion}
                    regionAutoSet={regionAutoSet}
                    onRegionAutoSet={setRegionAutoSet}
                  />
                </div>
              </div>

              {address && (
                <div className="card p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">
                      Property profile
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F5EC] px-2.5 py-1 text-xs font-medium text-[#2E8B57]">
                      Auto-populated
                    </span>
                  </div>
                  <dl className="mt-4 grid grid-cols-3 gap-3">
                    <div>
                      <dt className="text-xs text-muted">Floor area</dt>
                      <dd className="mt-0.5 text-base font-bold text-foreground">
                        {PROPERTY.floorArea}m²
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted">Year built</dt>
                      <dd className="mt-0.5 text-base font-bold text-foreground">
                        {PROPERTY.yearBuilt}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted">Build quality</dt>
                      <dd className="mt-0.5 text-base font-bold text-foreground">
                        {PROPERTY.buildQuality}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}

              <button
                type="button"
                onClick={goNext}
                disabled={!address}
                className="w-full rounded-full bg-[#2E8B57] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a5c3a] disabled:opacity-50"
              >
                Confirm property
              </button>
            </div>
          )}

          {/* STEP 2 — Sale details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="card p-5 sm:p-6">
                <h2 className="text-lg font-bold text-foreground">
                  Sale details
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Captured at settlement — this seeds the homeowner&apos;s
                  financial picture.
                </p>

                <div className="mt-5 space-y-5">
                  <div>
                    <label
                      htmlFor="settlement"
                      className="block text-sm font-medium text-foreground"
                    >
                      Settlement date
                    </label>
                    <input
                      id="settlement"
                      type="date"
                      className={inputClass}
                      value={settlementDate}
                      onChange={(e) => setSettlementDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-foreground"
                    >
                      Sale price
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-muted">
                        $
                      </span>
                      <input
                        id="price"
                        type="text"
                        inputMode="numeric"
                        className={`${inputClass} pl-8`}
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="occupancy"
                      className="block text-sm font-medium text-foreground"
                    >
                      Previous owner occupied
                    </label>
                    <select
                      id="occupancy"
                      className={inputClass}
                      value={occupancy}
                      onChange={(e) => setOccupancy(e.target.value)}
                    >
                      <option value="<2 years">Less than 2 years</option>
                      <option value="2-5 years">2–5 years</option>
                      <option value="5-10 years">5–10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="agent"
                        className="block text-sm font-medium text-foreground"
                      >
                        Agent name
                      </label>
                      <input
                        id="agent"
                        type="text"
                        className={inputClass}
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="agency"
                        className="block text-sm font-medium text-foreground"
                      >
                        Agency
                      </label>
                      <input
                        id="agency"
                        type="text"
                        className={inputClass}
                        value={agency}
                        onChange={(e) => setAgency(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <StepNav onBack={goBack} onNext={goNext} nextLabel="Continue" />
            </div>
          )}

          {/* STEP 3 — Documents */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="card p-5 sm:p-6">
                <h2 className="text-lg font-bold text-foreground">
                  Property documents
                </h2>
                <p className="mt-1 text-sm text-muted">
                  These transfer with the property. The homeowner inherits every
                  file.
                </p>

                <div className="mt-5 space-y-3">
                  {DOCUMENTS.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-3 rounded-xl border border-[#3CB371]/40 bg-[#F2FAF5] p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#2E8B57]">
                        <DocIcon id={doc.id} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          {doc.label}
                        </p>
                        <p className="truncate text-xs text-muted">{doc.file}</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-[#2E8B57]">
                        Uploaded ✅
                      </span>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-transparent px-4 py-4 text-sm font-medium text-muted transition-colors hover:border-[#2E8B57] hover:text-[#2E8B57]"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    Add document
                  </button>
                </div>
              </div>

              <StepNav onBack={goBack} onNext={goNext} nextLabel="Continue" />
            </div>
          )}

          {/* STEP 4 — Invite new owner */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="card p-5 sm:p-6">
                <h2 className="text-lg font-bold text-foreground">
                  Invite the new owner
                </h2>
                <p className="mt-1 text-sm text-muted">
                  They&apos;ll claim the record with a secure link — no password
                  to set up.
                </p>

                <div className="mt-5">
                  <label
                    htmlFor="invite"
                    className="block text-sm font-medium text-foreground"
                  >
                    New owner&apos;s email
                  </label>
                  <input
                    id="invite"
                    type="email"
                    className={inputClass}
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>

                {/* Preview of the invitation */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    They&apos;ll receive
                  </p>
                  <div className="mt-2 rounded-xl border border-border bg-bg-secondary p-5">
                    <p className="text-sm font-semibold text-foreground">
                      You&apos;re invited to claim your property record for
                    </p>
                    <p className="mt-1 text-base font-bold text-foreground">
                      {address}
                    </p>
                    <p className="mt-3 text-xs text-muted">
                      Prepared by {agentName} · {agency}
                    </p>
                    <p className="text-xs text-muted">
                      Settlement {DEMO.settlementDateLabel} · ${salePrice}
                    </p>
                    <span className="mt-4 inline-flex rounded-full bg-[#2E8B57] px-4 py-2 text-xs font-semibold text-white">
                      Claim your property record →
                    </span>
                  </div>
                </div>
              </div>

              <StepNav
                onBack={goBack}
                onNext={goNext}
                nextLabel="Send invite"
              />
            </div>
          )}

          {/* STEP 5 — Confirmation */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="card p-6 text-center sm:p-8">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E7F5EC] text-3xl">
                  ✅
                </span>
                <h2 className="mt-4 text-xl font-black text-foreground">
                  Property record created
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Invitation sent to{" "}
                  <span className="font-semibold text-foreground">
                    {inviteEmail}
                  </span>
                </p>

                <dl className="mx-auto mt-6 max-w-sm space-y-3 text-left">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <dt className="text-sm text-muted">Property</dt>
                    <dd className="text-sm font-semibold text-foreground">
                      {address}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <dt className="text-sm text-muted">Documents uploaded</dt>
                    <dd className="text-sm font-semibold text-foreground">
                      {DOCUMENTS.length}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <dt className="text-sm text-muted">Settlement</dt>
                    <dd className="text-sm font-semibold text-foreground">
                      {DEMO.settlementDateLabel}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-muted">Sale price</dt>
                    <dd className="text-sm font-semibold text-foreground">
                      ${salePrice}
                    </dd>
                  </div>
                </dl>

                <Link
                  href="/agent/dashboard"
                  className="mt-7 inline-flex rounded-full bg-[#2E8B57] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a5c3a]"
                >
                  Return to dashboard
                </Link>
              </div>

              <p className="px-2 text-center text-xs leading-relaxed text-muted">
                Jane will inherit this complete property record including all
                documents, the maintenance history, and the infrastructure map
                when she accepts the invitation.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
  nextLabel,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
}) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={onBack}
        className="rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-bg-secondary"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className="flex-1 rounded-full bg-[#2E8B57] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a5c3a]"
      >
        {nextLabel}
      </button>
    </div>
  );
}
