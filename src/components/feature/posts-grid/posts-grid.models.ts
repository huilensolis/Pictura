import { Database } from "@/supabase/types";

export type TPostsGridItem = Database["public"]["Tables"]["posts"]["Row"];