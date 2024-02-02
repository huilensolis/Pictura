"use server";

import {
  getSuapabaseServerComponent,
  getSupabaseServerComponentWithAdminRole,
} from "@/supabase/models/index.models";

export async function deleteAccount() {
  const supabase = await getSuapabaseServerComponent();

  const supabaseWithAdmin = await getSupabaseServerComponentWithAdminRole();

  try {
    const {
      data: { session },
      error: errorFindingSession,
    } = await supabase.auth.getSession();

    if (!session || errorFindingSession || !session.user || !session.user.id) {
      throw new Error("error finding user session");
    }

    const { error } = await supabaseWithAdmin.auth.admin.deleteUser(
      session.user.id,
    );

    if (error) throw new Error("error deleting user");
  } catch (e) {
    throw new Error("Error deleting account");
  }
}
