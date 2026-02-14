interface SkeletonProps {
  lines: string[]
}

export function Skeleton({ lines }: SkeletonProps) {
  return (
    <div className="animate-pulse space-y-2">
      {lines.map((line, index) => (
        <div
          key={`${index}-${line}`}
          className={`h-3 bg-gray-200 rounded ${line}`}
        />
      ))}
    </div>
  )
}
