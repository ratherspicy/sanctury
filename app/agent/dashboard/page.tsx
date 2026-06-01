import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AGENT_SESSION_COOKIE } from "@/lib/agent/auth";
import { AgentDashboardView } from "./dashboard-view";

export default async function AgentDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AGENT_SESSION_COOKIE);

  if (!session?.value) {
    redirect("/agent/login?error=auth");
  }

  return <AgentDashboardView />;
}
