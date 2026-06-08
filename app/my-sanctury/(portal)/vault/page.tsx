import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VaultView } from "./vault-view";

export default async function PropertyPassportPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/my-sanctury/login");
  }

  return <VaultView />;
}
