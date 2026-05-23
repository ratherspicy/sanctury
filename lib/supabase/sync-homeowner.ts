import type { User } from "@supabase/supabase-js";
import { createAdminClient } from "./admin";

/** Upsert a homeowners row linked to the Supabase Auth user. */
export async function syncHomeownerProfile(user: User) {
  const admin = createAdminClient();
  const fullName =
    (typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : null) ??
    (typeof user.user_metadata?.name === "string"
      ? user.user_metadata.name
      : null);

  const { error } = await admin.from("homeowners").upsert(
    {
      id: user.id,
      email: user.email ?? "",
      full_name: fullName,
    },
    { onConflict: "id" }
  );

  if (error) {
    throw error;
  }
}
