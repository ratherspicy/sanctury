import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MaintenanceView } from "./maintenance-view";

export default async function MaintenancePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/my-sanctury/login");
  }

  return <MaintenanceView />;
}
