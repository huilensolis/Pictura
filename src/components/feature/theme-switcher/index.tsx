"use client";

import { useTheme } from "../../../hooks/use-theme";

export function ThemeSwitcher() {
  const { theme, setDarkTheme, setLightTheme } = useTheme();

  function toggleTheme() {
    if (theme === "dark") {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  }

  return <></>;
}
