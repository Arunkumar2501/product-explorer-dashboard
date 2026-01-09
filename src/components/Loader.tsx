/**
 * Loader component for displaying loading state with skeleton grid
 */
export default function Loader() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4 aspect-square w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2 h-4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2 h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}

