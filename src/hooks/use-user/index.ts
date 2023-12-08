"use client";

import { Database } from "@/supabase/types";
import {
  type Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export function useUser() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [user, setUser] =
    useState<Database["public"]["Tables"]["users"]["Row"]>(null);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    async function getSession() {
      setLoading(true);
      try {
        const {
          data: { session },
          error: error,
        } = await supabase.auth.getSession();
        if (!session || error) {
          return setSession(null);
        }
        setUser(session.user ?? null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    getSession();
  }, []);

  async function updatePassword(password: string) {
    if (!user) return;

    try {
      await supabase.auth.updateUser({ password });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  async function validateIfUsernameIsAvailabe(
    username: string,
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (!data || error) return true;
    return false;
  }

  return { updatePassword, validateIfUsernameIsAvailabe, user, isLoading };
}
