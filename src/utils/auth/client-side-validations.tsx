"use client";

import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useProtectRouteFromUnauthUsers() {
  const [isCheckingUser, setIsCheckingUser] = useState<boolean>(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  const { user, isLoading } = useUser();

  useEffect(() => {
    async function checkSession() {
      setIsCheckingUser(true);
      setIsUserLoggedIn(Boolean(user));
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
    if (!isLoading) {
      checkSession();
    }

    return () => {
      if (window)
        window.removeEventListener(
          "visibilitychange",
          checkSessionIfTabMakesVisibleAgain,
        );
    };
  }, [user]);

  if (!isUserLoggedIn && !isCheckingUser) {
    router.push("/auth/sign-up");
  }
}

export function useProtectRouteFromAuthUsers() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    async function checkSession() {
      setIsUserLoggedIn(Boolean(user));
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
  }, [isUserLoggedIn, user]);

  if (isUserLoggedIn) {
    router.push("/app");
  }
}
