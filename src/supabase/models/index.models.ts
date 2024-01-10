import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../types";

export function getSuapabaseServerComponent() {
  const cookiesStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookiesStore });
}
