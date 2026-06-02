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

  const { data: homeowner } = await supabase
    .from("homeowners")
    .select("full_name")
    .eq("email", user.email)
    .single();

  const fullName =
    homeowner?.full_name ||
    (typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : null) ||
    "there";

  const firstName = fullName.split(" ")[0] ?? fullName;

  return <DashboardView firstName={firstName} />;
}
