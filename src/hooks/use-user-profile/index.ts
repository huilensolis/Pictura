"use client";

import { Database } from "@/supabase/types";
import { useSupabase } from "../use-supabase";
import { useUser } from "../use-user";
import { useEffect, useState } from "react";
import { updateProfile as updateUserProfileServerAction } from "@/actions/update-profile";

export function useUserProfile() {
  const { isLoading: isLoadingUser, user } = useUser();
  const [isLoading, setLoading] = useState<boolean>(true);

  const [userProfile, setUserProfile] = useState<
    Database["public"]["Tables"]["profiles"]["Row"] | null
  >();

  useEffect(() => {
    if (!isLoadingUser && user && !userProfile) setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser]);

  const { supabase } = useSupabase();

  useEffect(() => {
    async function fetchUserProfile(userId: string) {
      setLoading(true);
      const { error, data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error || !data) {
        setLoading(false);
        return setUserProfile(null);
      }

      setUserProfile(data);
      setLoading(false);
    }

    if (!isLoadingUser && user?.id) {
      fetchUserProfile(user?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser]);

  async function createUserProfile() {
    if (isLoading) throw new Error("Loading user profile");
    if (!user) throw new Error("User not found");

    try {
      await supabase.from("profiles").insert({ user_id: user?.id });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function updateUserProfile(
    values: Database["public"]["Tables"]["profiles"]["Update"],
  ) {
    try {
      await updateUserProfileServerAction(values);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function validateIfUsernameIsAvailabe(
    username: string,
  ): Promise<boolean> {
    if (isLoading) throw new Error("Loading user profile");
    if (!user) throw new Error("User not found");

    if (!userProfile) {
      await createUserProfile();
    }

    if (username === userProfile?.username) return true;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (!data || error) return true;
    return false;
  }

  return {
    isLoading,
    userProfile,
    updateUserProfile,
    createUserProfile,
    validateIfUsernameIsAvailabe,
  };
}
