function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`skeleton-pulse rounded bg-surface-variant ${className ?? ""}`} />
  );
}

export default function UserDetailLoading() {
  return (
    <main className="w-full max-w-[900px] mx-auto px-4 py-6 md:px-6 md:py-8">
      
      <div className="flex flex-col gap-2 mb-6">
        <SkeletonBlock className="w-32 h-5" />
        <SkeletonBlock className="w-48 h-4" />
      </div>

      
      <div className="bg-white border border-outline-variant rounded-xl p-6 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <SkeletonBlock className="w-24 h-24 rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-3 w-full">
          <SkeletonBlock className="w-48 h-6" />
          <SkeletonBlock className="w-28 h-4" />
          <div className="flex flex-wrap gap-2 mt-1">
            <SkeletonBlock className="w-40 h-7 rounded-full" />
            <SkeletonBlock className="w-36 h-7 rounded-full" />
            <SkeletonBlock className="w-28 h-7 rounded-full" />
            <SkeletonBlock className="w-32 h-7 rounded-full" />
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[0, 1].map((i) => (
          <div key={i} className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <SkeletonBlock className="w-40 h-5 mb-2" />
            <SkeletonBlock className="w-full h-4" />
            <SkeletonBlock className="w-4/5 h-4" />
            <SkeletonBlock className="w-3/5 h-4" />
            <SkeletonBlock className="w-2/5 h-4 mt-4" />
          </div>
        ))}
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white border border-outline-variant rounded-xl p-4 flex items-center gap-4">
            <SkeletonBlock className="w-12 h-12 rounded-lg shrink-0" />
            <div className="flex flex-col gap-2">
              <SkeletonBlock className="w-24 h-3" />
              <SkeletonBlock className="w-10 h-5" />
            </div>
          </div>
        ))}
      </div>

      
      <div className="border-b border-outline-variant mb-6 flex gap-8 pb-3">
        <SkeletonBlock className="w-20 h-5" />
        <SkeletonBlock className="w-28 h-5" />
      </div>

      
      <div className="flex flex-col gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white border border-outline-variant rounded-xl p-6 border-l-4 border-l-primary">
            <SkeletonBlock className="w-3/4 h-4 mb-3" />
            <SkeletonBlock className="w-full h-3 mb-1.5" />
            <SkeletonBlock className="w-2/3 h-3" />
          </div>
        ))}
      </div>
    </main>
  );
}