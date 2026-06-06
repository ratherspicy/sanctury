import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { AGENT_SESSION_COOKIE } from "@/lib/agent/auth";
import { getClientById } from "@/lib/agent/dashboard-data";
import { ClientProfileView } from "./client-profile-view";

type ClientProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientProfilePage({ params }: ClientProfilePageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get(AGENT_SESSION_COOKIE);

  if (!session?.value) {
    redirect("/agent/login?error=auth");
  }

  const { id } = await params;
  const client = getClientById(id);

  if (!client) {
    notFound();
  }

  return <ClientProfileView client={client} />;
}
