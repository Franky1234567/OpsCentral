interface EmptyStateProps {
  onClearFilters?: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="bg-surface border border-outline-variant rounded-lg shadow-sm p-8 min-h-96 flex flex-col items-center justify-center text-center">
      <div className="w-28 h-28 bg-surface-variant rounded-full flex items-center justify-center mb-4 opacity-50">
        <span className="material-symbols-outlined text-on-surface-variant text-[64px]">search_off</span>
      </div>
      <h3 className="text-h1 text-on-background mb-1">No users match your search</h3>
      <p className="text-body-base text-on-surface-variant mb-6 max-w-sm">
        Try adjusting your filters or search criteria to find what you&apos;re looking for.
      </p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="bg-secondary text-on-secondary text-label-caps py-2 px-4 rounded hover:opacity-90 transition-colors shadow-sm active:scale-95"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}