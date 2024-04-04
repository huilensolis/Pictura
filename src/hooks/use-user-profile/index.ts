import { useEffect, useState } from "react";
import { useUser } from "../use-user";
import { Database } from "@/supabase/types";
import { useSupabase } from "../use-supabase";

export function useUserProfile() {
  const { user, isLoading: isLoadingUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const [userProfile, setUserProfile] = useState<
    Database["public"]["Tables"]["profiles"]["Row"] | null
  >(null);

  const { supabase } = useSupabase();

  useEffect(() => {
    async function fetchUserProfile(
      userId: Database["public"]["Tables"]["users"]["Row"]["id"],
      abortSignal: AbortSignal,
    ) {
      try {
        setIsLoading(true);

        const { error, data } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", userId)
          .abortSignal(abortSignal)
          .single();

        if (error) throw error;

        if (!data) throw new Error("No profile found");

        setUserProfile(data);
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error &&
          "message" in error &&
          typeof error.message === "string" &&
          error.message.includes("AbortError")
        )
          return;
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    const abortController = new AbortController();

    if (!isLoadingUser && user?.id) {
      fetchUserProfile(user.id, abortController.signal);
    }

    return () => {
      abortController.abort();
    };
  }, [user]);

  return { isLoading, userProfile };
}
