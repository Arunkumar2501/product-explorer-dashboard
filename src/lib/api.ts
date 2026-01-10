import type { Product } from "@/types/product";

/**
 * Base URL for the Fake Store API
 */
const API_BASE_URL = "https://fakestoreapi.com";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Fetches all products from the Fake Store API
 * @returns Promise resolving to an array of Product objects
 * @throws {ApiError} When the API request fails
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      // Next.js Server Components fetch works best with default cache settings
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch products: ${response.statusText}`,
        response.status,
        response.statusText,
      );
    }

    const data: Product[] = await response.json();

    // Validate that we received an array
    if (!Array.isArray(data)) {
      throw new ApiError("Invalid API response: expected an array");
    }

    return data;
  } catch (error) {
    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors and other exceptions
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(
        "Network error: Failed to connect to the API. Please check your internet connection.",
      );
    }

    // Handle unknown errors
    throw new ApiError(
      `Unexpected error while fetching products: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Fetches a single product by ID from the Fake Store API
 * @param id - The product ID to fetch
 * @returns Promise resolving to a Product object
 * @throws {ApiError} When the API request fails or product is not found
 */
export async function fetchProduct(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      // Next.js Server Components fetch works best with default cache settings
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiError(
          `Product with ID ${id} not found`,
          404,
          response.statusText,
        );
      }

      throw new ApiError(
        `Failed to fetch product: ${response.statusText}`,
        response.status,
        response.statusText,
      );
    }

    const data: Product = await response.json();

    // Validate that we received an object with required fields
    if (!data || typeof data.id === "undefined") {
      throw new ApiError("Invalid API response: product data is malformed");
    }

    return data;
  } catch (error) {
    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors and other exceptions
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(
        "Network error: Failed to connect to the API. Please check your internet connection.",
      );
    }

    // Handle unknown errors
    throw new ApiError(
      `Unexpected error while fetching product: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

