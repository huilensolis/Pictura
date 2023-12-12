import { Database } from "@/supabase/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function useSupabase() {
  const supabase = createClientComponentClient<Database>();

  return { supabase };
}
