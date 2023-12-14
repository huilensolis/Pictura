"use client";

import { Database } from "@/supabase/types";
import { useSupabase } from "../use-supabase";
import { ProfileStore } from "@/zustand/profile";

export function useUserProfile() {
  const { supabase } = useSupabase();

  const profileStoreData = ProfileStore((store) => store.data);
  const updateProfileStore = ProfileStore((store) => store.updateStoreData);

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
    userId: string,
  ) {
    try {
      const { error } = await supabase
        .from("profiles")
        .update(values)
        .eq("user_id", userId)
        .single();
      if (error) return Promise.reject(error);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function syncStoreProfileData() {}

  function updateProfileStoreData(
    data: Database["public"]["Tables"]["profiles"]["Row"],
  ) {
    updateProfileStore(data);
  }

  async function getCurrentUserProfile(userId: string): Promise<{
    data: Database["public"]["Tables"]["profiles"]["Row"] | null;
    error: unknown;
  }> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!data || error) return Promise.reject({ error });

      return Promise.resolve({ data, error });
    } catch (error) {
      return Promise.resolve({ error, data: null });
    }
  }

  async function validateIfUsernameIsAvailabe(
    username: string,
    userId: string,
  ): Promise<boolean> {
    const { data: currentUserProfile, error: errorFetchingUserProfile } =
      await getCurrentUserProfile(userId);

    if (errorFetchingUserProfile) {
      await createUserProfile(userId);
    }

    if (username === currentUserProfile?.username) return true;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (!data || error) return true;
    return false;
  }
  return {
    updateUserProfile,
    createUserProfile,
    getCurrentUserProfile,
    syncStoreProfileData,
    updateProfileStoreData,
    validateIfUsernameIsAvailabe,
  };
}
