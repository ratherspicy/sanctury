import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardView } from "./dashboard-view";

export default async function MySancturyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/my-sanctury/login");
  }

  const fullName =
    (typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : null) ?? user.email?.split("@")[0] ?? "there";

  const firstName = fullName.split(" ")[0] ?? fullName;

  return <DashboardView firstName={firstName} />;
}
