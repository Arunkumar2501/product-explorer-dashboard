interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

/**
 * EmptyState component for displaying friendly messages when no results are found
 */
export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-4">
        {icon && (
          <div className="flex justify-center text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
