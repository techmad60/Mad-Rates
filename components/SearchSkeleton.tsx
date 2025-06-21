export default function SearchSkeleton() {
  return (
    <ul className="space-y-2 mt-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          className="flex items-center gap-2 p-2 rounded animate-pulse bg-muted"
        >
          <div className="w-5 h-5 bg-hover rounded-full" />
          <div className="flex-1 h-4 bg-hover rounded" />
          <div className="w-10 h-3 bg-hover rounded ml-auto" />
        </li>
      ))}
    </ul>
  );
}
