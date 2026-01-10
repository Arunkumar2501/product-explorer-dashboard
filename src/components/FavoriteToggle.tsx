"use client";

interface FavoriteToggleProps {
  productId: number;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  className?: string;
}

/**
 * FavoriteToggle - Client Component for toggling favorite status
 * Displays a heart icon that can be clicked to add/remove from favorites
 * Receives favorites state via props to ensure single source of truth
 */
export default function FavoriteToggle({
  productId,
  isFavorite,
  toggleFavorite,
  className = "",
}: FavoriteToggleProps) {
  const favorited = isFavorite(productId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFavorite(productId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`inline-flex items-center justify-center rounded-full p-2 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-900/80 dark:hover:bg-gray-900 dark:focus:ring-offset-gray-900 ${className}`}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorited}
    >
      {favorited ? (
        <svg
          className="h-5 w-5 fill-red-500 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5 text-gray-400 transition-colors hover:text-red-500 dark:text-gray-500 dark:hover:text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      )}
    </button>
  );
}
