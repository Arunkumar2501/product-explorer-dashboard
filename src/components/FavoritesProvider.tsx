"use client";

import { useFavorites } from "@/hooks/useFavorites";
import ProductFilters from "./ProductFilters";
import type { Product } from "@/types/product";

interface FavoritesProviderProps {
  products: Product[];
}

/**
 * FavoritesProvider - Client wrapper component
 * Acts as the single source of truth for favorites state
 * Calls useFavorites exactly once and passes props to child components
 */
export default function FavoritesProvider({ products }: FavoritesProviderProps) {
  const favoritesContext = useFavorites();

  return (
    <ProductFilters
      products={products}
      favorites={favoritesContext.favorites}
      toggleFavorite={favoritesContext.toggleFavorite}
      isFavorite={favoritesContext.isFavorite}
      isInitialized={favoritesContext.isInitialized}
    />
  );
}
