"use client";

import {
  type Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export function useUser() {
  const [session, setSession] = useState<Session | null>(null);
  //const [user, setUser] = useState(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session || error) return;

      setSession(session);
    }
    getSession();
  }, [supabase.auth]);

  // useEffect(() => {
  //   async function getUser() {
  //     const {
  //       data: { user: userFromAuth },
  //       error,
  //     } = await supabase.auth.getUser();
  //     if (!user || error) return;
  //     setUser(userFromAuth);
  //   }
  //   if (session) {
  //     getUser();
  //   }
  // }, [session]);

  async function updatePassword(password: string) {
    if (!session) return;

    try {
      await supabase.auth.updateUser({ password });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  return { updatePassword };
}
