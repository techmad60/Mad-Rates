export default function CoinInfoSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center mt-32 bg-background p-4 sm:px-6 md:px-0 lg:py-4 animate-pulse">
      <div className="flex flex-col max-w-[74.5rem] xl:max-w-[74rem] w-full font-sans">
        <div className="flex flex-col space-y-1.5">
          <div className="flex space-x-4 mt-3 items-center">
            <div className="w-8 h-8 rounded-full bg-hover" />
            <div className="h-5 w-24 bg-hover rounded" />
            <div className="h-5 w-20 bg-hover rounded" />
            <div className="h-5 w-8 bg-hover rounded" />
          </div>

          <div className="flex space-x-4 items-center">
            <div className="h-8 w-32 bg-hover rounded" />
            <div className="h-6 w-16 bg-hover rounded" />
            <div className="h-5 w-10 bg-hover rounded" />
          </div>

          <div className="h-5 w-20 bg-hover rounded" />
        </div>

        <div className="mt-12">
          <div className="h-6 w-40 bg-hover rounded mb-4" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between py-3 border-b border-hover"
            >
              <div className="h-5 w-24 bg-hover rounded" />
              <div className="h-5 w-32 bg-hover rounded" />
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-6">
          {/* MadConverter Skeleton */}
          <div className="h-6 w-40 bg-hover rounded" />
          <div className="flex space-x-4">
            <div className="h-10 w-32 bg-hover rounded" />
            <div className="h-10 w-24 bg-hover rounded" />
          </div>
          <div className="h-5 w-48 bg-hover rounded" />

          {/* MadIndex Skeleton */}
          <div className="h-6 w-40 bg-hover rounded" />
          <div className="h-5 w-32 bg-hover rounded" />
        </div>
      </div>
    </div>
  );
}
// This component provides a skeleton loading state for the CoinInfo page,
// displaying placeholders for the coin's image, name, price, market cap,