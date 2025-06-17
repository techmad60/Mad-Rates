"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage }: { currentPage: number }) {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div className="flex justify-center gap-4 my-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-yellow text-black rounded disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={() => goToPage(currentPage + 1)}
        className="px-4 py-2 bg-yellow text-black rounded"
      >
        Next
      </button>
    </div>
  );
}
