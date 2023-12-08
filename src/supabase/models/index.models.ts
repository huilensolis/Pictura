import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../types";

export function getSuapabaseServerComponent() {
  cookies().getAll();
  return createServerComponentClient<Database>({ cookies });
}
