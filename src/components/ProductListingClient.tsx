"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types/product";
import FavoritesProvider from "./FavoritesProvider";
import ErrorState from "./ErrorState";
import Loader from "./Loader";

/**
 * Client-side Product Listing Component
 * Fetches products in the browser to avoid server-side blocking
 */
export default function ProductListingClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load products. Please try again later.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return <FavoritesProvider products={products} />;
}
