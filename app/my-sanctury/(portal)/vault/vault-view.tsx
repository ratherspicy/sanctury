import {
  MAINTENANCE_EVENTS,
  VAULT_DOCUMENTS,
  VAULT_STATS,
  type DocumentCategory,
  type MaintenanceCategory,
} from "@/lib/my-sanctury/vault-data";

function PdfIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-violet"
      fill="none"
      aria-hidden
    >
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M8 13h1M8 17h8M8 9h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function documentBadgeClass(category: DocumentCategory): string {
  switch (category) {
    case "Certificate":
      return "bg-accent-light text-accent";
    case "Plans":
      return "bg-bg-secondary text-muted";
    default:
      return "bg-violet-light text-violet";
  }
}

function maintenanceBadgeClass(category: MaintenanceCategory): string {
  switch (category) {
    case "Electrical":
      return "bg-accent-light text-accent";
    case "Renovation":
      return "bg-violet-light text-violet";
    case "Plumbing":
      return "bg-sky-50 text-sky-700";
    default:
      return "bg-bg-secondary text-muted";
  }
}

export function VaultView() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Property Passport
          </h1>
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

      {/* Documents */}
      <section>
        <h2 className="text-lg font-semibold text-foreground">Documents</h2>
        <p className="mt-1 text-sm text-muted">
          Building consents, LIM reports, certificates, plans and policy
          documents.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {VAULT_DOCUMENTS.map((doc) => (
            <article key={doc.id} className="card flex flex-col p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-light">
                  <PdfIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">{doc.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{doc.issuer}</p>
                  <p className="mt-0.5 text-xs text-muted">{doc.dateIssued}</p>
                  {doc.note && (
                    <p className="mt-2 text-xs italic text-muted">{doc.note}</p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${documentBadgeClass(doc.category)}`}
                >
                  {doc.category}
                </span>
                <button type="button" className="btn-ghost h-8 px-3 text-xs">
                  View
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Maintenance log */}
      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Maintenance Log
        </h2>
        <p className="mt-1 text-sm text-muted">
          Every repair, renovation, and inspection. Who did it, what they found,
          and what was fixed.
        </p>

        <div className="relative mt-6 space-y-0">
          <div
            className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-violet/30"
            aria-hidden
          />
          {MAINTENANCE_EVENTS.map((event, index) => (
            <article
              key={event.id}
              className={`relative pl-8 ${index < MAINTENANCE_EVENTS.length - 1 ? "pb-8" : ""}`}
            >
              <span
                className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-violet bg-surface"
                aria-hidden
              />
              <div className="card p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-sm font-bold text-foreground">
                    {event.date}
                  </p>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${maintenanceBadgeClass(event.category)}`}
                  >
                    {event.category}
                  </span>
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
          ))}
        </div>
      </section>
    </div>
  );
}
