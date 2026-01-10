import { fetchProducts } from "@/lib/api";
import FavoritesProvider from "@/components/FavoritesProvider";
import ErrorState from "@/components/ErrorState";

/**
 * Home page - Product Listing Page
 * Server Component that fetches and displays all products
 * Products are passed to FavoritesProvider which manages favorites state
 * and passes it down to child components
 */
export default async function Home() {
  try {
    const products = await fetchProducts();

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <main className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
              Products
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Browse our collection of {products.length} products
            </p>
          </div>
          <FavoritesProvider products={products} />
        </main>
      </div>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load products. Please try again later.";

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <ErrorState message={errorMessage} />
        </main>
      </div>
    );
  }
}
