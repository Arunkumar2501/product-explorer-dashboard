"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";

interface ProductFiltersProps {
  products: Product[];
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
 * Handles search by title and filter by category
 */
export default function ProductFilters({ products }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories for the dropdown
  const categories = useMemo(() => getUniqueCategories(products), [products]);

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by search term (case-insensitive title match)
      const matchesSearch =
        searchTerm.trim() === "" ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase().trim());

      // Filter by category
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
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
            className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
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
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
