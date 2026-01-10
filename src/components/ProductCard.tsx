import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import FavoriteToggle from "./FavoriteToggle";

interface ProductCardProps {
  product: Product;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

/**
 * Formats price to display with currency symbol
 */
function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * ProductCard component displays individual product information
 * Links to the product detail page using Next.js App Router
 * Includes a FavoriteToggle button for favoriting products
 * Receives favorites state via props to ensure single source of truth
 */
export default function ProductCard({
  product,
  isFavorite,
  toggleFavorite,
}: ProductCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:focus-within:ring-blue-400">
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col flex-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset dark:focus-visible:ring-blue-400"
        aria-label={`View ${product.title} details`}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-800/50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={false}
          />
        </div>
        <div className="flex flex-1 flex-col p-4 gap-2">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {product.title}
          </h3>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {product.category}
          </p>
          <p className="mt-auto text-lg font-bold text-gray-900 dark:text-gray-100">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
      {/* Favorite Toggle - Positioned absolutely to not interfere with link */}
      <div className="absolute top-2 right-2 z-10">
        <FavoriteToggle
          productId={product.id}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </article>
  );
}

