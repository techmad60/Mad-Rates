// components/CoinTableSkeleton.tsx
export default function CoinTableSkeleton() {
  const skeletonRows = Array.from({ length: 10 });

  return (
    <div className="overflow-x-auto animate-pulse">
      <table className="min-w-full text-left mt-36 sm:mt-44">
        <thead>
          <tr>
            {["#", "Coin", "Price", "1h %", "24h %", "Market Cap"].map((header) => (
              <th key={header} className="p-4 text-light">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, idx) => (
            <tr key={idx} className="border-t border-yellow">
              <td className="p-4">
                <div className="h-4 w-4 bg-hover rounded"></div>
              </td>
              <td className="p-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-hover rounded-full" />
                <div className="h-4 w-24 bg-hover rounded" />
                <div className="h-4 w-10 bg-gray-600 rounded" />
              </td>
              <td className="p-4">
                <div className="h-4 w-16 bg-hover rounded" />
              </td>
              <td className="p-4">
                <div className="h-4 w-10 bg-hover rounded" />
              </td>
              <td className="p-4">
                <div className="h-4 w-10 bg-hover rounded" />
              </td>
              <td className="p-4">
                <div className="h-4 w-20 bg-hover rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
