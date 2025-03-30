"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function useThemeEffect() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Add theme transition class to body
    document.body.classList.add("transition-colors", "duration-300");

    // Check for user's preferred color scheme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }

    // Add listener for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setTheme]);

  return { theme, setTheme };
}
