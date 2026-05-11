interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Something went wrong.", onRetry }: ErrorStateProps) {
  return (
    <div className="bg-surface border border-outline-variant rounded-lg shadow-sm p-8 min-h-64 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-error text-[32px]">warning</span>
      </div>
      <h3 className="text-h1 text-on-background mb-1">Something went wrong</h3>
      <p className="text-body-base text-on-surface-variant mb-6 max-w-sm">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary text-label-caps py-2 px-8 rounded transition-colors shadow-sm active:scale-95"
        >
          Try again
        </button>
      )}
    </div>
  );
}