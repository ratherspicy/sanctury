import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FinancesView } from "./finances-view";

export default async function FinancesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/my-sanctury/login");
  }

  return <FinancesView />;
}
