"use client";

import { useEffect, useState } from "react";
import "@theme-toggles/react/css/Within.css";
import { Within } from "@theme-toggles/react";

export function ThemeSwitcher() {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsToggled(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isToggled]);

  function toggleTheme() {
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
    setIsToggled(!isToggled);
  }

  return <Within duration={750} onToggle={toggleTheme} toggled={isToggled} />;
}
