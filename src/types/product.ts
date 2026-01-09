/**
 * Product interface based on Fake Store API response
 * https://fakestoreapi.com/products
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Product categories from Fake Store API
 */
export type ProductCategory =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

