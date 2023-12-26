"use client";

import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useProtectRouteFromUnauthUsers() {
  const [isCheckingUser, setIsCheckingUser] = useState<boolean>(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  const { session } = useSession();

  useEffect(() => {
    async function checkSession() {
      setIsCheckingUser(true);
      setIsUserLoggedIn(Boolean(session));
      setIsCheckingUser(true);
    }
    function checkSessionIfTabMakesVisibleAgain() {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    }
    if (window) {
      window.addEventListener(
        "visibilitychange",
        checkSessionIfTabMakesVisibleAgain,
      );
    }

    checkSession();

    return () => {
      if (window)
        window.removeEventListener(
          "visibilitychange",
          checkSessionIfTabMakesVisibleAgain,
        );
    };
  }, [session]);

  if (!isUserLoggedIn && !isCheckingUser) {
    router.push("/auth/sign-up");
  }
}

export function useProtectRouteFromAuthUsers() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  const { session } = useSession();

  useEffect(() => {
    async function checkSession() {
      setIsUserLoggedIn(Boolean(session));
    }
    function checkSessionIfTabMakesVisibleAgain() {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    }
    if (window) {
      window.addEventListener(
        "visibilitychange",
        checkSessionIfTabMakesVisibleAgain,
      );
    }
    checkSession();

    return () => {
      if (window)
        window.removeEventListener(
          "visibilitychange",
          checkSessionIfTabMakesVisibleAgain,
        );
    };
  }, [isUserLoggedIn, session]);

  if (isUserLoggedIn) {
    router.push("/app");
  }
}
