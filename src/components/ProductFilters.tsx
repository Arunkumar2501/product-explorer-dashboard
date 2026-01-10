"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";

interface ProductFiltersProps {
  products: Product[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  isInitialized: boolean;
}

/**
 * Extracts unique categories from products
 */
function getUniqueCategories(products: Product[]): string[] {
  const categories = new Set(products.map((product) => product.category));
  return Array.from(categories).sort();
}

/**
 * ProductFilters - Client Component for filtering products
 * Handles search by title, filter by category, and filter by favorites
 * Receives favorites state via props to ensure single source of truth
 */
export default function ProductFilters({
  products,
  favorites,
  toggleFavorite,
  isFavorite,
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Get unique categories for the dropdown
  const categories = useMemo(() => getUniqueCategories(products), [products]);

  // Filter products based on search term, category, and favorites
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by search term (case-insensitive title match)
      const matchesSearch =
        searchTerm.trim() === "" ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase().trim());

      // Filter by category
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      // Filter by favorites
      const matchesFavorites = !showFavoritesOnly || isFavorite(product.id);

      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [products, searchTerm, selectedCategory, showFavoritesOnly, isFavorite]);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Filters Section */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Top Row: Search and Category */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          {/* Search Input */}
          <div className="flex-1 sm:max-w-md">
            <label htmlFor="search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                aria-label="Search products by title"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="sm:w-48">
            <label htmlFor="category" className="sr-only">
              Filter by category
            </label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              aria-label="Filter products by category"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
                    )
                    .join(" ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Favorites Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="favorites-only"
            name="favorites-only"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600"
            aria-label="Show favorites only"
          />
          <label
            htmlFor="favorites-only"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            Show favorites only
            {showFavoritesOnly && (
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                ({favorites.length} {favorites.length === 1 ? "favorite" : "favorites"})
              </span>
            )}
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredProducts.length} of {products.length} products
        {searchTerm && (
          <span className="ml-2">
            for &quot;{searchTerm}&quot;
          </span>
        )}
        {selectedCategory !== "all" && (
          <span className="ml-2">
            in {selectedCategory}
          </span>
        )}
        {showFavoritesOnly && (
          <span className="ml-2">
            (favorites only)
          </span>
        )}
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        emptyTitle={
          showFavoritesOnly && favorites.length === 0
            ? "No favorites yet"
            : "No products found"
        }
        emptyDescription={
          showFavoritesOnly && favorites.length === 0
            ? "Start favoriting products by clicking the heart icon on any product card."
            : "Try adjusting your search or filters to find what you're looking for."
        }
        emptyIcon={
          showFavoritesOnly && favorites.length === 0 ? (
            <svg
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          ) : (
            <svg
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          )
        }
      />
    </div>
  );
}
