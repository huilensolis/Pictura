"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof localStorage === "undefined") return "light";

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function setDarkTheme() {
    if (typeof localStorage === "undefined" || typeof document === "undefined")
      return;
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    setTheme("dark");
  }

  function setLightTheme() {
    if (typeof localStorage === "undefined" || typeof document === "undefined")
      return;
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    setTheme("light");
  }

  return {
    setLightTheme,
    setDarkTheme,
    theme,
  };
}
