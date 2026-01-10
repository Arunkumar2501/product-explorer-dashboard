import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

interface ProductGridProps {
  products: Product[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
}

/**
 * ProductGrid component displays products in a responsive grid layout
 * Handles empty state when no products are available
 * Passes favorites props down to ProductCard components
 */
export default function ProductGrid({
  products,
  isFavorite,
  toggleFavorite,
  emptyTitle = "No products found",
  emptyDescription = "Try adjusting your search or filters to find what you're looking for.",
  emptyIcon,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={emptyIcon}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

