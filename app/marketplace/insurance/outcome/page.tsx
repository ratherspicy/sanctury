import { MarketplaceShell } from "@/app/components/marketplace-shell";
import { InsuranceOutcomeView } from "./outcome-view";

export default function InsuranceOutcomePage() {
  return (
    <MarketplaceShell backHref="/marketplace/insurance/followup" backLabel="Back to contact check">
      <InsuranceOutcomeView />
    </MarketplaceShell>
  );
}
