"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useProtectRouteFromUnauthUsers() {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const supabase = createClientComponentClient();
    async function checkSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        setError(true);
        return;
      }
      setSession(session);
    }
    function checkSessionIfTabMakesVisibleAgain() {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    }
    if (window) {
      window.addEventListener(
        "visibilitychange",
        checkSessionIfTabMakesVisibleAgain
      );
    }
    checkSession();

    return () => {
      if (window)
        window.removeEventListener(
          "visibilitychange",
          checkSessionIfTabMakesVisibleAgain
        );
    };
  }, [session]);

  if (!session || error) {
    router.push("/auth/sign-up");
  }
}

export function useProtectRouteFromAuthUsers() {
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();

  useEffect(() => {
    const supabase = createClientComponentClient();
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    }

    function checkSessionIfTabMakesVisibleAgain() {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    }
    checkSession();
    if (window) {
      window.addEventListener(
        "visibilitychange",
        checkSessionIfTabMakesVisibleAgain
      );
    }

    return () => {
      if (window)
        window.removeEventListener(
          "visibilitychange",
          checkSessionIfTabMakesVisibleAgain
        );
    };
  }, [session]);

  if (session) {
    router.push("/app");
  }
}
