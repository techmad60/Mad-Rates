import { getCoins } from "@/lib/getCoin";
import CoinTable from "@/components/CoinTable";

export default async function MainLayout({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const coins = await getCoins(currentPage);

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <div className="max-w-[74.5rem] xl:max-w-[74rem] w-full">
        <CoinTable coins={coins} />
        <div className="flex justify-center gap-4 mt-6">
          {currentPage > 1 && (
            <a
              href={`/main?page=${currentPage - 1}`}
              className="px-4 py-2 bg-yellow text-black rounded hover:bg-yellow-300 transition"
            >
              ← Prev
            </a>
          )}
          <a
            href={`/main?page=${currentPage + 1}`}
            className="px-4 py-2 bg-yellow text-black rounded hover:bg-yellow-300 transition"
          >
            Next →
          </a>
        </div>
      </div>
    </div>
  );
}
