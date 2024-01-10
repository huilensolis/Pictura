"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getSession() {
      setIsLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    }

    getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logOut() {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      setIsLoading(false);
      console.log({ error });
      if (error) return Promise.reject();
      setSession(null);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  return { session, isLoading, logOut };
}
