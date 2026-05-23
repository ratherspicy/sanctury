import { PLACEHOLDER_DASHBOARD } from "@/lib/my-sanctury/dashboard-data";
import { AlertFeedSection } from "./components/alert-feed";
import { MarketplaceRequestsSection } from "./components/marketplace-requests";
import { MyReportCardSection } from "./components/my-report-card";
import { PropertyDetailsSection } from "./components/property-details-card";
import { PropertySnapshotSection } from "./components/property-snapshot";

type DashboardViewProps = {
  firstName: string;
};

export function DashboardView({ firstName }: DashboardViewProps) {
  const data = PLACEHOLDER_DASHBOARD;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-hero-glow/60 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-8 lg:py-12">
        <div className="mb-8">
          <p className="text-sm text-muted">Good to see you, {firstName}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your home at a glance
          </h1>
        </div>

        <div className="space-y-8">
          <PropertySnapshotSection data={data.property} />
          <AlertFeedSection alerts={data.alerts} />
          <MarketplaceRequestsSection requests={data.marketplaceRequests} />
          <MyReportCardSection lastHealthCheckDate={data.lastHealthCheckDate} />
          <PropertyDetailsSection details={data.propertyDetails} />
        </div>
      </div>
    </div>
  );
}
