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
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col flex-1"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {product.title}
          </h3>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
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
    </div>
  );
}

