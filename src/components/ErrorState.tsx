interface ErrorStateProps {
  message: string;
}

/**
 * ErrorState component for displaying error messages
 * Provides a user-friendly error fallback UI
 */
export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div
      className="flex min-h-[400px] flex-col items-center justify-center px-4 py-16"
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-md text-center">
        <div
          className="mb-4 text-6xl"
          aria-hidden="true"
          role="presentation"
        >
          ⚠️
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}

