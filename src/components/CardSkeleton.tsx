export function CardSkeleton() {
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl shimmer flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded shimmer" />
          <div className="h-3 w-1/3 rounded-full shimmer" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded shimmer" />
        <div className="h-3 w-5/6 rounded shimmer" />
      </div>
      <div className="flex gap-1.5">
        <div className="h-5 w-16 rounded-full shimmer" />
        <div className="h-5 w-20 rounded-full shimmer" />
        <div className="h-5 w-14 rounded-full shimmer" />
      </div>
      <div className="flex gap-2 pt-2 border-t border-surface-700">
        <div className="h-9 flex-1 rounded-xl shimmer" />
        <div className="h-9 w-10 rounded-xl shimmer" />
      </div>
    </div>
  );
}
