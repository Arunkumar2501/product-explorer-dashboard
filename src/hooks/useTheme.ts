"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme-preference";

/**
 * Hook for managing theme (light/dark mode) using localStorage
 * Handles client-side state and persistence
 * Applies/removes the "dark" class on the <html> element
 */
/**
 * Applies the theme class to the HTML element
 * Pure function that can be called independently
 */
function applyThemeClass(themeValue: Theme) {
  if (typeof window === "undefined") return;

  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(themeValue);

  // Also set data attribute for potential CSS usage
  root.setAttribute("data-theme", themeValue);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage or system preference (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && (stored === "light" || stored === "dark")) {
        const storedTheme = stored as Theme;
        setTheme(storedTheme);
        applyThemeClass(storedTheme);
      } else {
        // Check system preference if no stored theme
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        const initialTheme: Theme = prefersDark ? "dark" : "light";
        setTheme(initialTheme);
        applyThemeClass(initialTheme);
      }
    } catch (error) {
      console.error("Failed to load theme from localStorage:", error);
      // Default to light theme on error
      setTheme("light");
      applyThemeClass("light");
    } finally {
      setIsInitialized(true);
    }
  }, []);

  /**
   * Applies the theme class to the HTML element
   */
  const applyTheme = useCallback((themeValue: Theme) => {
    applyThemeClass(themeValue);
  }, []);

  /**
   * Toggles between light and dark theme
   */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme: Theme = prev === "light" ? "dark" : "light";
      
      // Immediately apply theme to HTML element
      applyTheme(newTheme);

      // Save to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch (error) {
          console.error("Failed to save theme to localStorage:", error);
        }
      }

      return newTheme;
    });
  }, [applyTheme]);

  /**
   * Sets a specific theme
   */
  const setThemeValue = useCallback(
    (themeValue: Theme) => {
      setTheme(themeValue);
      applyTheme(themeValue);

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(THEME_STORAGE_KEY, themeValue);
        } catch (error) {
          console.error("Failed to save theme to localStorage:", error);
        }
      }
    },
    [applyTheme],
  );

  return {
    theme,
    toggleTheme,
    setTheme: setThemeValue,
    isInitialized,
  };
}
