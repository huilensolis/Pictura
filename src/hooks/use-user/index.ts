"use client";

import { type User } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useSupabase } from "../use-supabase";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { supabase } = useSupabase();

  useEffect(() => {
    async function syncCurrentUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) setUser(user);
        else setUser(null);
      } catch (error) {
        setUser(null);
      }
      setIsLoading(false);
    }
    syncCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return { updatePassword, user, isLoading };
}
