import { MarketplaceShell } from "@/app/components/marketplace-shell";
import { InsuranceProposalsView } from "./proposals-view";

export default function InsuranceProposalsPage() {
  return (
    <MarketplaceShell backHref="/marketplace/insurance" backLabel="Edit request">
      <InsuranceProposalsView />
    </MarketplaceShell>
  );
}
