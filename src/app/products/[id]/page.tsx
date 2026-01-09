import Image from "next/image";
import Link from "next/link";
import { fetchProduct } from "@/lib/api";
import { ApiError } from "@/lib/api";
import ErrorState from "@/components/ErrorState";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Formats price to display with currency symbol
 */
function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * Formats category name for display (capitalize first letter)
 */
function formatCategory(category: string): string {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Product Details Page - Dynamic Route
 * Displays full product information with large image and details
 */
export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  try {
    // Await params in Next.js 15+
    const { id } = await params;
    const product = await fetchProduct(id);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Products
          </Link>

          {/* Product Details Grid */}
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Product Image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Product Information */}
              <div className="flex flex-col space-y-6">
                {/* Category Badge */}
                <div>
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {formatCategory(product.category)}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
                  {product.title}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {product.rating.rate}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.rating.count} reviews)
                  </span>
                </div>

                {/* Description */}
                <div className="prose prose-sm max-w-none dark:prose-invert sm:prose-base">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Description
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {product.description}
                  </p>
                </div>

                {/* Product ID (for reference) */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Product ID: {product.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    // Handle 404 errors specifically
    if (error instanceof ApiError && error.status === 404) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
          <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to Products
            </Link>
            <ErrorState message={error.message} />
          </main>
        </div>
      );
    }

    // Handle other errors
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load product. Please try again later.";

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Products
          </Link>
          <ErrorState message={errorMessage} />
        </main>
      </div>
    );
  }
}

