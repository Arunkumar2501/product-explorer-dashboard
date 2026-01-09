import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

/**
 * ProductGrid component displays products in a responsive grid layout
 * Handles empty state when no products are available
 */
export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-16">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

