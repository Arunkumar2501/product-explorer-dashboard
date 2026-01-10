"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const FAVORITES_STORAGE_KEY = "product-favorites";

/**
 * Hook for managing favorite products using localStorage
 * Handles client-side state and persistence
 * Uses functional state updates to prevent stale closure issues
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  // Ref to track the latest favorites state for immediate localStorage updates
  const favoritesRef = useRef<number[]>([]);
  // Ref to track initialization status for use in callbacks
  const isInitializedRef = useRef(false);

  // Initialize favorites from localStorage (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
          favoritesRef.current = parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage:", error);
      // If there's an error, start with an empty array
      setFavorites([]);
      favoritesRef.current = [];
    } finally {
      setIsInitialized(true);
      isInitializedRef.current = true;
    }
  }, []);

  // Sync favorites to localStorage whenever they change
  // This acts as a backup sync in case the immediate update in toggleFavorite fails
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;

    // Update ref to always have the latest state
    favoritesRef.current = favorites;

    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites, isInitialized]);

  /**
   * Toggles a product's favorite status
   * Uses functional state updates to prevent stale closure issues
   * when toggling favorites rapidly
   */
  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id)
        ? // Remove from favorites
          prev.filter((favId) => favId !== id)
        : // Add to favorites
          [...prev, id];

      // Immediately update ref and localStorage to prevent race conditions
      // when toggling multiple favorites rapidly
      favoritesRef.current = newFavorites;
      
      // Use ref to check initialization status to avoid stale closure
      if (typeof window !== "undefined" && isInitializedRef.current) {
        try {
          localStorage.setItem(
            FAVORITES_STORAGE_KEY,
            JSON.stringify(newFavorites),
          );
        } catch (error) {
          console.error("Failed to save favorites to localStorage:", error);
        }
      }

      return newFavorites;
    });
  }, []);

  /**
   * Checks if a product is favorited
   */
  const isFavorite = useCallback(
    (id: number): boolean => {
      return favorites.includes(id);
    },
    [favorites],
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isInitialized,
  };
}
