import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PropertyMapView } from "./property-map-view";

export default async function PropertyMapPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/my-sanctury/login");
  }

  return <PropertyMapView />;
}
