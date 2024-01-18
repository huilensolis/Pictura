"use server";

import { getSuapabaseServerComponent } from "@/supabase/models/index.models";

export async function deleteAccount(formData: FormData) {
  const userId = formData.get("userId");

  if (!userId || typeof userId !== "string") throw new Error("Invalid userId");

  const supabase = getSuapabaseServerComponent();

  try {
    await supabase.from("users").delete().eq("id", userId);
  } catch (e) {
    throw new Error("Error deleting account");
  }
}
