// components/MainClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CoinTable from "./CoinTable";
import { getCoins } from "@/lib/getCoin";
import { Coin } from "@/types/type";
import CoinTableSkeleton from "./SkeletonTable";

export default function MainClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setLoading(true);
    getCoins(currentPage)
      .then((data) => setCoins(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [currentPage]);

  const goToPage = (page: number) => {
    router.push(`/main?page=${page}`);
  };

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <div className="max-w-[74.5rem] xl:max-w-[74rem] w-full">
        {loading ? (
          <CoinTableSkeleton />
        ) : (
          <>
            <CoinTable coins={coins} />
            <div className="flex justify-between gap-4 mt-6">
              {currentPage > 1 && (
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  className="px-4 py-2 text-yellow rounded transition cursor-pointer"
                >
                  ← Prev
                </button>
              )}
              <button
                onClick={() => goToPage(currentPage + 1)}
                className="px-4 py-2 text-yellow rounded transition cursor-pointer"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
