import ProductDetailsClient from "@/components/ProductDetailsClient";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Product Details Page - Dynamic Route
 * Server Component wrapper that passes product ID to client component
 * Client component handles data fetching to avoid API blocking on Netlify
 */
export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  // Await params in Next.js 15+
  const { id } = await params;

  return <ProductDetailsClient productId={id} />;
}
