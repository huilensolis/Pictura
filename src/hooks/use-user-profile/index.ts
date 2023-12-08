import { Database } from "@/supabase/types";
import { useSupabase } from "../use-supabase";
import { useUser } from "../use-user";

export function useUserProfile() {
  const { user } = useUser();

  const { supabase } = useSupabase();

  async function createUserProfile(userId: string) {
    try {
      await supabase.from("profiles").insert({ user_id: userId });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function updateUserProfile(
    values: Database["public"]["Tables"]["profiles"]["Row"],
  ) {
    const { error, data } = await getCurrentUserProfile();
    if (!data || error) {
      await createUserProfile(user.id);
    }
    try {
      await supabase.from("profiles").update(values).eq("user_id", user.id);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function getCurrentUserProfile(): {
    error: unknwon | null;
    data: Database["public"]["Tables"]["profiles"]["Row"] | null;
  } {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id);
      if (!data || error) return Promise.reject(error);
      return Promise.resolve({ data });
    } catch (error) {
      return Promise.reject({ error });
    }
  }

  return { updateUserProfile, createUserProfile };
}
