import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export function getSuapabaseServerComponent() {
  cookies().getAll();
  return createServerComponentClient({ cookies });
}
