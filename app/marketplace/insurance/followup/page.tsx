import { MarketplaceShell } from "@/app/components/marketplace-shell";
import { InsuranceFollowupView } from "./followup-view";

export default function InsuranceFollowupPage() {
  return (
    <MarketplaceShell backHref="/marketplace/insurance/confirmed" backLabel="Back to confirmation">
      <InsuranceFollowupView />
    </MarketplaceShell>
  );
}
