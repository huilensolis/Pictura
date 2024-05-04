import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { Database } from "../types";

export function getSuapabaseServerComponent() {
  const cookiesStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookiesStore });
}

export function getSupabaseServerComponentWithAdminRole() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey)
    throw new Error("missing supabase url or service role key");

  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
