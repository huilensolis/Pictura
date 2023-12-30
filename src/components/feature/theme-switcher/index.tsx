"use client";

import "@theme-toggles/react/css/Within.css";
import { Within } from "@theme-toggles/react";
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

  return (
    <Within
      duration={750}
      onToggle={toggleTheme}
      toggled={theme === "dark"}
      placeholder={null}
    />
  );
}
