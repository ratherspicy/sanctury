import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PARTNER_SESSION_COOKIE } from "@/lib/partner/auth";
import { PartnerDashboardView } from "./dashboard-view";

export default async function PartnerDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(PARTNER_SESSION_COOKIE);

  if (!session?.value) {
    redirect("/partners/login?error=auth");
  }

  return <PartnerDashboardView />;
}
