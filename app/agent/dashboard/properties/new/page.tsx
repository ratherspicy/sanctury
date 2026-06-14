import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AGENT_SESSION_COOKIE } from "@/lib/agent/auth";
import { CreatePropertyView } from "./create-property-view";

export default async function CreatePropertyPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AGENT_SESSION_COOKIE);

  if (!session?.value) {
    redirect("/agent/login?error=auth");
  }

  return <CreatePropertyView />;
}
