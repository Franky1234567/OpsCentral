function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`skeleton-pulse rounded bg-surface-variant ${className ?? ""}`} />
  );
}

export function TableSkeleton() {
  return (
    <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
      
      <div className="p-2 border-b border-outline-variant">
        <SkeletonBlock className="w-72 h-10" />
      </div>
      
      <div className="bg-surface-container-lowest px-4 py-3 border-b border-outline-variant flex gap-4">
        <SkeletonBlock className="w-10 h-4" />
        <SkeletonBlock className="w-28 h-4" />
        <SkeletonBlock className="w-40 h-4 hidden md:block" />
        <SkeletonBlock className="w-16 h-4 ml-auto" />
      </div>
      
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-4 py-3 border-b border-outline-variant last:border-0 flex items-center gap-4 bg-surface-container-lowest">
          <SkeletonBlock className="w-8 h-8 rounded-full shrink-0" />
          <div className="flex flex-col gap-1.5 w-36">
            <SkeletonBlock className="w-full h-3.5" />
            <SkeletonBlock className="w-4/5 h-3" />
          </div>
          <SkeletonBlock className="w-48 h-3.5 hidden md:block" />
          <SkeletonBlock className="w-14 h-6 ml-auto rounded-full" />
        </div>
      ))}
    </div>
  );
}