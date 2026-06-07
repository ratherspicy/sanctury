import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { PARTNER_SESSION_COOKIE } from "@/lib/partner/auth";
import { getLeadById } from "@/lib/partner/dashboard-data";
import { LeadDetailView } from "./lead-detail-view";

type LeadDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get(PARTNER_SESSION_COOKIE);

  if (!session?.value) {
    redirect("/partners/login?error=auth");
  }

  const { id } = await params;
  const lead = getLeadById(id);

  if (!lead) {
    notFound();
  }

  return <LeadDetailView lead={lead} />;
}
