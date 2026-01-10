import ThemeToggle from "@/components/ThemeToggle";
import ProductListingClient from "@/components/ProductListingClient";

/**
 * Home page - Product Listing Page
 * Server Component wrapper that renders client-side data fetching
 * This approach avoids API blocking issues on Netlify servers
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
                Products
              </h1>
              <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Browse our collection of products
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <ProductListingClient />
      </main>
    </div>
  );
}
